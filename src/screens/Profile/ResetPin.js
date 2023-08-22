import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField, Button, Divider, BackButton } from "../../components";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { savePin } from "../../store/slice/authSlice";

const ResetPin = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const password = useSelector((state) => state.auth.pin);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    if (data.oldPin === password && data.newPin === data.reenterNewPin) {
      dispatch(savePin({ pin: data.newPin }));
      navigation.navigate("ResetPinSuccess");
    }
  };

  function renderTop() {
    return <BackButton text="Reset Pin" />;
  }

  function renderContent() {
    return (
      <View style={{ marginHorizontal: 16, marginVertical: 40 }}>
        <Controller
          control={control}
          name="oldPin"
          rules={{
            required: "Old Pin is required",
            minLength: {
              value: 4,
              message: "PIN must be 4 digits",
            },
            maxLength: {
              value: 4,
              message: "PIN must be 4 digits",
            },
            validate: (value) =>
              value === "" || value === password
                ? true
                : "Old Pins do not match",
          }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter Old Pin"
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              defaultValue={"0000"}
            />
          )}
        />
        {errors.oldPin && (
          <Text style={styles.errorText}>{errors.oldPin.message}</Text>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPin")}>
          <Text style={styles.resend}>Forgot Pin</Text>
        </TouchableOpacity>
        <Divider />
        <Controller
          control={control}
          name="newPin"
          rules={{
            required: "New Pin is required",
            minLength: {
              value: 4,
              message: "PIN must be 4 digits",
            },
            maxLength: {
              value: 4,
              message: "PIN must be 4 digits",
            },
          }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter New Pin"
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              defaultValue={"0000"}
            />
          )}
        />
        {errors.newPin && (
          <Text style={styles.errorText}>{errors.newPin.message}</Text>
        )}
        <Controller
          control={control}
          name="reenterNewPin"
          rules={{
            required: "Re-Enter New Pin is required",
            minLength: {
              value: 4,
              message: "PIN must be 4 digits",
            },
            maxLength: {
              value: 4,
              message: "PIN must be 4 digits",
            },
            validate: (value) =>
              value === "" || value === getValues("newPin")
                ? true
                : "New Pins do not match",
          }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Re-Enter New Pin"
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              defaultValue={"0000"}
            />
          )}
        />
        {errors.reenterNewPin && (
          <Text style={styles.errorText}>{errors.reenterNewPin.message}</Text>
        )}
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
        <Button text="Update" onPress={handleSubmit(onSubmit)} width={"100%"} />
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
    marginTop: 50,
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
    color: COLORS.Primary,
    fontWeight: "700",
    textAlign: "right",
    textDecorationLine: "underline",
  },
});

export default ResetPin;
