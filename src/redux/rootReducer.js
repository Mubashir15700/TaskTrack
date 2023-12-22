import { combineReducers } from '@reduxjs/toolkit';
import adminReducer from './slices/adminSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer,
});

export default rootReducer;