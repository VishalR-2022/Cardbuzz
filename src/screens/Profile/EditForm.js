import React, { useState, useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField, Button, Divider, BackButton } from "../../components";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { setUserDetails } from "../../store/slice/userSlice";
import { putUserProfile } from "../../hooks/useAgentApi";

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

  const onSubmit = async (bankDetails) => {
    if (bankDetails.accountNumber === bankDetails.accountNumberCheck) {
      console.log(bankDetails, '>>>>>>>>>>>>>>>>>>>>> data');
      const payload = {
        agent_auth_id: data.agent_auth_id,
        bank_acc_ifsc: bankDetails.ifscCode,
        bank_acc_number: bankDetails.accountNumber,
      }
      const response = await putUserProfile(payload);
      if(response) {
        dispatch(setUserDetails({ ...data, ...bankDetails }));
        // navigation.navigate("EditFormOtpVerification");
      }
    }
  };

  const setInitialValues = () => {
    setValue("fullName", data.fullName);
    setValue("pinCode", data.pinCode);
    setValue("address1", data.address1);
    setValue("bankName", data.bankName);
    setValue("accountNumber", data.accountNumber);
    setValue("accountNumberCheck", data.accountNumber);
    setValue("ifscCode", data.ifscCode);
  };

  useEffect(() => {
    setInitialValues();
  }, []);

  function renderTop() {
    return <BackButton text="My Profile" />;
  }

  function renderContent() {
    return (
      <View style={{ marginHorizontal: 16, marginVertical: 40 }}>
        <Controller
          control={control}
          name="fullName"
          defaultValue=""
          nullable
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Full Name"
              editable={false}
              selectTextOnFocus={false}
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
          nullable
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Pin Code"
              keyboardType="numeric"
              editable={false}
              selectTextOnFocus={false}
            />
          )}
        />
        {errors.pinCode && (
          <Text style={styles.errorText}>{errors.pinCode.message}</Text>
        )}
        <View style={{ marginBottom: 16 }}>
          <Controller
            control={control}
            name="address1"
            defaultValue=""
            nullable
            render={({ field }) => (
              <TextField
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Address"
                editable={false}
                selectTextOnFocus={false}
              />
            )}
          />
          {errors.address1 && (
            <Text style={styles.errorText}>{errors.address1.message}</Text>
          )}
        </View>
        <Divider color="#DDDDDD" />
        <Text
          style={{
            marginTop: 18,
            marginBottom: 4,
            fontWeight: "700",
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          Bank Details
        </Text>
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
          rules={{
            required: "Account Number is required",
            minLength: {
              value: 12,
              message: "Account Number must be 12 digits",
            },
            maxLength: {
              value: 12,
              message: "Account Number must be 12 digits",
            },
          }}
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
            required: "Account Number is required",
            minLength: {
              value: 12,
              message: "Account Number must be 12 digits",
            },
            maxLength: {
              value: 12,
              message: "Account Number must be 12 digits",
            },
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
          rules={{
            required: "IFSC Code is required",
            pattern: {
              value: /^[A-Za-z]{4}\d{7}$/,
              message: "Invalid IFSC Code",
            },
          }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="IFSC Code"
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
          <Button
            text="Update Bank Details"
            onPress={handleSubmit(onSubmit)}
            width={"100%"}
          />
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
