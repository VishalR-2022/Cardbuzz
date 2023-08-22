import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { Wallet as WalletIcon } from "../../svg";
import { Shadow } from "react-native-shadow-2";
import { BackButton, Button, Transactions } from "../../components";
import { useNavigation } from "@react-navigation/native";

const Wallet = () => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  function renderTop() {
    return (
      <>
        <Image
          style={{
            position: "absolute",
            top: 0,
            width: width,
          }}
          source={require("../../assets/images/homeBg.png")}
        />
        <BackButton text="My Wallet" color={COLORS.White} />
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
        <Shadow
          distance={0}
          startColor={"#00000010"}
          containerViewStyle={{}}
          radius={8}
        >
          <View style={styles.walletCard}>
            <View style={styles.walletContainer}>
              <WalletIcon />
              <View>
                <Text style={styles.walletText}>Wallet Balance</Text>
                <Text style={styles.walletAmount}>₹12000.00</Text>
              </View>
            </View>
            <Button
              text={"Add Money"}
              onPress={() => navigation.navigate("WalletPayment")}
            />
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
        <Transactions />
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
    marginHorizontal: 16,
    backgroundColor: COLORS.White,
    padding: 20,
    borderRadius: 16,
    marginTop: 32,
    display: "flex",
    elevation: 2,
    shadowColor: "#52006A",
  },
  walletContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  walletAmount: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "left",
    color: COLORS.TextDark,
  },
  walletText: {
    fontSize: 14,
    fontWeight: "300",
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: "left",
    color: COLORS.TextDark,
  },
});

export default Wallet;