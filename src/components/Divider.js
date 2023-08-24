import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = ({ width = 1, color = "#F3F3F4" }) => {
  return (
    <View
      style={{
        ...styles.horizontalLine,
        borderBottomWidth: width,
        borderBottomColor: color,
      }}
    />
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomWidth: 1,
    marginBottom: 0,
    marginTop: 8,
  },
});

export default Divider;
