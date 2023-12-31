import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";
import { Button } from "../components";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice";
import { saveToken } from "../helper/keychain";
import AuthService from "../service/AuthService";
import { DEVICE_ID } from "../constants/DeviceInfo";

const OnBoarding = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(null);
  const phoneInput = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setValid(phoneInput.current?.isValidNumber(value));
  }, [value]);

  const handleSubmit = async () => {
    // try {
    //   const registrationData = {
    //     country_code: "+91",
    //     contact_number: formattedValue,
    //     device_id: DEVICE_ID, // Replace with the actual device ID
    //     notification_token: "Notification1234abcd", // Replace with the actual notification token
    //     phone_model: "Galaxy S21", // Replace with the actual phone model
    //     os: "Android",
    //     os_version: "2.0.5", // Replace with the actual OS version
    //   };

    //   const response = await AuthService.register(registrationData);

    //   const token = response.data.token;
    //   await saveToken(token); // Save the token to keychain

    //   setValue("");
    //   setFormattedValue("");
    //   navigation.navigate("VerificationOtpSignUp");
    // } catch (error) {
    //   console.error("Registration failed:", error);
    //   // Handle error here
    // }
    dispatch(login({ mobileNumber: formattedValue }));
    setValue("");
    setFormattedValue("");
    navigation.navigate("VerificationOtpSignUp");
  };

  function renderTop() {
    return (
      <View>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.Primary} />
        <Image
          style={{ width: "100%", marginTop: -90 }}
          source={require("../assets/images/onboarding.png")}
        />
      </View>
    );
  }

  function renderTitle() {
    return (
      <View>
        <Text style={styles.headerTitle}>
          Alipay Management In The Easiest Way
        </Text>
        <Text style={styles.headerPara}>
          Start managing your wallet for a better and more organized future for
          your life
        </Text>
      </View>
    );
  }

  // TODO: Add error tag
  function renderTextInput() {
    const phoneInputBorderColor = COLORS.ButtonBorder;
    //   valid === false ? COLORS.Error : COLORS.ButtonBorder;

    return (
      <View style={{ marginBottom: 20, marginHorizontal: 16 }}>
        <View
          style={{
            ...styles.phoneInputContainer,
            borderColor: phoneInputBorderColor,
          }}
        >
          <PhoneInput
            textInputProps={{ maxLength: 10 }}
            containerStyle={styles.phoneInput}
            textContainerStyle={styles.phoneInputTextContainer}
            ref={phoneInput}
            defaultValue={value}
            defaultCode="IN"
            layout="second"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            placeholder="9999999999"
            disableArrowIcon
          />
          <View style={styles.borderTextContainer}>
            <Text style={styles.borderText}>Enter Mobile Number</Text>
          </View>
        </View>
        {/* {valid === false && (
          <Text style={styles.errorText}>Invalid mobile number</Text>
        )} */}
      </View>
    );
  }

  //   TODO: make this button bigger
  function renderButton() {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <Button
          text="Get Started"
          disable={!valid}
          onPress={handleSubmit}
          width={"100%"}
        />
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={{ marginTop: 40, marginBottom: 20 }}>
        <Text style={styles.footerPara}>
          By creating an account, you're agreeing to our{"\n"}
          <Text style={{ color: COLORS.TextDark }}>Privacy policy </Text>and
          <Text style={{ color: COLORS.TextDark }}> Terms of use.</Text>
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ ...styles.container }}>
      <View style={{ position: "absolute", bottom: 0 }}>
        {renderTop()}
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {renderTitle()}
          {renderTextInput()}
          {renderButton()}
          {renderFooter()}
        </View>
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
  headerTitle: {
    fontSize: 32,
    color: COLORS.TextDark,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  headerPara: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.TextGray,
    textAlign: "center",
  },
  phoneInputContainer: {
    borderRadius: 8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.ButtonBorder,
    marginTop: 47,
    position: "relative",
    minWidth: "100%",
  },
  phoneInput: {
    backgroundColor: "transparent",
  },
  phoneInputTextContainer: {
    borderRadius: 8,
    backgroundColor: "transparent",
    marginLeft: -25,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.Error,
    marginTop: 5,
  },
  borderTextContainer: {
    position: "absolute",
    top: -10,
    left: 12,
    backgroundColor: "white",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  borderText: {
    fontSize: 12,
    color: "gray",
    backgroundColor: "transparent",
  },
  footerPara: {
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.TextGray,
    textAlign: "center",
  },
});

export default OnBoarding;
