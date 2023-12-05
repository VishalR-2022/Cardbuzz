import React from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField, Button, Divider } from "../components";
import { COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { postUserProfile } from "../hooks/useAgentApi";
import { Picker } from "@react-native-picker/picker";

const BusinessKyc = () => {
  const navigation = useNavigation();
  const userDetails = useSelector((state) => state.user);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = { ...data, ...userDetails };
    console.log(userData, '>>>>>>>>>>>>>>>>>>>>>> userData')
    const response = await postUserProfile(userData);
    if (response) {
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
                  placeholder="Business yearly turnover(in Lakhs)"
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
              render={({ field }) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    // alignItems: "center",
                    // alignSelf: "stretch",
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#dddd',
                    height: 48,
                    marginTop: 16
                  }}
                >
                  <Picker
                    style={{ padding: 0, margin: 0, color: 'gray' }}
                    selectedValue={field.value}
                    onValueChange={(itemValue) => field.onChange(itemValue)}
                    itemStyle={{color: 'gray', fontSize: 14}}
                  >
                    <Picker.Item label="Ownership Type" value="" />
                    <Picker.Item label="PROPRIETARY" value="PROPRIETARY" />
                    <Picker.Item label="PARTNERSHIP" value="PARTNERSHIP" />
                    <Picker.Item label="PRIVATE" value="PRIVATE" />
                    <Picker.Item label="PUBLIC" value="PUBLIC" />
                    <Picker.Item label="LLP" value="LLP" />
                    <Picker.Item label="SOCIETY" value="SOCIETY" />
                    <Picker.Item label="TRUST" value="TRUST" />
                    <Picker.Item label="GOVT" value="GOVT" />
                  </Picker>
                </View>
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
                  placeholder="Business incorporation date"
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
                  maxLength={10}
                  autoCapitalize="characters"
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
                pattern: {
                  value: /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
                  message: "Invalid Aadhar Number format",
                },
              }}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={(text) => {
                    const formattedText = text
                      .replace(/\s/g, "") // Remove existing spaces
                      .replace(/(\d{4})/g, "$1 "); // Add space after every 4 digits
                    field.onChange(formattedText.trim());
                  }}
                  placeholder="Aadhar Number"
                  maxLength={14}
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
  picker: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dddd",
    padding: 8,
  },
});

export default BusinessKyc;
