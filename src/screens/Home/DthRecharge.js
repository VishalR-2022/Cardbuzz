import React, { useState, useEffect } from "react";
import { NavigateRecharge } from "../../components";
import { useNavigation } from "@react-navigation/native";

const DthRecharge = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (route.params && route.params.data) {
      setData(route.params.data);
    }
  }, [route.params]);

  return (
    <NavigateRecharge
      operatorName={"DTH Recharge"}
      data={data}
      text="Enter Customer ID"
      placeholder={"Customer ID"}
      defaultValue={"9898989898"}
      desc="Your service provider will take two working days to consider bill paid in their accounts."
      buttonText={"Next"}
      onPress={() => {
        navigation.navigate("DthRechargePayment");
      }}
    />
  );
};

export default DthRecharge;
