import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

import { Reply } from "../entities/Reply";
import { createdReplySchema } from "../utils/validators/reply" 
import { Threads } from "../entities/Thread";
class ReplyService {
  private readonly replyRepository: Repository<Reply> =
    AppDataSource.getRepository(Reply);
  private readonly threadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  //   async find(req: Request, res: Response): Promise<Response> {
  //     try {
  //         const thread_id = parseInt(req.query.thread_id as string)
  //         if (thread_id) {
  //             const findAllRepliesByThread = await this.replyRepository.find({
  //                 where: { 
  //                   threads: 
  //                   { 
  //                     id: thread_id 
  //                   } },
  //                 relations: ["thread", "user"]
  //             })
  //             if (!findAllRepliesByThread) {
  //                 return res.status(404).json(
  //                   { 
  //                     Message: `No replies available for thread id ${thread_id}` 
  //                   }
  //                   )
  //             }
  //             return res.status(200).json(findAllRepliesByThread)
  //         } else {
  //             const findReplies = await this.replyRepository.find({ relations: ["thread", "user"] })
  //             if (!findReplies.length) {
  //                 return res.status(404).json({ Message: "No replies available" })
  //             }
  //             return res.status(200).json(findReplies)
  //         }
  //     } catch (error) {
  //         return res.status(500).json({ Message: "Error while getting replies" })
  //     }
  // }
    async find(req: Request, res: Response) {
      try {
     
        const replies = await this.replyRepository.find({
          relations: ["user", "threads" ],
          order: {
            id: "DESC", 
          },
        }); 
        return res.status(200).json(replies);
      } catch (err) {
        return res.status(500).json("Terjadi kesalahan pada server");
      }
    }


    async findOne(req: Request, res: Response) {
      try {
        const threadId = parseInt(req.query.threadId as string) ;
  
        // Assuming you have relationships named "user" and "threads" in your Reply entity
        const replies = await this.replyRepository.find({
          where: {
            threads: { id: threadId }, // Assuming your relationship field name is "threads"
          },
          order: {
            id: "ASC", 
          },
          relations: ["user", "threads"], // Ensure correct relation names
        });
  
        return res.status(200).json(replies);
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Terjadi kesalahan pada server" });
      }
    }
  
  
    
  

      async create(req: Request, res: Response) {
          try {
            const idThread = parseInt(req.params.idThread)
            const data = req.body;
            const loginSession = res.locals.loginSession
            const { error, value } = createdReplySchema.validate(data);
            console.log("masuk sini ga 1")
            if (error) {
              return res.status(400).json({ error: error });
            }
      
            if (isNaN(idThread)) {
              return res.status(400).json({ error: 'Invalid thread ID' });
            }


            const thread = await this.threadRepository.findOne({
              where: {
                id: idThread,
              },
            });
            if (!thread) {
              return res.status(404).json({ error: 'Thread not found' });
            }
      

            console.log("masuk sini ga 2")
            console.log(loginSession)
            
            const newReply = this.replyRepository.create({
              comment: value.comment,
              user: {
                id: loginSession.user.id,
              },
              threads: thread, // Set the relationship to the thread
            });
            
            console.log("masuk siniga 3")
            const createdReply = await this.replyRepository.save(newReply);
            return res.status(200).json(createdReply);
      
          } catch (error) {
          return res.status(500).json(error);
        }
      }
}
export default new ReplyService();
