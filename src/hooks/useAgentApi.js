import EncryptedStorage from "react-native-encrypted-storage";
import { reqPost, reqGet, reqPostPicture, reqPutKyc } from "../service/request/userDetailsReq/user_details";
import { getSharedKeyDecoded } from "../service/utils";

export const postUserProfile = async (data) => {
  const userData = {
    name: data.fullName,
    bank_acc_number: data.accountNumberCheck,
    bank_acc_ifsc: data.ifscCode,
    business_name: data.businessName,
    pan_number: data.pan,
    aadhar_number: data.aadhar,
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
  console.log(response, 'userHook')
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


// {"assetId": null, "base64": null, "duration": null, "exif": null, "height": 3686, "rotation": null, "type": "image", "uri": "file:///data/user/0/com.payline/cache/ImagePicker/6e2db637-999f-4a3a-bc71-6316728c0689.jpeg", "width": 2764}