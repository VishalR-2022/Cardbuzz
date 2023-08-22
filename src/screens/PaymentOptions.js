import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton, Button, Divider, Transactions } from "../components";
import { AndroidSafeArea, COLORS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { AddIcon, Arrow, Bank, Gpay, Paytm, Wallet, WalletMoney } from "../svg";
import { CheckBox } from "react-native-elements";

const PaymentOptions = () => {
  const navigation = useNavigation();
  const [isSelectedWallet, setSelectionWallet] = useState(null);
  const [isWallet, setIsWallet] = useState(false);
  const [selectedUpi, setSelectedUpi] = useState(null);

  function renderTop() {
    return <BackButton text={"Select Payment Method"} />;
  }

  function renderContent() {
    return (
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: "",
          marginVertical: 20,
          borderRadius: 8,
        }}
      >
        <View style={styles.searchBar}>
          <View>
            <Wallet strokeColor={true} />
          </View>
          <View style={styles.walletContainer}>
            <Text style={styles.contentTitle}>Buzz Wallet</Text>
            <Text style={styles.walletAmount}>Balance: ₹2000</Text>
          </View>
          <CheckBox
            checked={isWallet}
            onPress={() => setIsWallet(!isWallet)}
            checkedColor={COLORS.Primary}
          />
        </View>
      </View>
    );
  }

  function renderUpiPayment() {
    const upiOptions = [
      { id: "gpay", label: "Gpay", icon: <Gpay /> },
      { id: "paytm", label: "Paytm", icon: <Paytm /> },
      // Add more UPI options if needed
    ];

    const morePaymentOptions = [
      { id: "wallet", label: "Pay via wallet", icon: <WalletMoney /> },
      { id: "netBanking", label: "Pay via wallet", icon: <Bank /> },
      // Add more UPI options if needed
    ];
    return (
      <View style={{ marginHorizontal: 16 }}>
        <Text style={{ fontWeight: "600", fontSize: 14 }}>UPI</Text>
        {upiOptions.map((option) => (
          <View
            key={option.id}
            style={{
              marginVertical: 8,
              borderRadius: 8,
            }}
          >
            <View style={styles.searchBar}>
              <View>{option.icon}</View>
              <View style={styles.walletContainer}>
                <Text style={styles.contentTitle}>{option.label}</Text>
              </View>
              <CheckBox
                checked={selectedUpi === option.id}
                onPress={() => setSelectedUpi(option.id)}
                checkedColor={COLORS.Primary}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
              />
            </View>
          </View>
        ))}
        <View
          style={{
            marginVertical: 8,
            borderRadius: 8,
          }}
        >
          <TouchableOpacity
            style={{ ...styles.searchBar, paddingVertical: 10 }}
            onPress={() => navigation.navigate("AddUpiId")}
          >
            <View>
              <AddIcon />
            </View>
            <View style={styles.walletContainer}>
              <Text style={styles.contentTitle}>Add New UPI ID</Text>
            </View>
            <View style={{ paddingRight: 25 }}>
              <Image source={require("../assets/images/arrowRight.png")} />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: "600", fontSize: 14, marginTop: 12 }}>
          Credit & Debit Cards
        </Text>
        <View
          style={{
            marginVertical: 8,
            borderRadius: 8,
          }}
        >
          <View style={{ ...styles.searchBar, paddingVertical: 10 }}>
            <View>
              <AddIcon />
            </View>
            <View style={styles.walletContainer}>
              <Text style={styles.contentTitle}>
                Pay by credit / Debit card
              </Text>
            </View>
            <View style={{ paddingRight: 25 }}>
              <Image source={require("../assets/images/arrowRight.png")} />
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerText}>Payable amount</Text>
          <Text style={styles.footerAmount}>₹500</Text>
        </View>
        <View>
          <Button
            text={"Next"}
            style={{ paddingHorizontal: 60 }}
            onPress={() => navigation.navigate("PopUpSuccessWalletMoney")}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ ...styles.container, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        <Divider />
        {renderContent()}
        {renderUpiPayment()}
        <Divider />
        {renderFooter()}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    paddingVertical: 0,
    backgroundColor: "#ffff",
    display: "flex",
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 20,
    backgroundColor: COLORS.White,
    borderColor: COLORS.ButtonBorder,
    borderWidth: 1,
    borderRadius: 8,
  },
  walletAmount: {
    fontSize: 10,
    color: COLORS.TextGray,
    fontWeight: "400",
  },
  walletContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  contentTitle: {
    fontSize: 14,
    color: COLORS.TextDark,
    fontWeight: "600",
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 8,
    justifyContent: "space-between",
  },
  footerText: {
    color: COLORS.TextGray,
    fontSize: 12,
    fontWeight: "300",
  },
  footerAmount: {
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.TextDark,
  },
});

export default PaymentOptions;
