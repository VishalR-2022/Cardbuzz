import EncryptedStorage from "react-native-encrypted-storage";

export const DEVICE_ID = () => {
  return EncryptedStorage.getItem("device_id");
};

export const MOBILE_NO = () => {
  return EncryptedStorage.getItem("mobile_no");
};
  