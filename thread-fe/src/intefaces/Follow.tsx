
export interface IFollower {
  id: number;
  user_id: number;
  username: string;
  fullname: string;
  email: string;
  picture: string;
  description: string;
  is_follow: boolean;
}



export interface IFollowing {
    id: number;
    user_id: number;
    username: string;
    fullname: string;
    email: string;
    picture: string;
    description: string;
    // is_followed: boolean;
  }