import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "./../components/Button";
import { useNavigation } from "@react-navigation/native";
import { AndroidSafeArea, COLORS } from "../constants/theme";
import { useForm, Controller } from "react-hook-form";

import { BackButton, Divider, TextField } from "../components";

const AddUpiId = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // Add your submission logic here
    console.log(data);
    navigation.navigate("PopUpSuccessWalletMoney");
  };

  function renderTop() {
    return (
      <>
        <BackButton text={"Add UPI ID"} />
        <Divider />
      </>
    );
  }

  function renderContent() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentText}>Grand Total: 2 Items</Text>
          <Text>₹500</Text>
        </View>
        <Controller
          control={control}
          name="upiId"
          rules={{
            required: "UPI ID is required",
            pattern: {
              value: /^[0-9]{12}@.*$/,
              message: "Invalid UPI ID",
            },
          }}
          render={({ field }) => (
            <TextField
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Enter your UPI ID"
              autoCapitalize="none"
              defaultValue="000000000000@ybl"
            />
          )}
        />
        {errors.upiId && (
          <Text style={styles.errorText}>{errors.upiId.message}</Text>
        )}
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginVertical: 20,
            marginTop: 30,
          }}
        >
          <Image source={require("../assets/images/upiLogos.png")} />
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
      <View style={{ marginVertical: 20, marginHorizontal: 16 }}>
        <Button
          text="Verify and pay"
          onPress={handleSubmit(onSubmit)}
          width={"100%"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    backgroundColor: COLORS.White,
  },
  contentHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentContainer: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  contentText: {
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    fontSize: 10,
  },
});

export default AddUpiId;
