import EncryptedStorage from "react-native-encrypted-storage";

export const DEVICE_ID = () => {
  return EncryptedStorage.getItem("device_id");
};

export const MOBILE_NO = () => {
  return EncryptedStorage.getItem("mobile_no");
};
  
export const UserInfoConverter = (data) => {
  let userData = {
    ...data,
    fullName: data.name,
    businessName: data.business_name,
    turnover: data.turnover,
    ownershipType: data.ownership_type,
    dob: data.dob,
    pan: data.pan,
    aadhar: data.aadhar_number,
    state: data.state,
    pinCode: data.pincode,
    address1: data.address1,
    address2: data.address2,
    bankName: data.bank_name,
    accountNumber: data.bank_acc_number,
    ifscCode: data.bank_acc_ifsc,
  };
  return userData;
};