import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PopUp } from "../../components";

const PopUpKycError = () => {
  const navigation = useNavigation();

  return (
    <PopUp
      popupType="error"
      title="Blocked"
      para="Your account has been Blocked / Restricted. Please contact Admin"
      buttontext="Contact Us"
      onPress={() => navigation.navigate("Home")}
    />
  );
};

export default PopUpKycError;
