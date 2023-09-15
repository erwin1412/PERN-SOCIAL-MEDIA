
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices';
import { threadSlice } from './slices/threadSlice';
import { followerSlice } from './slices/followerSlice';
import { followingSlice } from './slices/followingSlice';

export const {
    AUTH_LOGIN,AUTH_CHECK,AUTH_ERROR,AUTH_LOGOUT
} = authSlice.actions
export const {
    GET_THREAD,
} = threadSlice.actions
export const {
    GET_FOLLOWER,
} = followerSlice.actions
export const {
    GET_FOLLOWING,
} = followingSlice.actions
export const authReducer = authSlice.reducer;
export const threadReducer = threadSlice.reducer;
export const followerReducer = followerSlice.reducer;
export const followingReducer = followingSlice.reducer;
const rootReducer = combineReducers({
    auth :authReducer,
    thread : threadReducer,
    followers : followerReducer,
    following : followingReducer,
})
export default rootReducer;
