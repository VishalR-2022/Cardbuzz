import EncryptedStorage from "react-native-encrypted-storage";
import {
  createUser,
  verifySignupOTP,
  resendOTP,
  createUserPin,


  // delete after
  plainReqPost,
  plainReqGet,
  encReqPost,
  encReqGet,
  resetPin,
  verifyPin,
  loginViaPin,
  logout,
} from "../service/cardbuzzApi";
import { genSharedSecret, getSharedKeyDecoded } from "../service/utils";

export const postCreateUser = async (data) => {
  const response = await createUser(data);
  if (response?.success === "OK") {
    await EncryptedStorage.setItem("access_token_login", response.data.access);
    return true;
  } else {
    return false;
  }
};

export const postResendOtp = async (data) => {
  const accessToken = await EncryptedStorage.getItem("access_token_login");
  const response = await resendOTP(data.userData, accessToken);
  if (response?.success === "OK") {
    return true;
  } else {
    return false;
  }
};

export const postVerifySignupOTP = async (data) => {
  const accessToken = await EncryptedStorage.getItem("access_token_login");
  console.log(accessToken, data, '~~~~~~~~~');
  const response = await verifySignupOTP(data.userData, accessToken, data.OTP);
  if (response?.success === "OK") {
    await EncryptedStorage.setItem(
      "access_token_login",
      response.data.access_token
    );
    return true;
  } else {
    return false;
  }
};

export const postCreateUserPin = async (data) => {
  const accessToken = await EncryptedStorage.getItem("access_token_login");
  const response = await createUserPin(data.userData, accessToken, data.pin);
  if (response?.status === "OK") {
    await EncryptedStorage.setItem(
      "jwt_access_token",
      response.data.access_token
    );
    await EncryptedStorage.setItem(
      "jwt_refresh_token",
      response.data.refresh_token
    );
    await genSharedSecret(response.data.ppk);
    return true;
  }
  //   else if(response?.code === 20012) {
  //     if(response.msg === 'jwt token has been revoked/expired'){
  //       const refreshToken = await EncryptedStorage.getItem("refresh_token");

  //     const response = await refreshAccessToken(refreshToken);
  //     console.log(response, 'refreshAccessToken');
  //   }
  // }
  else {
    console.log(response, "errrrrr");
    return false;
  }
};

export const checkPlainReq = async () => {
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");
  const secretKey = await getSharedKeyDecoded();

  await plainReqPost(secretKey, accessToken);
  await plainReqGet(secretKey, accessToken);
  await encReqPost(secretKey, accessToken);
  await encReqGet(secretKey, accessToken);
};

export const postResetPin = async (data) => {
  const refreshToken = await EncryptedStorage.getItem("jwt_refresh_token");
  const secretKey = await getSharedKeyDecoded();

  const response = await resetPin(data.userData, secretKey, refreshToken, data.oldPin, data.newPin);
  if (response?.success === "OK") {
    await EncryptedStorage.setItem(
      "jwt_access_token",
      response.data.access_token
    );
    return true;
  } else {
    return false;
  }
};

export const postVerifyPin = async (data) => {
  const intent = {
    action: "EDIT-USER-PROFILE",
  }
  const refreshToken = await EncryptedStorage.getItem("jwt_refresh_token");
  const secretKey = await getSharedKeyDecoded();

  const response = await verifyPin(data.userData, secretKey, refreshToken, data.pin, intent);
  if (response?.status === "OK") {
    console.log(response, 'verifyPin success');
    await EncryptedStorage.setItem(
      "jwt_access_token",
      response.data.access_token
    );
    return true;
  } else {
    return false;
  }
};

export const postLoginViaPin = async (data) => {
  const response = await loginViaPin(data.userData, data.pin);
  if (response?.status === "OK") {
    console.log(response, 'login success');
    await EncryptedStorage.setItem(
      "jwt_access_token",
      response.data.access_token
    );
    await EncryptedStorage.setItem(
      "jwt_refresh_token",
      response.data.refresh_token
    );
    return true;
  } else {
    return false;
  }
};

// ---------------------- Logout ------------------------

export const postLogout = async (data) => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  const response = logout(secretKey, accessToken);
}