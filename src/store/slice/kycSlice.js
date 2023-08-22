import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aadharBackUrl: null,
  aadharFrontUrl: null,
  panCardUrl: null,
  kycComplete: false,
};

const kycSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    saveAadharFrontImageUrl: (state, action) => {
      state.aadharFrontUrl = action.payload.aadharFrontUrl;
    },
    saveAadharBackImageUrl: (state, action) => {
      state.aadharBackUrl = action.payload.aadharBackUrl;
    },
    savePanImageUrl: (state, action) => {
      state.panCardUrl = action.payload.panCardUrl;
    },
    isKycComplete: (state) => {
      state.kycComplete = true;
    },
  },
});

export const { saveAadharFrontImageUrl, saveAadharBackImageUrl, savePanImageUrl, isKycComplete } = kycSlice.actions;
export default kycSlice.reducer;
