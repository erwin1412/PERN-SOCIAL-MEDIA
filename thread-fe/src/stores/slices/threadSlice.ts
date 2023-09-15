import { IThread } from "@/intefaces/Thread";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialthreadstate: IThread[] = [];
export const threadSlice = createSlice({
  name: "thread",
  initialState: initialthreadstate,
  reducers: {
    GET_THREAD: (state, action: PayloadAction<{ threads: IThread }>) => {
      const payload = action.payload;

      state = payload.threads;

      return state;
    },
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
