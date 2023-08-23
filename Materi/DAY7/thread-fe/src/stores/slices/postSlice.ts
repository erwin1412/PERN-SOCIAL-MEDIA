import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCreatePostOpen: false,
  // other post-related initial state properties...
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    toggleCreatePost: (state) => {
      state.isCreatePostOpen = !state.isCreatePostOpen;
    },
    // other post-related reducer actions...
  },
});

export const { toggleCreatePost } = postSlice.actions;

export default postSlice.reducer;
