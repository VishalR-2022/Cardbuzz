import EncryptedStorage from "react-native-encrypted-storage";
import { reqPost, reqGet } from "../service/request/userDetailsReq/user_details";
import { getSharedKeyDecoded } from "../service/utils";

export const postUserProfile = async (data) => {
  // const userData = {
  //   name: data.fullName,
  //   bank_acc_number: data.accountNumberCheck,
  //   bank_acc_ifsc: data.ifscCode,
  //   business_name: "Kabari Shop",
  //   turnover: 2000000,
  //   ownership_type: "PROPRIETARY",
  //   city: "Belgaum",
  //   district: "Belgaum",
  //   state: "Maharashtra",
  //   pincode: data.pinCode,
  //   latitude: "25",
  //   longitude: "76",
  //   address1: data.address,
  //   address2: "My address 22",
  //   dob: (str = "01\/01\/1981"),
  //   bank_name: data.bankName,
  // };

  const userData = {
    name: "Mr X Delhi",
    bank_acc_number: "000598120089705",
    bank_acc_ifsc: "HDFC0000001",
    business_name: "Kabari Shop",
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
    dob: (str = "01\/01\/1981"),
  };

  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  const response = await reqPost(secretKey, accessToken, userData);
  if (response?.success === "OK") {
    return true;
  } else {
    return false;
  }
};

export const getUserProfile = async () => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  const response = await reqGet(secretKey, accessToken);
  if (response?.success === "OK") {
    return response;
  } else {
    return false;
  }
};