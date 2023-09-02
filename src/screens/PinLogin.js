import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton, BoxTextField, Button } from "../components";
import { AndroidSafeArea, COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const PinLogin = () => {
  const navigation = useNavigation();
  const password = useSelector((state) => state.auth.pin);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handlePinComplete = (code) => {
    setPin(code);
  };

  const handleCreatePin = () => {
    if (pin !== null) {
      if (pin === password) {
        navigation.navigate("AddDetails");
        setPin("");
        setError(null);
      } else {
        setError(true);
      }
    }
  };

  function renderContent() {
    return (
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.contentTitle}>Enter 4 digit PIN</Text>
        <View style={{ marginBottom: 16 }}>
          <View>
            <BoxTextField
              pin={pin}
              setPin={setPin}
              length={4}
              onComplete={handlePinComplete}
              error={error}
            />
          </View>
          {error && (
            <Text style={{ ...styles.contentPara, color: COLORS.Error }}>
              Pin is not matching
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPin")}>
          <Text style={styles.resend}>Forgot Pin</Text>
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
        <BackButton />
        {renderContent()}
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Continue" onPress={handleCreatePin} width={"100%"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#ffff",
  },
  contentTitle: {
    fontSize: 32,
    color: COLORS.TextDark,
    fontWeight: "700",
    marginVertical: 32,
    marginTop: 50,
    alignItems: "center",
  },
  contentPara: {
    fontSize: 12,
    color: COLORS.TextGray,
    marginHorizontal: 8,
    fontWeight: "500",
    marginTop: 15,
    textAlign: "left",
    marginBottom: 8,
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 20,
    marginHorizontal: 16,
  },
  resend: {
    fontSize: 14,
    color: COLORS.Primary,
    fontWeight: "700",
    textAlign: "right",
    textDecorationLine: "underline",
  },
});

export default PinLogin;
