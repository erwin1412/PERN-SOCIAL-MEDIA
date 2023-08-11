import { IUser } from "@/intefaces/User";

import { createSlice } from "@reduxjs/toolkit";

const initialAuthstate: IUser = {
    id: 0,
    fullname: "",
    username: "",
    password: "",
    email: "",
    description: "",
    picture: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthstate,
  reducers: {

    // AUTH_LOGIN: (state, action) => {
    //   const payload = action.payload;
    //   console.log("ini data payload : ", payload);
    //   localStorage.setItem("token", payload.token);
    //   state.id = payload.user.id; // Store user's ID in the state
    //   state.email = payload.user.email;
    //   state.username = payload.user.username;
    //   state.fullname = payload.user.fullname;
    // },

    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      console.log("ini data payload : ", payload);
      localStorage.setItem("token", payload.token);
      const user: IUser = {
        id: payload.user.id,
        email: payload.user.email,
        username: payload.user.username,
        fullname: payload.user.fullname,
      };

      return user;
    },
    // AUTH_CHECK: (state, action) => {},
    // AUTH_ERROR: (state) => {},
    // AUTH_LOGOUT: (state) => {},
  },
});

// export function authSlice = createSlice{{
// name: "auth",
// initialstate : initialAuthstate,
// reducers:{
//     AUTH_LOGIN : (state : IUser, action) =>{
//         localStorage.setItem("token", action.payload.token)
//         state = action.payload
//         const user : IUser = {
//             id : action.payload.id,
//             fullname : action.payload.fullname,
//             username : action.payload.username,
//             email : action.payload.email,
//         }
//     },
//     AUTH_CHECK : (state, action) =>{

//     },
//     AUTH_ERROR : (state) =>{

//     },
//     AUTH_LOGOUT : (state) =>{

// },
// }}}
