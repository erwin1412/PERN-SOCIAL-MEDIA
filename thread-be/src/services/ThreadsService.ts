import { Repository } from "typeorm";
import { Threads } from "../entities/Thread";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

class ThreadService {
  private readonly threadRepository: Repository<Threads> = AppDataSource.getRepository(Threads);

  async find(req: Request, res: Response) {
    const threads = await this.threadRepository.find();
    return res.status(200).json(threads);
  }

  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const threads = await this.threadRepository.findOne({
        where : {
            id : id
        }
    })
    return res.status(200).json(threads);
  }

  async create (req: Request, res: Response) {
    const data = req.body;
    const thread = this.threadRepository.create({
        content :data.content,
        image : data.image
    })
    const createdThread = this.threadRepository.save(thread)
    return res.status(200).json(createdThread);
  }

  async  delete(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    const deletedThread = await this.threadRepository.delete(id);
    return res.status(200).json(deletedThread);
  }


  async update(req: Request, res: Response) {
    const id = parseInt(req.params.id)

    const threadz = await this.threadRepository.findOne({
        where : {
            id : id
        }
    })
    const data = req.body;
    console.log(id , threadz)
    console.log(req.body)

    if (data.content != "") {
        threadz.content = data.content
    }

    if (data.content != "") {
        threadz.image = data.image
    }

console.log(threadz.content , threadz.image)

 const updatedThread = this.threadRepository.save(threadz)

    return res.status(200).json(updatedThread);
  }



}

export default new ThreadService();
