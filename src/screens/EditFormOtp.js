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

const EditFormOtpVerification = () => {
  const OTP = "000000"; // Replace with actual OTP
  const navigation = useNavigation();
  const [login, setLogin] = useState(false);
  const [pin, setPin] = useState("");

  const handleOTPComplete = (otp) => {
    console.log("Entered OTP:", otp);
    if (otp === OTP) {
      console.log("OTP is valid!");
      setLogin(true);
      // Implement OTP validation logic here
    } else {
      console.log("Invalid OTP!");
      // Handle invalid OTP
    }
  };

  const handleLogIn = () => {
    if (login) {
      setLogin(false);
      navigation.navigate("EditFormSuccess");
    }
    console.log("Invalid OTP!");
  };

  function renderTop() {
    return <BackButton text="Verification OTP" />;
  }

  function renderContent() {
    return (
      <View>
        <Text style={styles.contentTitle}>Verify To Add</Text>
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
        <TouchableOpacity>
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
        <Button text="Login" onPress={handleLogIn} width={"100%"} />
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

export default EditFormOtpVerification;
