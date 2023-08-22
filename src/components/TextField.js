import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const TextField = ({ value, onChangeText, placeholder, keyboardType = "default", defaultValue, ...rest }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={[styles.inputContainer, { borderColor: isFocused ? COLORS.Primary : COLORS.ButtonBorder }]}>
      <TextInput
        style={[styles.input, { paddingLeft: 20 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType={keyboardType}
        {...rest}
      />
      <View style={styles.borderTextContainer}>
        <Text style={styles.borderText}>{placeholder}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 8,
    backgroundColor: "transparent",
    borderWidth: 1,
    marginTop: 20,
    position: "relative",
    minWidth: 300,
  },
  input: {
    backgroundColor: "transparent",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  borderTextContainer: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "white",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  borderText: {
    fontSize: 12,
    color: "gray",
    backgroundColor: "transparent",
  },
});

export default TextField;
