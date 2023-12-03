import React from "react";
import { SelectOperator } from "../../components";
const FastTagIssuer = () => {
  return (
    <SelectOperator
      data={'Fastag'}
      backButtonText="Select FASTtag Issuer"
      navigate={"FastTagRecharge"}
    />
  );
};

export default FastTagIssuer;
