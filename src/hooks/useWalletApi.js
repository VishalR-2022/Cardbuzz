import EncryptedStorage from "react-native-encrypted-storage";
import { getSharedKeyDecoded } from "../service/utils";
import {
  getBalance,
  getEarnings,
} from "../service/request/walletReq/walletReq";

export const getUserEarnings = async () => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  const response = await getEarnings(secretKey, accessToken);
  if (response?.status_code === 200) {
    return response.data;
  } else {
    return false;
  }
};

export const getUserBalanceInfo = async () => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  const response = await getBalance(secretKey, accessToken);
  if (response?.status_code === 200) {
    return response.data;
  } else {
    return false;
  }
};
