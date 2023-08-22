import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { Button, BackButton } from "../../components";
import { useNavigation } from "@react-navigation/native";

const WalletPayment = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState("");

  function handleProceedToPay() {
    // Handle the logic for proceeding to pay
    // For example, you can navigate to the payment screen with the amount
    if (amount !== "") {
      console.log("Proceed to pay with amount:", amount);
    }
  }

  function renderTop() {
    return <BackButton text="Add Money" />;
  }

  function renderCardContent() {
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
      style={{ ...styles.container, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        {renderCardContent()}
      </KeyboardAwareScrollView>
      <View style={{ marginHorizontal: 16, marginBottom: 10 }}>
        <Button
          disable={amount === ""}
          text="Proceed"
          width={"100%"}
          onPress={() => {
            navigation.navigate("PopUpSuccessWalletMoney");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "left",
    color: COLORS.TextDark,
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
  proceedButton: {
    width: 320,
    height: 56,
    padding: 4,
    paddingHorizontal: 20,
    borderRadius: 28,
    gap: 4,
    opacity: 1,
    backgroundColor: "#282B63",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#C9CAD8",
  },
  proceedButtonText: {
    color: "#E7E7E9",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WalletPayment;
