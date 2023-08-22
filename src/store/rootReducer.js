import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import userReducer from "./slice/userSlice";
import kycReducer from "./slice/kycSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  kyc: kycReducer
});

export default rootReducer;
