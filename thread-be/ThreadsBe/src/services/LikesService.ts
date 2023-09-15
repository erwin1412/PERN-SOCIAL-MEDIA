import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createdReplySchema } from "../utils/validators/reply";
import { Like } from "../entities/Like";
import { Threads } from "../entities/Thread";
import { createdLikeSchema } from "../utils/validators/likes";
class LikeService {
  private readonly likeRepository: Repository<Like> =
    AppDataSource.getRepository(Like);
  private readonly threadRepository: Repository<Threads> =
    AppDataSource.getRepository(Threads);

  async find(req: Request, res: Response) {
    try {
      const replies = await this.likeRepository.find({
        relations: ["user", "threads"],
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
      const threadId = parseInt(req.params.threadId);

      const replies = await this.likeRepository.find({
        where: {
          threads: { id: threadId }, // Assuming your relationship field name is "threads"
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
      const loginSession = res.locals.loginSession;

      console.log("masuk sini ga 2");
      console.log(loginSession);

      const checkLike = await this.likeRepository.count({
        where: {
          user: {
            id: loginSession.user.id,
          },
          threads: {
            id: req.body.thread_id,
          },
        },
      });
      if (checkLike > 0) {
        const deletedLike = this.likeRepository.delete({
          user: {
            id: loginSession.user.id,
          },
          threads: {
            id: req.body.thread_id,
          },
        });
        return res.status(200).json({ deletedLike });
      }
      const newLike = this.likeRepository.create({
        user: {
          id: loginSession.user.id,
        },
        threads: {
          id: req.body.thread_id,
        },
      });

      console.log("masuk siniga 3");
      const createdReply = await this.likeRepository.save(newLike);
      return res.status(200).json({
        createdReply,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
export default new LikeService();

//       async create(req: Request, res: Response) {
//           try {
//             const idThread = parseInt(req.params.idThread)
//             const data = req.body;
//             const loginSession = res.locals.loginSession
//             const { error, value } = createdLikeSchema.validate(data);
//             console.log("masuk sini ga 1")
//             if (error) {
//               return res.status(400).json({ error: error });
//             }

//             if (isNaN(idThread)) {
//               return res.status(400).json({ error: 'Invalid thread ID' });
//             }

//             const thread = await this.threadRepository.findOne({
//               where: {
//                 id: idThread,
//               },
//             });
//             if (!thread) {
//               return res.status(404).json({ error: 'Thread not found' });
//             }

//             console.log("masuk sini ga 2")
//             console.log(loginSession)

//             const newReply = this.likeRepository.create({
//               isLike: value.isLike,
//               user: {
//                 id: loginSession.user.id,
//               },
//               threads: thread, // Set the relationship to the thread
//             });

//             console.log("masuk siniga 3")
//             const createdReply = await this.likeRepository.save(newReply);
//             return res.status(200).json(createdReply);

//           } catch (error) {
//           return res.status(500).json(error);
//         }
//       }
// }
// export default new LikeService();
