import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { Shadow } from "react-native-shadow-2";
import { BackButton, Divider, Notify } from "../../components";

const Notification = () => {
  function renderTop() {
    return (
      <>
        <BackButton text="Notification" />
        <Divider />
      </>
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
        <Notify />
      </KeyboardAwareScrollView>
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
  walletAmount: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "left",
    color: COLORS.TextDark,
    marginTop: 20,
  },
});

export default Notification;
