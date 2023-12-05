import React from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField, Button, Divider } from "../components";
import { COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/slice/userSlice";

const AddDetails = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.accountNumber === data.accountNumberCheck) {
      dispatch(setUserDetails(data));
      navigation.navigate("UploadPicture");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        <BackButton />
        <View style={styles.formContainer}>
          <Text style={styles.contentTitle}>Add Details</Text>
          <View>
            <Controller
              control={control}
              name="fullName"
              defaultValue=""
              rules={{ required: "Full Name is required" }}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Name as per Bank Account"
                />
              )}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName.message}</Text>
            )}
            <Controller
              control={control}
              name="state"
              defaultValue=""
              nullable
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="State"
                />
              )}
            />
            <Controller
              control={control}
              name="pinCode"
              defaultValue=""
              rules={{
                required: "Pin Code is required",
                minLength: {
                  value: 6,
                  message: "Pin Code must be 6 digits",
                },
                maxLength: {
                  value: 6,
                  message: "Pin Code must be 6 digits",
                },
              }}
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
              name="address1"
              defaultValue=""
              nullable
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="City"
                />
              )}
            />
            <Controller
              control={control}
              name="address2"
              defaultValue=""
              nullable
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Address"
                />
              )}
            />
            <View style={{ marginTop: 12 }}>
              <Divider />
            </View>
            <Controller
              control={control}
              name="accountNumber"
              defaultValue=""
              rules={{
                required: "Account Number is required",
                pattern: {
                  value: /^[0-9]{9,18}$/,
                  message:
                    "Account Number must be between 9 and 18 digits and contain only numeric characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  maxLength={18}
                  minLength={9}
                  placeholder="Account Number"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.accountNumber && (
              <Text style={styles.errorText}>
                {errors.accountNumber.message}
              </Text>
            )}
            <Controller
              control={control}
              name="accountNumberCheck"
              defaultValue=""
              rules={{
                required: "Account Number is required",
                pattern: {
                  value: /^[0-9]{9,18}$/,
                  message:
                    "Account Number must be between 9 and 18 digits and contain only numeric characters",
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
                  maxLength={18}
                  minLength={9}
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
                maxLength: 11, // Limit input length to 11 characters
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
                  autoCapitalize='characters'
                  maxLength={11}
                />
              )}
            />
            {errors.ifscCode && (
              <Text style={styles.errorText}>{errors.ifscCode.message}</Text>
            )}
          </View>
          <View style={{ marginTop: 30 }}>
            <Button
              text="Next"
              onPress={handleSubmit(onSubmit)}
              width={"100%"}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.White,
  },
  formContainer: {
    marginHorizontal: 16,
  },
  contentTitle: {
    fontSize: 32,
    color: COLORS.TextDark,
    fontWeight: "700",
    marginBottom: 32,
    marginTop: 20,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
});

export default AddDetails;
