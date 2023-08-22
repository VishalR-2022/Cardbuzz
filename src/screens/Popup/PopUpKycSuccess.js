import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PopUp } from "../../components";

const PopUpKycSuccess = () => {
  const navigation = useNavigation();

  return (
    <PopUp
      popupType="complete"
      title="Success"
      para="Your account has been Approved."
      buttontext="Done"
      onPress={() => navigation.navigate("Root")}
    />
  );
};

export default PopUpKycSuccess;
