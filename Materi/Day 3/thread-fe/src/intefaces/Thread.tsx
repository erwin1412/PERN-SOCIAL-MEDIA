import { Reply } from "./Reply";
import { User } from "./User";


export  interface Thread {
    id: number;
    user: User;
    content: string;
    posted_at: string;
    image: string;
    is_like: boolean;
    likes_count: number;
    replies_count : number;
    replies : Reply[];
  }