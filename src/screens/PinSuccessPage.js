import React, { useState, useEffect } from "react";

import { Success } from "../components";
import { useNavigation } from "@react-navigation/native";

const SuccessfulPinSet = ({ route }) => {
  const navigation = useNavigation();
  const [reset, setReset] = useState(false);
  useEffect(() => {
    if (route.params && route.params.reset) {
      setReset(route.params.reset);
    }
  }, [route.params]);

  return (
    <Success
      text={reset ? "PIN Updated Successfully" : "PIN Created Successfully"}
      onPress={() => navigation.navigate(reset ? "Root" : "PinLogin")}
    />
  );
};

export default SuccessfulPinSet;
