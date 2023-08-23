import { IThread } from "./Thread";
import { IUser } from "./User";


export interface IReply {
    id: number;
    comment : string;
    user : IUser
    thread : IThread
  }