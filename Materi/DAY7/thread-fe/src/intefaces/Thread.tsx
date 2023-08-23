import { ILike } from "./Like";
import { IReply } from "./Reply";
import { IUser } from "./User";



export  interface IThread {
    id: number;
    user: IUser;
    content: string;
    posted_at: string;
    image: string;
    likes_count: number;
    is_like : boolean;
    replies_count : number;
    replies : IReply[];
    likes : ILike[];
  }


export  interface IThreadPost {
    content: string;
    image: string | Blob | MediaSource | null;
}