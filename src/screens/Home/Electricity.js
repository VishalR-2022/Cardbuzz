import React from "react";
import { SelectOperator } from "../../components";

const Electricity = () => {
  return (
    <SelectOperator
      data={'Electricity'}
      backButtonText="Select Electricity Operator"
      navigate="ElectricityRecharge"
    />
  );
};

export default Electricity;
