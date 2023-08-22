import React, { useState } from "react";
import PinCodeInput from "react-native-smooth-pincode-input";
import { View } from "react-native"; // Import View from react-native
import { COLORS } from "../constants/theme";

const PinInput = ({
  pin,
  setPin,
  length,
  onComplete,
  justifyContent = "center",
  disable = true,
  error = false,
}) => {
  // const [pin, setPin] = useState("");

  const handleChangePin = (newPin) => {
    setPin(newPin);
    if (newPin.length === length) {
      onComplete(newPin);
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: justifyContent }}>
      <PinCodeInput
        editable={disable}
        cellSpacing={8}
        password
        mask="﹡"
        codeLength={length}
        value={pin}
        onTextChange={handleChangePin}
        keyboardType="number-pad"
        textStyle={{ fontSize: 16 }}
        cellStyle={{
          width: 45,
          height: 56,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: error ? COLORS.Error : "#dddd",
          padding: 8,
        }}
      />
    </View>
  );
};

export default PinInput;
