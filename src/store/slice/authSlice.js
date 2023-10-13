import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  mobileNumber: null,
  imageUrl: null,
  pin: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.mobileNumber = action.payload.mobileNumber; // Save mobile number to state
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.mobileNumber = null; // Reset mobile number on logout
    },
    saveImageUrl: (state, action) => {
      state.imageUrl = action.payload.imageUrl;
    },
    savePin: (state, action) => {
      state.pin = action.payload.pin;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.token
    }
  },
});

export const { login, logout, saveImageUrl, savePin, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
