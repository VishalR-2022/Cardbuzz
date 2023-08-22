import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { BackButton, Button, TextField, Divider } from "../../components";
import { useNavigation } from "@react-navigation/native";

const DthRechargePayment = () => {
  const [amount, setAmount] = useState("");
  const navigation = useNavigation();

  function renderTop() {
    return (
      <>
        <BackButton text={"Add Money"} />
        <Divider />
      </>
    );
  }

  function renderData() {
    return (
      <View style={styles.cardContent}>
        <Text style={styles.headerText}>Enter Amount</Text>
        <TextInput
          style={styles.amountInput}
          keyboardType="numeric"
          placeholder="₹0000"
          placeholderTextColor="#E7E7E9"
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        ...AndroidSafeArea.AndroidSafeArea,
      }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        {renderData()}
      </KeyboardAwareScrollView>
      <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
        <Button
          text={"Proceed to Pay"}
          width={"100%"}
          onPress={() => {
            navigation.navigate("PaymentOptions");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: COLORS.White,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  dataContainer: {
    marginHorizontal: 16,
  },
  operatorItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: COLORS.White,
    borderRadius: 8,
    marginTop: 10,
  },
  operatorIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  operatorName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TextGray,
  },
  navigationName: {
    fontSize: 12,
    color: COLORS.TextGray,
    fontWeight: "400",
  },
  inputContainer: {
    marginTop: 40,
  },
  inputText: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
    color: COLORS.TextDark,
  },
  desc: {
    fontSize: 12,
    color: COLORS.TextGray,
    lineHeight: 20,
    marginTop: 20,
    fontWeight: "300",
  },
  cardContent: {
    backgroundColor: "transparent",
    marginVertical: 80,
    alignItems: "center",
  },
  amountInput: {
    color: "#000",
    fontSize: 52,
    fontWeight: "700",
    lineHeight: 64,
    letterSpacing: 0,
    textAlign: "center",
    padding: 10,
    borderRadius: 8,
  },
  customerInfo: {
    marginVertical: 20,
    fontWeight: "700",
    fontSize: 18,
  },
  customerInfoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  customerInfoContainerKey: {
    fontWeight: "500",
    fontSize: 14,
    color: COLORS.TextGray,
  },
  customerInfoContainerValue: {
    fontWeight: "500",
    fontSize: 14,
    color: COLORS.TextDark,
  },
});

export default DthRechargePayment;
