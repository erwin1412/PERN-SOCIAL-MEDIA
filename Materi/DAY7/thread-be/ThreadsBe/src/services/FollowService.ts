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

  async findOne(req: Request, res: Response) {
    console.log("masuk sini gak 2");
    try {
      console.log("masuk sini gak 53");
      const userId = parseInt(req.query.userId as string);

      console.log("masuk sini gak 4");
      const follow = await this.FollowRepository.find({
        where: {
          followed: { id: userId },
        },
        order: {
          id: "ASC",
        },
        // relations : ["follower","followed"]
        relations: ["follower"],
      });
      console.log("masuk sini gak 5");
      return res.status(200).json(follow);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }




  async findOneUserLogin(req: Request, res: Response) {
    console.log("masuk sini gak 2");
    try {
      console.log("masuk sini gak 53");
      const userId = res.locals.loginSession.user.id;

      console.log("masuk sini gak 4");
      const follow = await this.FollowRepository.find({
        where: {
          follower: { id: userId },
        },
        order: {
          id: "ASC",
        },
        // relations : ["follower","followed"]
        relations: ["followed"],
      });
      console.log("masuk sini gak 5");
      return res.status(200).json(follow);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }




  async create(req: Request, res: Response) {
    try {
      const loginSession = res.locals.loginSession;
      const idUser = parseInt(req.params.idUser);

      // const userFollower = await this.UserRepository.findOneOrFail(idUser, {
      //   where: {
      //     id: idUser,
      //   },
      // });

      const userFollower = await this.UserRepository.findOne({
        where: {
          id: idUser,
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
