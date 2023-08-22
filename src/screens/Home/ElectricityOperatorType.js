import React from "react";
import { SelectOperator } from "../../components";
import { useNavigation } from "@react-navigation/native";

const broadbandOperators = [
  {
    id: "1",
    name: "PrePaid",
    icon: require("../../assets/images/PrePaid.jpg"),
  },
  {
    id: "2",
    name: "PostPaid",
    icon: require("../../assets/images/PostPaid.jpg"),
  },
];

const ElectricityOperatorType = () => {
  const navigation = useNavigation();

  return (
    <SelectOperator
      data={broadbandOperators}
      backButtonText="Select Operator Type"
      onPress={() => navigation.navigate("ElectricityOperator")}
    />
  );
};

export default ElectricityOperatorType;
