import { IUser } from "@/intefaces/User";
import { setAuthToken } from "@/lib/api";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialAuthState : IUser = {
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
  initialState: initialAuthState,
  reducers: {

    AUTH_LOGIN: (state, action: PayloadAction<{ token: string; user: IUser }>) => {
      const payload = action.payload;
      setAuthToken(payload.token)
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.id = payload.user.id;
      state.email = payload.user.email;
      state.username = payload.user.username;
      state.fullname = payload.user.fullname;
      state.description = payload.user.description;
      state.picture = payload.user.picture;
    },

    
    AUTH_CHECK: (state, action) => {
      const payload = action.payload
      console.log("redux auth check : ",payload)
      setAuthToken(payload.token)
      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      const current: IUser = {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email
      }
      return current
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token")
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token")
    },

  }
})
