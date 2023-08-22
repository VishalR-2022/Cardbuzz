import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Arrow } from "../svg";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";

const BackButton = ({ text, selectedTab, color }) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    if (selectedTab) {
      navigation.navigate("Root");
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleGoBack}>
        <Arrow color={color} />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={{ ...styles.headerText, color: color }}>{text}</Text>
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
    marginTop: 8,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    color: COLORS.TextDark,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default BackButton;
