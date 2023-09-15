import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Follow } from "../entities/Follow";
import { User } from "../entities/User";

class FollowService {
  private readonly FollowRepository: Repository<Follow> =
    AppDataSource.getRepository(Follow);

  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);

  //siapa yang ikutin kita

  // siapa yang follow kita

  async findOne(req: Request, res: Response) {
    try {
      const loggedInUserId = res.locals.loginSession.user.id;
      const followers = await this.FollowRepository.find({
        where: {
          followed: {
            id: loggedInUserId,
          },
        },
        relations: ["follower"],
      });

      const responseBaru = [];
      for (const usered of followers) {
        const cekIsFollow = await this.FollowRepository.count({
          where: {
            follower: loggedInUserId,
            followed: { id: usered.follower.id },
          },
        });
        responseBaru.push({
          ...usered,
          is_follow: cekIsFollow > 0,
        });
      }
      return res.status(200).json(responseBaru);
    } catch (error) {
      console.error("Error:", error);
      console.error("Database Error:", error.message);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }

  // ini bagian kita follow siapa
  async findOneUserLogin(req: Request, res: Response) {
    try {
      const userId = res.locals.loginSession.user.id;
      const follow = await this.FollowRepository.find({
        where: {
          follower: { id: userId },
        },
        order: {
          id: "ASC",
        },
        relations: ["followed"],
        select: ["followed"],
      });
      const responseBaru = [];
      for (const usered of follow) {
        responseBaru.push({
          ...usered,
          is_follow: true,
        });
      }
      return res.status(200).json(responseBaru);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      // const idUser = parseInt(req.params.idUser);

      // const userFollower = await this.UserRepository.findOneOrFail(idUser, {
      //   where: {
      //     id: idUser,
      //   },
      // });

      const userFollower = await this.UserRepository.findOne({
        where: {
          id: req.body.idUser,
        },
      });

      const checkFollow = await this.FollowRepository.count({
        where: {
          followed: {
            id: userFollower.id,
          },
          follower: {
            id: loginSession.user.id,
          },
        },
      });

      if (checkFollow > 0) {
        await this.FollowRepository.delete({
          followed: {
            id: userFollower.id,
          },
          follower: {
            id: loginSession.user.id,
          },
        });
        return res.status(200).json({ message: "Unfollowed successfully" });
      }

      const newFollow = this.FollowRepository.create({
        followed: userFollower,
        follower: loginSession.user,
      });

      const createdFollow = await this.FollowRepository.save(newFollow);
      return res.status(200).json({
        message: "Followed successfully",
        follow: createdFollow,
      });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ error: "An error occurred" });
    }
  }
}

// async create(req: Request, res: Response) {
//   try {
//     const loginSession = res.locals.loginSession;
//     const idUser = parseInt(req.params.idUser)
//     const userFollower = await this.UserRepository.findOne({
//         where: {
//           id: idUser,
//         },
//       });
//       if (!userFollower) {
//         return res.status(404).json({ error: 'Thread not found' });
//       }
//     console.log("masuk sini ga 2");
//     console.log(loginSession);

//     const checkFollow = await this.FollowRepository.count({
//       where: {
//         followed: {
//           id: userFollower,
//         },
//         follower: {
//           id: loginSession.user.id,
//         },
//       },
//     });
//     if (checkFollow > 0) {
//       const deletedFollow = this.FollowRepository.delete({
//         followed: {
//           id: userFollower,
//         },
//         follower: {
//           id: loginSession.user.id,
//         },
//       });
//       return res.status(200).json({ deletedFollow });
//     }

//     const newFollow = this.FollowRepository.create({
//       followed : userFollower,
//       follower : loginSession.user.id
//       // comment: value.comment,
//     });

//     console.log("masuk siniga 3");
//     const createdReply = await this.FollowRepository.save(newFollow);
//     return res.status(200).json({
//       createdReply,
//     });
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// }

export default new FollowService();
