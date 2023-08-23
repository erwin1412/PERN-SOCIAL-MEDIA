import { IThread } from "@/intefaces/Thread";
import { IUser } from "@/intefaces/User";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialthreadstate: IThread[] = []

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialthreadstate,
  reducers: {

    // thread_LOGIN: (state, action) => {
    //   const payload = action.payload;
    //   console.log("ini data payload : ", payload);
    //   localStorage.setItem("token", payload.token);
    //   state.id = payload.user.id; // Store user's ID in the state
    //   state.email = payload.user.email;
    //   state.username = payload.user.username;
    //   state.fullname = payload.user.fullname;
    // },

    GET_THREAD: (state, action: PayloadAction<{threads: IThread }>) => {
      const payload = action.payload;

      state = payload.threads

      return state;
    },
    


// thread_LOGIN: (_, action) => {
//   const payload = action.payload;
//   console.log("ini data payload : ", payload);
//   localStorage.setItem("token", payload.token);
//   const user: IUser = {
//     id: payload.user.id,
//     email: payload.user.email,
//     username: payload.user.username,
//     fullname: payload.user.fullname,
//   };
  

//   return user;
// },
    
    // thread_CHECK: (state, action) => {},
    // thread_ERROR: (state) => {},
    // thread_LOGOUT: (state) => {},
  },
});

// export function threadSlice = createSlice{{
// name: "thread",
// initialstate : initialthreadstate,
// reducers:{
//     thread_LOGIN : (state : IUser, action) =>{
//         localStorage.setItem("token", action.payload.token)
//         state = action.payload
//         const user : IUser = {
//             id : action.payload.id,
//             fullname : action.payload.fullname,
//             username : action.payload.username,
//             email : action.payload.email,
//         }
//     },
//     thread_CHECK : (state, action) =>{

//     },
//     thread_ERROR : (state) =>{

//     },
//     thread_LOGOUT : (state) =>{

// },
// }}}
