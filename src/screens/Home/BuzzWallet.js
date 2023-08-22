import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { Wallet as WalletIcon } from "../../svg";
import { Shadow } from "react-native-shadow-2";
import { BackButton, Button, Divider, Transactions } from "../../components";

const BuzzWallet = () => {
  function renderTop() {
    return (
      <>
        <BackButton text="Buzz Wallet" />
        <Divider />
      </>
    );
  }

  function renderCardContent() {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Shadow distance={0} startColor={"#18191B01"} radius={8}>
          <View style={styles.walletCard}>
            <WalletIcon />
            <Text style={styles.walletTitle}>Buzz Wallet balance</Text>
            <Text style={styles.walletAmount}>₹4,524.00</Text>
            <Text style={styles.walletPara}>Amount to pay will be ₹400</Text>
          </View>
        </Shadow>
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
          paddingHorizontal: 5,
          paddingBottom: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        {renderCardContent()}
      </KeyboardAwareScrollView>
      <View style={{ marginHorizontal: 16, gap: 8 , marginBottom: 16}}>
        <Button
          outlined
          text="Proceed without using"
          onPress={() => {}}
          width={"100%"}
        />
        <Button
          text="Use balance and proceed"
          onPress={() => {}}
          width={"100%"}
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
  walletCard: {
    width: 300,
    marginHorizontal: 16,
    backgroundColor: COLORS.White,
    padding: 20,
    borderRadius: 16,
    marginVertical: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#52006A",
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
    color: COLORS.TextGray,
    marginTop: 20,
  },
  walletAmount: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
    color: COLORS.TextDark,
    marginTop: 8,
    marginBottom: 20,
  },
  walletPara: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "left",
    color: COLORS.TextGray,
  },
});

export default BuzzWallet;
