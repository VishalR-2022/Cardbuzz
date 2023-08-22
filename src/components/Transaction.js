import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";
import { DataTable } from "react-native-paper";

const data = [
  {
    month: "12 Aug",
    payment: [
      {
        name: "Cash Wlthdrawl",
        time: "10.27",
        payment: false,
        amount: "370",
      },
      {
        name: "Electricity bill pay",
        time: "10.27",
        payment: true,
        amount: "3070",
      },
      {
        name: "Cash Wlthdrawl",
        time: "10.27",
        payment: false,
        amount: "3070",
      },
      {
        name: "Electricity bill pay",
        time: "10.27",
        payment: true,
        amount: "200",
      },
      {
        name: "Cash Wlthdrawl",
        time: "10.27",
        payment: false,
        amount: "3070",
      },
      {
        name: "Cash Wlthdrawl",
        time: "10.27",
        payment: true,
        amount: "800",
      },
      {
        name: "Cash Wlthdrawl",
        time: "10.27",
        payment: false,
        amount: "3070",
      },
    ],
  },
  {
    month: "11 Aug",
    payment: [
      {
        name: "Cash Wlthdrawl",
        time: "10.27",
        payment: false,
        amount: "370",
      },
      {
        name: "Electric bill",
        time: "10.27",
        payment: true,
        amount: "3070",
      },
      {
        name: "Electric bill",
        time: "10.27",
        payment: false,
        amount: "3070",
      },
      {
        name: "Electric bill",
        time: "10.27",
        payment: true,
        amount: "200",
      },
      {
        name: "Electric bill",
        time: "10.27",
        payment: false,
        amount: "3070",
      },
      {
        name: "Electric bill",
        time: "10.27",
        payment: true,
        amount: "800",
      },
      {
        name: "Electric bill",
        time: "10.27",
        payment: false,
        amount: "3070",
      },
    ],
  },
];
const Transactions = ({ earnings = false }) => {
  return (
    <DataTable style={styles.history}>
      <DataTable.Header style={styles.columns}>
        <DataTable.Cell
          style={{ ...styles.column, justifyContent: "flex-start", flex: 1.5 }} // Adjust the flex value
        >
          Time
        </DataTable.Cell>
        <DataTable.Cell
          style={{ ...styles.column, justifyContent: "flex-start", flex: 3 }} // Adjust the flex value
        >
          Transaction
        </DataTable.Cell>
        <DataTable.Cell
          style={{
            ...styles.column,
            justifyContent: "flex-end",
            flex: earnings ? 1.5 : 1,
          }} // Adjust the flex value
        >
          Amount
        </DataTable.Cell>
        {earnings && (
          <DataTable.Cell
            style={{ ...styles.column, justifyContent: "flex-end", flex: 1.5 }} // Adjust the flex value
          >
            Earning
          </DataTable.Cell>
        )}
      </DataTable.Header>

      {data.map((item, index) => (
        <View style={styles.dataRow} key={index}>
          <Text style={styles.month} key={index}>
            {item.month}
          </Text>
          {item.payment.map((sec, i) => (
            <DataTable.Row key={i} style={styles.dataRow}>
              <DataTable.Cell
                textStyle={{ ...styles.time }}
                style={{ flex: 1.5 }}
              >
                {sec.time}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={{ ...styles.time }}
                style={{ flex: 3 }}
              >
                {sec.name}
              </DataTable.Cell>
              <DataTable.Cell
                textStyle={sec.payment ? styles.add : styles.minus}
                style={{ justifyContent: "flex-end", flex: earnings ? 1.5 : 1 }}
              >
                ₹{sec.amount}
              </DataTable.Cell>
              {earnings && (
                <DataTable.Cell
                  style={{ justifyContent: "flex-end", flex: 1.5 }}
                  textStyle={styles.earnings}
                >
                  {sec.payment ? "-" : "+50"}
                </DataTable.Cell>
              )}
            </DataTable.Row>
          ))}
        </View>
      ))}
    </DataTable>
  );
};

const styles = StyleSheet.create({
  history: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  transaction: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  columns: {
    paddingBottom: 20,
    paddingHorizontal: 0,
  },
  column: {
    fontWeight: "400",
    fontSize: 14,
    color: COLORS.TextDark,
    marginTop: 20,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  month: {
    fontWeight: "500",
    fontSize: 16,
    color: "#C5C5C5",
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  time: {
    fontWeight: "500",
    fontSize: 14,
    color: COLORS.TextDark,
    lineHeight: 22,
  },
  add: {
    fontWeight: "700",
    color: COLORS.Success,
    fontSize: 14,
    lineHeight: 22,
  },
  minus: {
    fontWeight: "700",
    color: COLORS.TextDark,
    fontSize: 14,
    lineHeight: 22,
  },
  dataRow: { borderBottomWidth: 0, paddingHorizontal: 0 },
  earnings: {
    color: COLORS.Success,
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Transactions;
