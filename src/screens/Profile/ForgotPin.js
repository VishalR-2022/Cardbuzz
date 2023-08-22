import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { BackButton, Button, Divider, TextField } from "../../components";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "react-native-phone-number-input";

const ForgotPin = () => {
  const phoneInput = useRef(null);
  const navigation = useNavigation();
  const [value, setValue] = useState();
  const [valid, setValid] = useState(null);
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    setValid(phoneInput.current?.isValidNumber(value));
  }, [value]);

  function renderTop() {
    return (
      <>
        <BackButton text={"Forgot Pin"} />
      </>
    );
  }

  function renderData() {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Enter Mobile Number</Text>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                ...styles.phoneInputContainer,
                borderColor: COLORS.ButtonBorder,
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
          </View>
        </View>
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
        {renderData()}
      </KeyboardAwareScrollView>
      <View style={{ marginHorizontal: 16, marginBottom: 10 }}>
        <Button
          text="Request OTP"
          disable={!valid}
          onPress={() => navigation.navigate("ForgotPinOTP")}
          width={"100%"}
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
    textAlign: "center",
  },
  desc: {
    fontSize: 12,
    color: COLORS.TextGray,
    lineHeight: 20,
    marginTop: 20,
    fontWeight: "300",
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
});

export default ForgotPin;
