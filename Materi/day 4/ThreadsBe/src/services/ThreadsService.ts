import { Repository } from "typeorm";
import { Threads } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import {
  createdThreadSchema,
  updatedThreadSchema,
} from "../utils/validators/thread";

class ThreadService {
  private readonly threadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  async find(req: Request, res: Response) {
    try {
   
      const threads = await this.threadRepository.find({
        relations: ["user", "likes", "replies" ],
        order: {
          id: "DESC", 
        },
      });
      
      let responseBaru = [];
      threads.forEach((element) => {
        responseBaru.push({
          ...element,
          likes_count: 10,
          is_like: true,
          replies_count: 9,
        });
      });

      return res.status(200).json(responseBaru);
    } catch (err) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }

    // return res.status(200).json(threads);
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
      return res.status(200).json(threads);
    } catch (error) {
      return res.status(500).json("Terjadi kesalahan pada server");
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const loginSession = res.locals.loginSession
      const { error, value } = createdThreadSchema.validate(data);
      console.log("masuk siniga 1")
      if (error) {
        return res.status(400).json({ error: error });
      }

      console.log("masuk siniga 2")
      console.log(loginSession)
      
      const thread = this.threadRepository.create({
        content: value.content,
        image: value.image,
        user: {
          id : loginSession.user.id
        }
      });
      
      console.log("masuk siniga 3")
      const createdThread = await this.threadRepository.save(thread);
      return res.status(200).json(createdThread);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

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
        threadz.image = data.image;
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
