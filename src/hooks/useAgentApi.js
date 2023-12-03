import EncryptedStorage from "react-native-encrypted-storage";
import {
  reqPost,
  reqGet,
  reqPostPicture,
  reqPutKyc,
} from "../service/request/userDetailsReq/user_details";
import { getSharedKeyDecoded } from "../service/utils";
import { refreshToken } from "./useAuthApi";

export const postUserProfile = async () => {
  const userData = {
    name: "Mr Rahul S",
    bank_acc_number: "987987987654",
    bank_acc_ifsc: "SBIN9876017",
    business_name: "Shop owner",
    pan_number: "FXHPR2345Q",
    aadhar_number: "585854585458",
    turnover: 2000000,
    ownership_type: "PROPRIETARY",
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

  const response = await reqPostPicture(secretKey, accessToken, data);
  console.log(response, "userHook");
  if (response?.success === "OK") {
    return true;
  } else {
    return false;
  }
};

export const getUserProfile = async () => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  console.log(secretKey, "secretKey");
  const response = await reqGet(secretKey, accessToken);
  if (response?.success === "OK") {
    return response;
  } else if (response === "refetch_access") {
    const refetch = await refreshToken();
    if (refetch) {
      const response = await reqGet(secretKey, accessToken);
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
