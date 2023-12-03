import EncryptedStorage from "react-native-encrypted-storage";
import { reqGetBillerUnderCategory } from "../service/request/bbpsReq/bbpsReq";
import { getSharedKeyDecoded } from "../service/utils";

export const getBillerCategoryOperator = async (category) => {
  const secretKey = await getSharedKeyDecoded();
  const accessToken = await EncryptedStorage.getItem("jwt_access_token");

  const response = await reqGetBillerUnderCategory(secretKey, accessToken, category);
  if (response?.status_code === 200) {
    return response.data;
  } else {
    return false;
  }
};

    