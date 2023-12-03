import React from "react";
import { SelectOperator } from "../../components";

const broadbandOperators = [
  { id: "1", name: "Operator 1", icon: require("../../assets/images/jio.png") },
  {
    id: "2",
    name: "Operator 2",
    icon: require("../../assets/images/airtel.png"),
  },
  { id: "3", name: "Operator 3", icon: require("../../assets/images/jio.png") },
  {
    id: "4",
    name: "Operator 4",
    icon: require("../../assets/images/airtel.png"),
  },
  { id: "5", name: "Operator 5", icon: require("../../assets/images/jio.png") },
  {
    id: "6",
    name: "Operator 6",
    icon: require("../../assets/images/airtel.png"),
  },
  { id: "7", name: "Operator 7", icon: require("../../assets/images/jio.png") },
  {
    id: "8",
    name: "Operator 8",
    icon: require("../../assets/images/airtel.png"),
  },
  { id: "9", name: "Operator 9", icon: require("../../assets/images/jio.png") },
  {
    id: "10",
    name: "Operator 10",
    icon: require("../../assets/images/airtel.png"),
  },
  {
    id: "11",
    name: "Operator 11",
    icon: require("../../assets/images/jio.png"),
  },
  {
    id: "12",
    name: "Operator 12",
    icon: require("../../assets/images/airtel.png"),
  },
  {
    id: "13",
    name: "Operator 13",
    icon: require("../../assets/images/jio.png"),
  },
  {
    id: "14",
    name: "Operator 14",
    icon: require("../../assets/images/airtel.png"),
  },
  {
    id: "15",
    name: "Operator 15",
    icon: require("../../assets/images/jio.png"),
  },
  {
    id: "16",
    name: "Operator 16",
    icon: require("../../assets/images/airtel.png"),
  },
];

const GasOperator = () => {
  return (
    <SelectOperator
      data={'Gas'}
      backButtonText="Select GAS Company"
      navigate={"GasBillRecharge"}
    />
  );
};

export default GasOperator;
