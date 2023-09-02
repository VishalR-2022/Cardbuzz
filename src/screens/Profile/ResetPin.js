import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  TextField,
  Button,
  Divider,
  BackButton,
  BoxTextField,
} from "../../components";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { savePin } from "../../store/slice/authSlice";

const ResetPin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const requiredText = "This field is required*";
  const [pin, setPin] = useState({
    oldPin: "",
    newPin: "",
    confirmPin: "",
  });
  // const [check, setCheck] = useState("");
  // const [disable, setDisable] = useState(false);
  const [error, setError] = useState({
    oldPin: null,
    newPin: null,
    confirmPin: null,
  });
  const password = useSelector((state) => state.auth.pin);

  const handlePinComplete = (code) => {
    setPin((pins) => ({ ...pins, oldPin: code }));
    setError((errors) => ({ ...errors, oldPin: "" }));
  };

  const handleCheckComplete = (code) => {
    setPin((pins) => ({ ...pins, confirmPin: code }));
    setError((errors) => ({ ...errors, confirmPin: "" }));
  };

  const handleNewPinComplete = (code) => {
    setPin((pins) => ({ ...pins, newPin: code }));
    setError((errors) => ({ ...errors, newPin: "" }));
  };
  const onSubmit = () => {
    if (pin.oldPin === "")
      setError((errors) => ({ ...errors, oldPin: requiredText }));
    if (pin.newPin === "")
      setError((errors) => ({ ...errors, newPin: requiredText }));
    if (pin.confirmPin === "")
      setError((errors) => ({ ...errors, confirmPin: requiredText }));
    if (!!pin.oldPin && !!pin.newPin && !!pin.confirmPin) {
      if (pin.oldPin !== password) {
        setError((errors) => ({ ...errors, oldPin: "Old Pins do not match" }));
      } else {
        if (pin.confirmPin !== pin.newPin) {
          setError((errors) => ({ ...errors, confirmPin: "Incorrect Pin" }));
        } else {
          dispatch(savePin({ pin: pin.newPin }));
          navigation.navigate("ResetPinSuccess");
        }
      }
    }
  };

  function renderTop() {
    return <BackButton text="Reset Pin" />;
  }

  function renderContent() {
    return (
      <View style={{ marginHorizontal: 16, marginVertical: 40 }}>
        <View style={{ marginBottom: 10 }}>
          <Text style={styles.contentPara}>Enter Old Pin</Text>
          <View>
            <BoxTextField
              pin={pin.oldPin}
              setPin={(old) => setPin({ ...pin, oldPin: old })}
              length={4}
              onComplete={handlePinComplete}
              error={error.oldPin}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPin")}>
            <Text style={styles.resend}>Forgot Pin</Text>
          </TouchableOpacity>
        </View>
        <Divider />
        <Text style={styles.contentPara}>Enter New Pin</Text>
        <BoxTextField
          pin={pin.newPin}
          setPin={(code) => setPin({ ...pin, newPin: code })}
          length={4}
          onComplete={handleNewPinComplete}
          justifyContent="center"
          error={error.newPin}
        />
        <View style={{ marginTop: 20 }}>
          <Text style={styles.contentPara}>Re-enter New PIN</Text>
          <BoxTextField
            pin={pin.confirmPin}
            setPin={(code) => setPin({ ...pin, confirmPin: code })}
            length={4}
            onComplete={handleCheckComplete}
            justifyContent="center"
            error={error.confirmPin}
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
        {renderContent()}
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Update" onPress={onSubmit} width={"100%"} />
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
    display: "flex",
  },
  contentTitle: {
    fontSize: 32,
    color: COLORS.TextDark,
    fontWeight: "700",
    marginBottom: 32,
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 20,
    justifyContent: "flex-end",
    marginHorizontal: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  resend: {
    fontSize: 14,
    marginTop: 10,
    color: COLORS.Primary,
    fontWeight: "700",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  contentPara: {
    fontSize: 12,
    color: COLORS.TextGray,
    marginHorizontal: 8,
    fontWeight: "500",
    marginTop: 15,
    textAlign: "center",
    marginBottom: 8,
  },
});

export default ResetPin;
