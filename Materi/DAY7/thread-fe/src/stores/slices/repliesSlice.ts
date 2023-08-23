import { ILike } from "@/intefaces/Like";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialLikestate: ILike = {
    id: 0,
    user: parseInt(0),
    isLike: null,
    thread: 0,
};

export const likeSlice = createSlice({
  name: "like",
  initialState: initialLikestate,
  reducers: {


    AUTH_LIKE: (state, action: PayloadAction<{ token: string; like: ILike }>) => {
      const payloadLike = action.payload;
    
      localStorage.setItem("token", payloadLike.token);
    
      state.id = payloadLike.like.id;
      state.user = payloadLike.like.user;
      state.isLike = payloadLike.like.isLike;
      state.thread = payloadLike.like.thread;
      return state;
    },
    
  },
});