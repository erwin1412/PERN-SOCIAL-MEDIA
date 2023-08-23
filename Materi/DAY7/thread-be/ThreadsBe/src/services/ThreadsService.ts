import { Like, Repository } from "typeorm";
import { Threads } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  createdThreadSchema,
  updatedThreadSchema,
} from "../utils/validators/thread";
import {v2 as cloudinary} from 'cloudinary'
import 'dotenv/config'

class ThreadService {
  private readonly threadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  async find(req: Request, res: Response) {    
    const idUser = res.locals.loginSession.user.id;
    try {
      console.log("masuk sini gak 1")
      const threads = await this.threadRepository.find({
        relations: ["user", "likes.user", "replies"],
        take : 4,
        order: {
          id: "DESC", 
        },
      });

      // console.log("masuk sini gak 2")
      // console.log("replies count : " , threads[0].likes)
      // console.log("masuk sini gak 3")
      const loginSession = res.locals.loginSession
      // console.log("loginSession : " , loginSession)
      // console.log("masuk sini gak 4")
      let responseBaru = [];
      threads.map((element) => {
        console.log("masuk sini gak 5")
        responseBaru.push({
          ...element,
          likes_count: element.likes.length,
          replies_count: element.replies.length,
          is_like: element.likes.some((Like) => {
            return Like?.user?.id === idUser;
          }),
        });
        
        console.log("masuk sini gak 6")

      });

      console.log("masuk sini gak 7")
      return res.status(200).json(responseBaru);
    } catch (err) {
      return res.status(500).json(`Terjadi kesalahan pada server , ${err}`);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const threads = await this.threadRepository.findOne({
        where: {
          id: id,
        },
        relations: ["user", "likes", "replies"],
      });

      // threads.image = "http://localhost:5000/upload/" + threads.image

      return res.status(200).json(threads);
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }
  }

  // async create(req: Request, res: Response) {
  //   try {

  //     const filename = res.locals.filename
  //     const data = {
  //       content : req.body.content,
  //       image: filename
  //     }
  //     const loginSession = res.locals.loginSession
  //     const { error, value } = createdThreadSchema.validate(data);


  //     console.log("masuk siniga 1")
  //     if (error) {
  //       return res.status(400).json({ error: error });
  //     }
  //     cloudinary.config({
  //       cloud_name : process.env.CLOUD_NAME,
  //       api_key : process.env.API_KEY,
  //       api_secret : process.env.API_SECRET
  //       })
  
  //       const cloudinaryResponse = await cloudinary.uploader.upload("./uploads/" + filename)
  //       console.log(cloudinaryResponse)
        
  //     console.log("masuk siniga 2")
  //     console.log(loginSession)
      
  //     const thread = this.threadRepository.create({
  //       content: value.content,
  //       image: cloudinaryResponse.secure_url,
  //       user: {
  //         id : loginSession.user.id
  //       }
  //     });
      
  //     console.log("masuk siniga 3")
  //     const createdThread = await this.threadRepository.save(thread);
  //     return res.status(200).json(createdThread);
  //   } catch (error) {
  //     return res.status(500).json(error);
  //   }
  // }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deletedThread = await this.threadRepository.delete(id);
      return res.status(200).json(deletedThread);
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);

      const threadz = await this.threadRepository.findOne({
        where: {
          id: id,
        },
      });
      const data = req.body;

      const { error, value } = updatedThreadSchema.validate(data);
      if (error) {
        return res.status(400).json({ error: error });
      }
      // console.log(id , threadz)
      // console.log(req.body)
      if (!threadz) {
      }

      if (data.content != "") {
        threadz.content = data.content;
      }

      if (data.content != "") {
        threadz.image =  data.image;
      }

      // console.log(threadz.content , threadz.image)

      const updatedThread = this.threadRepository.save(threadz);

      return res.status(200).json(updatedThread);
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }
  }
}
export default new ThreadService();
