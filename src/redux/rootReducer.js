import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import userReducer from "./slices/userSlice";
import commonSlice from "./slices/commonSlice";

const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer,
    common: commonSlice,
});

export default rootReducer;
