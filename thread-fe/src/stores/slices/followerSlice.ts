import { IFollower } from "@/intefaces/Follow";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialFollowerState: IFollower[] = [];
export const followerSlice = createSlice({
  name: "followers",
  initialState: initialFollowerState,
  reducers: {
    GET_FOLLOWER: (state, action: PayloadAction<{followers: IFollower }>) => {
      const payload = action.payload;

      state = payload.followers

      return state;
    },
  },
}
);
