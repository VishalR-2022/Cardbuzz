import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  mobileNumber: null,
  imageUrl: null,
  pin: null,
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
  },
});

export const { login, logout, saveImageUrl, savePin } = authSlice.actions;
export default authSlice.reducer;

// ----------------keychain--------------------


// --------------- create storage in root/helper folder

// import * as Keychain from 'react-native-keychain';

// export const saveToken = async (token: string) => {
//   try {
//     await Keychain.setInternetCredentials('apiToken', 'apiKey', token);
//     console.log('Token saved successfully');
//   } catch (error) {
//     console.log('Error saving token:', error);
//   }
// };

// export const retrieveToken = async () => {
//   try {
//     const credentials = await Keychain.getInternetCredentials('apiToken');
//     if (credentials) {
//       const token = credentials.password;
// return token;
//     } else {
//       console.log('No token found');
//       return null;
//     }
//   } catch (error) {
//     console.log('Error retrieving token:', error);
//     return null;
//   }
// };

// export const removeToken = async () => {
//   try {
//     await Keychain.resetInternetCredentials('apiToken');
//     return true;
//   } catch (error) {
//     console.log('Error retrieving token:', error);
//     return false;
//   }
// };