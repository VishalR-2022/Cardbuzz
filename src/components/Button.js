import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Arrow } from "../svg";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";

const Button = ({
  style,
  text,
  onPress,
  width,
  disable,
  outlined = false,
  color = COLORS.Primary,
  buttonText,
  maxWidth
}) => {
  return (
      <TouchableOpacity
        style={{
          ...styles.button,
          minWidth: width,
          maxWidth: maxWidth,
          backgroundColor: outlined
            ? "transparent"
            : disable
            ? COLORS.gray
            : color,
          borderColor: color,
          borderWidth: outlined ? 1 : 0,
          ...style,
        }}
        onPress={onPress}
        disabled={disable} // Set the disabled state based on disable prop
      >
        <Text
          style={{
            ...styles.buttonText,
            color: outlined ? color : COLORS.White,
            ...buttonText
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 8,
    overflow: "hidden",
    paddingHorizontal: 40,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
  },
});

export default Button;
