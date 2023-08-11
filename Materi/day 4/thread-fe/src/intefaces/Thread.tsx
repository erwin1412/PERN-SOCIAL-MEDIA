import { IReply } from "./Reply";
import { IUser } from "./User";



export  interface IThread {
    id: number;
    user: IUser;
    content: string;
    posted_at: string;
    image: string;
    is_like: boolean;
    likes_count: number;
    replies_count : number;
    replies : IReply[];
  }