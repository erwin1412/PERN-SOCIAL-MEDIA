import { IThread } from "./Thread";
import { IUser } from "./User";

export  interface ILike {
    id: number;
    user: IUser;
    isLike: boolean;
    thread : IThread
  }