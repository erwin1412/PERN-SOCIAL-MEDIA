import { Not, Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { User } from "../entities/User";
import { shuffle } from "lodash";
import { updatedUserSchema } from "../utils/validators/user";
import { Follow } from "../entities/Follow";
import { not } from "joi";

class UserService {

  private readonly UserRepository: Repository<User> =
    AppDataSource.getRepository(User);
    private readonly FollowRepository: Repository<Follow> =
    AppDataSource.getRepository(Follow);


    async find(req: Request, res: Response) {
      const idFollower = res.locals.loginSession.user.id;
      
      try {
        const followedUsers = await this.UserRepository.find({
          relations: ["followersList", "followingList"],
          take: 5,
          where: {
            id: idFollower
          }
        });
    
        let responseBaru = [];
        
        for (const user of followedUsers) {
          const is_follow = user.followersList.some((follower) => follower?.follower?.id === idFollower);
          
          responseBaru.push({
            ...user,
            is_follow,
          });
        }
    
        return res.status(200).json(responseBaru);
      } catch (err) {
        return res.status(500).json({ error: "Terjadi kesalahan pada server" });
      }
    }
    


  async findUser(req: Request, res: Response) {

    try {
      const userId = parseInt(req.query.userId as string);

      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid userId format" });
      }

      const user = await this.UserRepository.findOne({
        where: {
          id: userId
        },
        select: ["id" , "fullname" , "username" , "picture" , "description" , "created_at" , "updated_at"] 
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
}


  async getRandomUsers(req: Request, res: Response) {
    try {
      const numberOfUsers = parseInt(req.query.count as string) || 5;

      if (isNaN(numberOfUsers)) {
        return res.status(400).json({ error: "Invalid count format" });
      }
      const idUser = res.locals.loginSession.user.id;
      const allUsers = await this.UserRepository.find({
        where : {
          id : Not(idUser)
        },
        select: ["id", "fullname", "username", "picture", "description", "created_at", "updated_at"],
      });

      if (!allUsers || allUsers.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }

      const follow = await this.FollowRepository.find({
        where: {
          follower: { id: idUser },
        },
        order: {
          id: "ASC",
        },
        relations: ["followed"],
      });

      const shuffledUsers = shuffle(allUsers).slice(0, numberOfUsers);
      let responseBaru = [];
      shuffledUsers.map((element) => {
        console.log("masuk sini gak 5" , element)
        

        
        responseBaru.push({
          ...element,
        
          is_followed: follow.some((x)=>{
            console.log("ini bagian x : " , x.followed.id)
            console.log("ini bagian element", element.id)
            return x.followed.id === element.id
          })
      })
    })
      return res.status(200).json(responseBaru);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }



  async findUsersByUsernameOrFullname(req: Request, res: Response) {
    try {
      const searchQuery = req.query.q as string;
      if (!searchQuery) {
        return res.status(400).json({ error: "Search query is missing" });
      }
      console.log("Received Query:", searchQuery);

      const matchingUsers = await this.UserRepository
        .createQueryBuilder("user")
        .where("user.username ILIKE :query OR user.fullname ILIKE :query", { query: `%${searchQuery}%` })
        .getMany();

      if (matchingUsers.length === 0) {
        return res.status(404).json({ message: "No matching users found" });
      }
      console.log("Matching Users:", matchingUsers);
      return res.status(200).json(matchingUsers);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  }




  async updateUser(req: Request, res: Response) {
    try {
      const filename = res.locals.filename;
      const idUser = res.locals.loginSession.user.id;
      const user = await this.UserRepository.findOne({
        where: {
          id: idUser,
        },
      });
      const data = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        picture: filename,
      };

      const { error, value } = updatedUserSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      }
      // console.log(id , user)
      // console.log(req.body)
      if (!user) {
        return res.status(400).json({ error : "hehehehe" });
      }

      if (data.fullname != ""){
        user.fullname = data.fullname;
      }
      

      if (data.username != "") {
        user.username =  data.username;
      }
      if (data.email != "") {
        user.email =  data.email;
      }
      if (data.password != "") {
        user.password =  data.password;
      }
      if (data.picture !== "") {
        user.picture = data.picture;
      }

      // console.log(user.content , user.image)

      const updatedUser = await this.UserRepository.save(user);
      return res.status(200).json(`data berhasil di ubah: ${JSON.stringify(updatedUser)}`);
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
  }
  }



// async findUser(req: Request, res: Response) {
//     console.log("masuk sini gak 2");
//     try {
//       console.log("masuk sini gak 3");
//       const userId = parseInt(req.query.userId as string);

//       console.log("masuk sini gak 4");
//       const user = await this.UserRepository.findOne({
//         where : {
//             id : userId
//         }
//       });
//       console.log("masuk sini gak 5");
//       return res.status(200).json(user);
//     } catch (error) {

//       console.error("Error:", error);
//       return res.status(500).json({ error: "Terjadi kesalahan pada server" });
//     }
//   }



}
















export default new UserService();
