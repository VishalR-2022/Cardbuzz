import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = ({ width = 1 }) => {
  return (
    <View style={{ ...styles.horizontalLine, borderBottomWidth: width }} />
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F4",
    marginBottom: 0,
    marginTop: 8,
  },
});

export default Divider;
