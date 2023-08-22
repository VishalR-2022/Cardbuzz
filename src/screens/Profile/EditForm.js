import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField, Button, Divider, BackButton } from "../../components";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { setUserDetails } from "../../store/slice/userSlice";

const EditProfile = () => {
  const navigation = useNavigation();
  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    if (data.accountNumber === data.accountNumberCheck) {
      dispatch(setUserDetails(data));
      navigation.navigate("EditFormSuccess", { selectedTab: "Profile" });
    }
  };

  const setInitialValues = () => {
    setValue("fullName", data.fullName);
    setValue("pinCode", data.pinCode);
    setValue("address", data.address);
    setValue("bankName", data.bankName);
    setValue("accountNumber", data.accountNumber);
    setValue("accountNumberCheck", data.accountNumber);
    setValue("ifscCode", data.ifscCode);
  };

  useEffect(() => {
    setInitialValues();
  }, []);

  function renderTop() {
    return <BackButton text="Edit Profile" />;
  }

  function renderContent() {
    return (
      <View style={{ marginHorizontal: 16, marginVertical: 40 }}>
        <Controller
          control={control}
          name="fullName"
          defaultValue=""
          rules={{ required: "Full Name is required" }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Full Name"
            />
          )}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.fullName.message}</Text>
        )}
        <Controller
          control={control}
          name="pinCode"
          defaultValue=""
          rules={{ required: "Pin Code is required" }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Pin Code"
              keyboardType="numeric"
            />
          )}
        />
        {errors.pinCode && (
          <Text style={styles.errorText}>{errors.pinCode.message}</Text>
        )}
        <Controller
          control={control}
          name="address"
          defaultValue=""
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Address"
            />
          )}
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address.message}</Text>
        )}
        <Divider />
        <Controller
          control={control}
          name="bankName"
          defaultValue=""
          rules={{ required: "Bank details are required" }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Bank Name"
            />
          )}
        />
        {errors.bankName && (
          <Text style={styles.errorText}>{errors.bankName.message}</Text>
        )}
        <Controller
          control={control}
          name="accountNumber"
          defaultValue=""
          rules={{ required: "Account number is required" }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Account Number"
              keyboardType="numeric"
            />
          )}
        />
        {errors.accountNumber && (
          <Text style={styles.errorText}>{errors.accountNumber.message}</Text>
        )}
        <Controller
          control={control}
          name="accountNumberCheck"
          defaultValue=""
          rules={{
            required: "Account number is required",
            validate: (value) =>
              value === "" || value === getValues("accountNumber")
                ? true
                : "Account numbers do not match",
          }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Verify Account Number"
              keyboardType="numeric"
            />
          )}
        />
        {errors.accountNumberCheck && (
          <Text style={styles.errorText}>
            {errors.accountNumberCheck.message}
          </Text>
        )}
        <Controller
          control={control}
          name="ifscCode"
          defaultValue=""
          rules={{ required: "IFSC code is required" }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="IFSC code"
            />
          )}
        />
        {errors.ifscCode && (
          <Text style={styles.errorText}>{errors.ifscCode.message}</Text>
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
        <View style={styles.buttonContainer}>
          <Button text="Save" onPress={handleSubmit(onSubmit)} width={"100%"} />
        </View>
      </KeyboardAwareScrollView>
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
    marginBottom: 2,
    fontSize: 10,
  },
});

export default EditProfile;
