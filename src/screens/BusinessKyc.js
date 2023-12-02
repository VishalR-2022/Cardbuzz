import React from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField, Button, Divider } from "../components";
import { COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postUserProfile } from "../hooks/useAgentApi";

const BusinessKyc = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.user);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = {...data, ...userDetails}
      const response = await postUserProfile(userData);
      if (response) {
        console.log(response, '>>>>>>>>>>>>>>>> kyc update')
        navigation.navigate("KycSuccess");
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
          <Text style={styles.contentTitle}>Business KYC</Text>
          <View>
            <Controller
              control={control}
              name="businessName"
              defaultValue=""
              rules={{ required: "Business Name is required" }}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Business Name"
                />
              )}
            />
            {errors.businessName && (
              <Text style={styles.errorText}>
                {errors.businessName.message}
              </Text>
            )}
            <Controller
              control={control}
              name="turnover"
              defaultValue=""
              nullable
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Turnover"
                  keyboardType="numeric"
                />
              )}
            />
            {errors.turnover && (
              <Text style={styles.errorText}>{errors.turnover.message}</Text>
            )}
            <Controller
              control={control}
              name="ownershipType"
              defaultValue=""
              nullable
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Ownership Type"
                />
              )}
            />
            <Controller
              control={control}
              name="dob"
              defaultValue=""
              nullable
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="DOB"
                />
              )}
            />
            <View style={{ marginTop: 12 }}>
              <Divider />
            </View>
            <Controller
              control={control}
              name="pan"
              defaultValue=""
              rules={{
                required: "PAN Number is required",
                pattern: {
                  value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                  message: "Invalid PAN Number format",
                },
              }}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="PAN Number"
                  defaultValue="ABCDE0000A"
                />
              )}
            />
            {errors.pan && (
              <Text style={styles.errorText}>{errors.pan.message}</Text>
            )}
            <View style={{ marginTop: 12 }}>
              <Divider />
            </View>
            <Controller
              control={control}
              name="aadhar"
              rules={{
                required: "Aadhar Number is required",
                minLength: {
                  value: 12,
                  message: "Aadhar Number must be 12 digits",
                },
                maxLength: {
                  value: 12,
                  message: "Aadhar Number must be 12 digits",
                },
              }}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Aadhar Number"
                  maxLength={12}
                  keyboardType="numeric"
                  defaultValue="0000 0000 0000"
                />
              )}
            />
            {errors.aadhar && (
              <Text style={styles.errorText}>{errors.aadhar.message}</Text>
            )}
          </View>
          <View style={{ marginTop: 30 }}>
            <Button
              text="Submit"
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

export default BusinessKyc;
