
export interface IUser {
    id?: number;
    fullname?: string;
    username?: string;
    password?: string;
    email?: string;
    description?: string;
    picture?: string;
    is_followed? : boolean; 
  }


  
export interface IUserRegister {
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
}

  
export interface IUserLogin {
  email: string;
  password: string;
}



