import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { COLORS } from "../constants/theme";
import Divider from "./Divider";

const ArrowButton = ({ text, onPress, width, icon }) => {
  return (
    <View>
      <TouchableOpacity style={styles.headerContainer} onPress={onPress}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {icon && icon}
          <Text style={{ ...styles.headerText, marginLeft: icon ? 10 : 0 }}>
            {text}
          </Text>
        </View>
        <Image source={require("../assets/images/arrowRight.png")} />
      </TouchableOpacity>
      <View style={{ marginHorizontal: icon ? 16 : 0 }}>
        <Divider width={width} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  headerText: {
    fontSize: 14,
    color: COLORS.TextDark,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default ArrowButton;
