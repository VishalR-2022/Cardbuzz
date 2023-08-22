import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PopUp } from "../components";

const PopUpKycWarning = () => {
  const navigation = useNavigation();

  return (
    <PopUp
      popupType="warning"
      title="Something Went Wrong"
      para="After reviewing the provided documents, we've identified issues needing resolution before proceeding with verification. Accuracy and compliance are crucial."
      buttontext="Re Apply"
      onPress={() => navigation.navigate("Root")}
    />
  );
};

export default PopUpKycWarning;
