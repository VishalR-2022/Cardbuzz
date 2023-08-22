import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { Electricity } from "../svg";
import Divider from "./Divider";

const data = [
  {
    name: "Electric bill",
    icon: Electricity,
    payment: false,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "370",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: true,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "3070",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: false,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "3070",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: true,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "200",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: false,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "3070",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: true,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "800",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: false,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "3070",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: false,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "370",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: true,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "3070",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: false,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "3070",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: true,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "200",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: false,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "3070",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: true,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "800",
  },
  {
    name: "Electric bill",
    icon: Electricity,
    payment: false,
    desc: "Alipay gives you 20% offcoupon for all bills, applicable for bills paid through Alipay wallet!",
    amount: "3070",
  },
];
const Notify = () => {
  return (
    <View style={styles.history}>
      {data.map((sec, index) => (
        <View key={index}>
          <View style={styles.transaction}>
            <View style={styles.icon}>
              <sec.icon />
            </View>
            <View style={styles.month}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: COLORS.TextDark,
                  marginVertical: 5,
                }}
              >
                {sec.name}
              </Text>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                }}
              >
                <Text style={styles.time}>{sec.desc}</Text>
              </View>
            </View>

            <Text
              style={{
                color: COLORS.TextGray,
                fontSize: 10,
                marginTop: 30
              }}
            >
              5 Min Ago
            </Text>
          </View>
          <Divider />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  history: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  transaction: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  month: {
    fontWeight: "600",
    fontSize: 16,
    color: COLORS.TextDark,
    marginTop: 20,
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 20,
  },
  time: {
    fontWeight: "400",
    fontSize: 12,
    color: COLORS.TextGray,
  },
  add: {
    fontWeight: "600",
    color: COLORS.Success,
    fontSize: 16,
    lineHeight: 24,
  },
  minus: {
    fontWeight: "600",
    color: COLORS.Error,
    fontSize: 16,
    lineHeight: 24,
  },
  icon: {
    backgroundColor: "#4B28E10D",
    padding: 5,
    borderRadius: 16,
    marginTop: 25,
  },
});

export default Notify;
