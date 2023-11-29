import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PopUp } from "../../components";

const PopUpWarningWalletMoney = ({ route }) => {
  const navigation = useNavigation();

  return (
    <PopUp
      popupType="warning"
      title="Something Went Wrong"
      para="Some error occurred while processing the payment"
      rechargeText="Amount to be Added"
      rechargeAmount={`₹${route.params.amount}`}
      buttontext="Try again"
      onPress={() => navigation.navigate("Root")}
    />
  );
};

export default PopUpWarningWalletMoney;
