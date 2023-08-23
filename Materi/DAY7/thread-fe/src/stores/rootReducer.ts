
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices';
import { threadSlice } from './slices/threadSlice';
export const {
    AUTH_LOGIN,AUTH_CHECK,AUTH_ERROR,AUTH_LOGOUT
} = authSlice.actions
export const {
    GET_THREAD,
} = threadSlice.actions
export const authReducer = authSlice.reducer;
export const threadReducer = threadSlice.reducer;
const rootReducer = combineReducers({
    auth :authReducer,
    thread : threadReducer,
})
export default rootReducer;
