import EncryptedStorage from "react-native-encrypted-storage";
import { reqPost } from "../service/request/userDetailsReq/user_details";
import { getSharedKeyDecoded } from "../service/utils";

export const postUserProfile = async () => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  const response = await reqPost(secretKey, accessToken);
  console.log(response, "yeys");
  if (response?.success === "OK") {
    return true;
  } else {
    return false;
  }
};
