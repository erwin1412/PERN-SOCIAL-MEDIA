import { IFollowing } from "@/intefaces/Follow";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialFollowingState: IFollowing[] = [];
export const followingSlice = createSlice({
  name: "following",
  initialState: initialFollowingState,
  reducers: {
    GET_FOLLOWING: (state, action: PayloadAction<{following: IFollowing }>) => {
      const payload = action.payload;

      state = payload.following

      return state;
    },
  },
}
);
