import React from "react";
import { useNavigation } from "@react-navigation/native";
import { PopUp } from "../../components";

const PopUpSuccessWalletMoney = () => {
  const navigation = useNavigation();

  return (
    <PopUp
      popupType="complete"
      title="Yey!"
      para="Money has been added to your wallet successfully"
      rechargeText="Amount Added"
      rechargeAmount="₹200"
      buttontext="Done"
      onPress={() => navigation.navigate("PopUpWarningWalletMoney")}
    />
  );
};

export default PopUpSuccessWalletMoney;
