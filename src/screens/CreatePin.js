import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton, BoxTextField, Button } from "../components";
import { AndroidSafeArea, COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { savePin } from "../store/slice/authSlice";

const CreatePin = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [reset, setReset] = useState(false);
  const [pin, setPin] = useState("");
  const [check, setCheck] = useState("");
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (route.params && route.params.reset) {
      setReset(route.params.reset);
    }
  }, [route.params]);

  const handlePinComplete = (code) => {
    setPin(code);
    setDisable(true);
  };

  const handleCheckComplete = (code) => {
    setCheck(code);
  };

  const handleCreatePin = () => {
    if (pin !== null) {
      if (pin === check) {
        dispatch(savePin({ pin: pin }));
        setPin("");
        setCheck("");
        setDisable(false);
        setError(null);
        navigation.navigate("PinSuccess", {
          reset: reset,
        });
      } else {
        setError(true);
      }
    }
  };

  function renderContent() {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <Text style={styles.contentTitle}>
          {!reset ? "Create PIN" : "Reset PIN"}
        </Text>
        <View style={{ marginBottom: 32 }}>
          <Text style={styles.contentPara}>Enter 4 digit Pin</Text>
          <View>
            <BoxTextField
              pin={pin}
              setPin={setPin}
              length={4}
              onComplete={handlePinComplete}
              justifyContent="center"
            />
          </View>
        </View>
        <View style={{ marginBottom: 32 }}>
          <Text style={styles.contentPara}>Re-enter 4 digit PIN</Text>
          <View>
            <BoxTextField
              pin={check}
              setPin={setCheck}
              length={4}
              onComplete={handleCheckComplete}
              justifyContent="center"
              disable={disable}
              error={error}
            />
          </View>
          {error && (
            <Text style={{ ...styles.contentPara, color: COLORS.Error }}>
              Pin is not matching
            </Text>
          )}
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
        {reset && <BackButton text={"Reset Pin"} />}
        {renderContent()}
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text={reset ? "Update" : "Create"}
          onPress={handleCreatePin}
          width={"100%"}
        />
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
    textAlign: "center",
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
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 20,
    marginHorizontal: 16,
  },
});

export default CreatePin;
