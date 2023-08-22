import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import Divider from "./Divider";
import Button from "./Button";
import { useNavigation } from "@react-navigation/native";

const RechargeOptions = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.topHeader}>Validity</Text>
          <Text style={styles.bottomHeader}>1 Day</Text>
        </View>
        <View>
          <Text style={styles.topHeader}>Data</Text>
          <Text style={styles.bottomHeader}>500 MB</Text>
        </View>
        <View>
          <Text
            style={{ fontSize: 16, fontWeight: "700", color: COLORS.Primary }}
          >
            ₹649
          </Text>
        </View>
      </View>
      <Divider />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginTop: 20,
        }}
      >
        <Text style={{ ...styles.topHeader, marginRight: 6, width: "70%" }}>
          Lorem ipsum dolor sit amet consect. Rhoncus sit in nec nunc etiam at
          viv Lorem ipsum dolor sit amet consect. Rhoncus sit in nec nunc etiam
          at viv...
        </Text>
        <Button
          text={"Pay"}
          onPress={() => {
            navigation.navigate("PaymentOptions");
          }}
          style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        />
      </View>
      <Text
        style={{
          marginTop: 10,
          fontWeight: "500",
          fontSize: 12,
          color: COLORS.TextDark,
          textDecorationLine: "underline",
        }}
      >
        Show Less
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.White,
    marginHorizontal: 16,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: "#EDEDED",
    borderWidth: 1,
    borderRadius: 8,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topHeader: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.TextGray,
    lineHeight: 20,
  },
  bottomHeader: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TextDark,
  },
});

export default RechargeOptions;
