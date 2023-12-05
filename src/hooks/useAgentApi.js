import EncryptedStorage from "react-native-encrypted-storage";
import {
  reqPost,
  reqGet,
  reqPostPicture,
  reqPutKyc,
} from "../service/request/userDetailsReq/user_details";
import { getSharedKeyDecoded } from "../service/utils";
import { refreshToken } from "./useAuthApi";

export const postUserProfile = async (data) => {
  console.log(data)
  const userData = {
    name: data.fullName,
    bank_acc_number: data.accountNumber,
    bank_acc_ifsc: data.ifscCode,
    business_name: "Shop owner",
    pan_number: data.pan,
    aadhar_number: data.aadhar,
    turnover: data.turnover,
    ownership_type: data.ownershipType,
    city: "Belgaum",
    district: "Belgaum",
    state: "Maharashtra",
    pincode: "591244",
    latitude: "25",
    longitude: "76",
    address1: "My Address 11",
    address2: "My address 22",
    dob: (str = "01/01/1981"),
  };

  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  const response = await reqPost(secretKey, accessToken, userData);
  if (response?.success === "OK") {
    return true;
  }
  return false;
};

export const postUserProfilePhoto = async (data) => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");
  console.log(data, "userHook");

  const response = await reqPostPicture(secretKey, accessToken, data);
  if (response?.success === "OK") {
    return true;
  } else {
    return false;
  }
};

export const getUserProfile = async () => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  console.log(accessToken, "secretKey");
  const response = await reqGet(secretKey, accessToken);
  if (response?.success === "OK") {
    return response;
  } else if (response === "refetch_access") {
    const refetch = await refreshToken();
    if (refetch) {
      const accessTokenRefetched = await EncryptedStorage.getItem("jwt_access_token");
      const response = await reqGet(secretKey, accessTokenRefetched);
      if (response?.success === "OK") {
        return response;
      }
    }
    return false;
  }
  return false;
};

export const putUserProfile = async (data) => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  const response = await reqPutKyc(secretKey, accessToken, data);
  if (response?.success === "OK") {
    return response;
  } else {
    return false;
  }
};
