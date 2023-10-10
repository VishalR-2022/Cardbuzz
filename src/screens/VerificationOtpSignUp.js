import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BoxTextField, Button } from "../components";
import { AndroidSafeArea, COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { useSelector } from "react-redux";
import { resendOTP, verifySignupOTP } from "../service/request/create_user";

const VerificationOtpSignUp = () => {
  const OTP = "117123"; // Replace with actual OTP
  const navigation = useNavigation();
  const phoneNumber = useSelector(state => state.auth.mobileNumber)
  const accessToken = useSelector(state => state.auth.accessToken)
  const [login, setLogin] = useState(false);
  const [pin, setPin] = useState("");

  const handleOTPComplete = async (otp) => {
    const userData = {
      country_code: "91",
      phone: phoneNumber,
    };
    const response = await verifySignupOTP(userData, accessToken, OTP )
    console.log("Entered OTP:", response );
    // if (otp === OTP) {
    //   console.log("OTP is valid!");
    //   setLogin(true);
    //   // Implement OTP validation logic here
    // } else {
    //   console.log("Invalid OTP!");
    //   // Handle invalid OTP
    // }
  };

  const handleLogIn = () => {
    if (login) {
      setLogin(false);
      navigation.navigate("VerificationRegister");
    }
    console.log("Invalid OTP!");
  };

  const handleResendOTP = async() => {
    const userData = {
      country_code: "91",
      phone: phoneNumber,
    };
    await resendOTP(userData, accessToken)
  }

  function renderTop() {
    return <BackButton text="Verification OTP" />;
  }

  function renderContent() {
    return (
      <View>
        <Text style={styles.contentTitle}>Sign In</Text>
        <View>
          <BoxTextField
            pin={pin}
            setPin={setPin}
            length={6}
            onComplete={handleOTPComplete}
          />
        </View>
        <Text style={styles.contentPara}>
          A code has been sent to your phone
        </Text>
        <TouchableOpacity onPress={() => handleResendOTP()}>
          <Text style={styles.resend}>Resend in 00:57</Text>
        </TouchableOpacity>
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
        {renderContent()}
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Login" onPress={handleLogIn} width={"100%"} disable={!login} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    paddingVertical: 0,
    backgroundColor: "#ffff",
  },
  contentTitle: {
    fontSize: 32,
    color: COLORS.TextDark,
    marginHorizontal: 20,
    fontWeight: "700",
    marginVertical: 40,
    textAlign: "center",
  },
  contentPara: {
    fontSize: 14,
    color: COLORS.TextGray,
    marginHorizontal: 20,
    fontWeight: "400",
    marginTop: 15,
    textAlign: "center",
  },
  resend: {
    fontSize: 14,
    color: COLORS.Primary,
    marginHorizontal: 20,
    fontWeight: "700",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 5,
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 20,
    marginHorizontal: 16,
  },
});

export default VerificationOtpSignUp;
