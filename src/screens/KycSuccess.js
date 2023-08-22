import { useDispatch } from "react-redux";
import { Success } from "../components";
import { useNavigation } from "@react-navigation/native";
import { isKycComplete } from "../store/slice/kycSlice";

const KycSuccess = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(isKycComplete());
    navigation.navigate("PopUpKycSuccess");
  };

  return (
    <Success
      text={"KYC Verification Process Update"}
      onPress={handlePress}
      para={
        "Thank you for submitting your documents for KYC verification. We're reviewing them for security and compliance. Your cooperation is appreciated. Verification in progress."
      }
    />
  );
};

export default KycSuccess;
