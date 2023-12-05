import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "./../components/Button";
import RoundIconButton from "./../components/RoundIconButton";
import MobileRecharge from "../svg/MobileRechargeSvg";
import { useNavigation } from "@react-navigation/native";
import { AndroidSafeArea, COLORS } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Notification,
  QrView,
  BroadBand,
  Cable,
  Electricity,
  FastTag,
  Fire,
  Insurance,
} from "../svg";
import { Shadow } from "react-native-shadow-2";
import Burger from "./../svg/Burger";
import { getUserProfile } from "../hooks/useAgentApi";
import { setUserDetails } from "../store/slice/userSlice";
import { loadServerPubKey } from "../service/utils";
import { UserInfoConverter } from "../constants/DeviceInfo";

const Home = () => {
  const navigation = useNavigation();
  const image = useSelector((state) => state.auth.imageUrl);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    let data = {};
    const response = await getUserProfile();
    if (response.data) {
      console.log(response.data.kyc_status, 'status');
      data = {
        ...response.data,
      };
      setUserData(UserInfoConverter(data));
      dispatch(setUserDetails(UserInfoConverter(data)));
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const QrViewButton = () => {
    return (
      <View style={styles.viewQrButton}>
        <View
          style={{
            backgroundColor: "#533DEA1A",
            padding: 10,
            borderRadius: 28,
          }}
        >
          <QrView />
        </View>
        <Text>View</Text>
        <View>
          <Image source={require("../assets/images/arrowRight.png")} />
        </View>
      </View>
    );
  };

  function renderTop() {
    return (
      <>
        <Image
          style={{ position: "absolute", top: 0, width: "100%" }}
          source={require("../assets/images/homeBg.png")}
        />
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => navigation.openDrawer()} // Open the side menu
          >
            <Burger />
          </TouchableOpacity>
          <View style={styles.uploadContainer}>
            {image && (
              <Image
                source={{ uri: image.uri }}
                style={{ width: 40, height: 40 }}
              />
            )}
          </View>
          <View
            style={{ marginLeft: 20, flex: 1, justifyContent: "flex-start" }}
          >
            <Text style={styles.userName}>{userData && userData.fullName ? userData.fullName :  "User"}</Text>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
          </View>
          <TouchableOpacity
            style={{ alignItems: "flex-end" }}
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <Notification />
          </TouchableOpacity>
        </View>
      </>
    );
  }

  function renderCardContent() {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Shadow
          distance={0}
          startColor={"#00000010"}
          containerViewStyle={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
          }}
          radius={8}
        >
          <View style={styles.sectionContainer}>
            <View>
              <View style={styles.qrCodeTextContainer}>
                <Text style={styles.qrCodeLabel}>QR Code for</Text>
                <Text style={styles.qrCodeAction}>Cash{"\n"}Withdrawal</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("QrCashWithDrawal")}
              >
                <QrViewButton />
              </TouchableOpacity>
            </View>
            <View style={styles.verticalLine} />
            <View>
              <View style={styles.qrCodeTextContainer}>
                <Text style={styles.qrCodeLabel}>QR Code for</Text>
                <Text style={styles.qrCodeAction}>Goods{"\n"}and Services</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("QrGoodAndService")}
              >
                <QrViewButton />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.walletCard}>
            <Text style={styles.walletTitle}>My Wallet Balance</Text>
            <Text style={styles.walletAmount}>₹4,524.00</Text>
          </View>
        </Shadow>
      </View>
    );
  }

  function renderQuickAction() {
    const buttonsData = [
      {
        label: "Mobile Recharge",
        navigate: "MobileOperator",
        svg: MobileRecharge,
        color: "#283EB41A",
      },
      {
        label: "Broadband/ Landline",
        svg: BroadBand,
        navigate: "BroadBandOperator",
        color: "#0584FF1A",
      },
      {
        label: "Cable/ DTH",
        navigate: "CableDthOperator",
        svg: Cable,
        color: "#0584FF1A",
      },
      {
        label: "Electricity",
        navigate: "ElectricityOperatorType",
        svg: Electricity,
        color: "#F2C31C1A",
      },
      {
        label: "FASTag",
        navigate: "FastTagIssuer",
        svg: FastTag,
        color: "#39A3F81A",
      },
      {
        label: "Gas Bill",
        navigate: "GasOperator",
        svg: Fire,
        color: "#E64C3C1A",
      },
      {
        label: "Insurance",
        navigate: "InsuranceOperator",
        svg: Insurance,
        color: "#39A3F81A",
      },
    ];

    return (
      <Shadow
        distance={0}
        startColor={"#00000010"}
        containerViewStyle={{}}
        radius={8}
      >
        <View style={styles.quickActionCard}>
          <Text style={styles.quickActionTitle}>Quick Action</Text>
          <View style={styles.quickActionButtonsContainer}>
            {buttonsData.map((button) => (
              <View
                key={button.label}
                style={styles.quickActionButtonContainer}
              >
                <RoundIconButton
                  color={button.color}
                  Svg={button.svg}
                  text={button.label}
                  onPress={() => {
                    if (button.navigate) {
                      navigation.navigate(button.navigate);
                    }
                  }}
                />
              </View>
            ))}
          </View>
        </View>
      </Shadow>
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
        {renderCardContent()}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginHorizontal: 16,
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <Button
            text="View Details"
            onPress={() => navigation.navigate("Wallet")}
            outlined
            style={{ paddingHorizontal: 28 }}
          />
          <Button
            text="Add Money"
            onPress={() => navigation.navigate("WalletPayment")}
            style={{ paddingHorizontal: 30 }}
          />
        </View>
        {renderQuickAction()}
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
  uploadContainer: {
    elevation: 2,
    height: 40,
    width: 40,
    backgroundColor: "#efefef",
    borderRadius: 999,
    overflow: "hidden",
  },
  companyNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTextRed: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
  },
  cardTextBlue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  welcomeText: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
    color: "#ffff",
  },
  userName: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    color: "#ffff",
  },
  walletCard: {
    marginHorizontal: 16,
    borderRadius: 16,
  },
  walletTitle: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "center",
    color: COLORS.TextGray,
  },
  walletAmount: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: "center",
    color: COLORS.TextDark,
    marginBottom: 20,
  },
  sectionContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    backgroundColor: COLORS.White,
    padding: 20,
    borderRadius: 16,
    marginVertical: 32,
    elevation: 2,
    shadowColor: "#52006A",
    width: "85%",
  },
  qrCodeLabel: {
    color: COLORS.TextGray,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: "left",
  },
  qrCodeAction: {
    color: COLORS.TextDark,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
  },
  viewQrButton: {
    backgroundColor: "#533DEA1A",
    display: "flex",
    flexDirection: "row",
    width: 116,
    height: 40,
    borderRadius: 18,
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 5,
    marginTop: 8,
  },
  viewQrButtonText: {
    color: "#282B63",
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#E7E7E9",
  },
  quickActionCard: {
    height: "auto",
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F3F3F4",
    backgroundColor: "#FFFFFF",
    marginTop: 32,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#52006A",
  },
  quickActionTitle: {
    color: COLORS.TextDark,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "left",
    margin: 20,
    marginVertical: 20,
  },
  quickActionButtonsContainer: {
    marginHorizontal: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  quickActionButtonContainer: {
    width: "33%",
    marginBottom: 12,
  },
});

export default Home;
