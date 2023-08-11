
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices';


export const {
    // AUTO_CHECK,
    AUTH_LOGIN,
    // AUTH_ERROR,
    // AUTH_LOGOUT
} = authSlice.actions

export const authReducer = authSlice.reducer;

const rootReducer = combineReducers({
    auth :authReducer,
})


export default rootReducer;