import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Touchable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField, Button, Divider } from "../components";
import { COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  saveAadharFrontImageUrl,
  savePanImageUrl,
  saveAadharBackImageUrl,
} from "../store/slice/kycSlice";
import * as ImagePicker from "expo-image-picker";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";

const KycForm = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();
  const aadharBack = useSelector((state) => state.kyc.aadharBackUrl);
  const panUrl = useSelector((state) => state.kyc.panCardUrl);
  const aadharFront = useSelector((state) => state.kyc.aadharFrontUrl);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
    }
  };
  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  const addPanImage = () => {
    const options = ["Take A New Photo", "Select Photo From Device", "Dismiss"];
    const cancelButtonIndex = 2;
    const destructiveButtonIndex = 2;
    const textStyle = { textAlign: "center" };
    const showSeparators = true;
    const containerStyle = {
      backgroundColor: COLORS.White, // Adjust the background color
      borderRadius: 10, // Adjust the border radius
    };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        textStyle,
        showSeparators,
        containerStyle,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          let _image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            cameraType: "front",
          });
          if (!_image.canceled) {
            dispatch(savePanImageUrl({ panCardUrl: _image.assets[0].uri }));
          }
        } else if (buttonIndex === 1) {
          let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          if (!_image.cancelled) {
            dispatch(savePanImageUrl({ panCardUrl: _image.assets[0].uri }));
          }
        }
      }
    );
  };
  const addImage = () => {
    const options = ["Take A New Photo", "Select Photo From Device", "Dismiss"];
    const cancelButtonIndex = 2;
    const destructiveButtonIndex = 2;
    const textStyle = { textAlign: "center" };
    const showSeparators = true;
    const containerStyle = {
      backgroundColor: COLORS.White, // Adjust the background color
      borderRadius: 10, // Adjust the border radius
    };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        textStyle,
        showSeparators,
        containerStyle,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          let _image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            cameraType: "front",
          });
          if (!_image.canceled) {
            dispatch(
              saveAadharBackImageUrl({ aadharBackUrl: _image.assets[0].uri })
            );
          }
        } else if (buttonIndex === 1) {
          let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          if (!_image.cancelled) {
            dispatch(
              saveAadharBackImageUrl({ aadharBackUrl: _image.assets[0].uri })
            );
          }
        }
      }
    );
  };
  const addFrontImage = () => {
    const options = ["Take A New Photo", "Select Photo From Device", "Dismiss"];
    const cancelButtonIndex = 2;
    const destructiveButtonIndex = 2;
    const textStyle = { textAlign: "center" };
    const showSeparators = true;
    const containerStyle = {
      backgroundColor: COLORS.White, // Adjust the background color
      borderRadius: 10, // Adjust the border radius
    };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        textStyle,
        showSeparators,
        containerStyle,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          let _image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            cameraType: "front",
          });
          if (!_image.canceled) {
            dispatch(
              saveAadharFrontImageUrl({ aadharFrontUrl: _image.assets[0].uri })
            );
          }
        } else if (buttonIndex === 1) {
          let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          if (!_image.cancelled) {
            dispatch(
              saveAadharFrontImageUrl({ aadharFrontUrl: _image.assets[0].uri })
            );
          }
        }
      }
    );
  };
  const onSubmit = (data) => {
    // Add your submission logic here
    navigation.navigate("KycSuccess");
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
          <Text style={styles.contentTitle}>KYC Form</Text>
          <View>
            {/* Email */}
            <Controller
              control={control}
              name="email"
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder="Email ID"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  defaultValue="tonynguyen@abc.com"
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
            <Divider />
            {/* PAN Number */}
            <Controller
              control={control}
              name="pan"
              defaultValue=""
              rules={{ required: "PAN Number is required" }}
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
          </View>
          <View style={styles.uploadPan}>
            {panUrl ? (
              <Image
                source={{ uri: panUrl }}
                style={{ width: 120, height: 72 }}
              />
            ) : (
              <Image source={require("../assets/images/pancard.png")} />
            )}
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 30 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: COLORS.TextGray,
                  marginBottom: 10,
                }}
              >
                Upload Pan Card Image
              </Text>
              {panUrl ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: COLORS.TextDark,
                    }}
                  >
                    PanCard.jpg
                  </Text>
                  <TouchableOpacity onPress={addPanImage}>
                    <Text style={{ color: COLORS.Primary }}>Change</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Button
                  outlined
                  text="Upload"
                  style={{ paddingVertical: 0, paddingHorizontal: 20 }}
                  onPress={addPanImage}
                  buttonText={{ fontSize: 12 }}
                />
              )}
            </View>
          </View>
          <Divider />
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
          <View style={styles.uploadPan}>
            {aadharFront ? (
              <Image
                source={{ uri: aadharFront }}
                style={{ width: 120, height: 72 }}
              />
            ) : (
              <Image source={require("../assets/images/aadhar.png")} />
            )}
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 30 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: COLORS.TextGray,
                  marginBottom: 10,
                }}
              >
                Upload AADHAR Card front Image
              </Text>
              {aadharFront ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: COLORS.TextDark,
                    }}
                  >
                    aadharFront.jpg
                  </Text>
                  <TouchableOpacity onPress={addFrontImage}>
                    <Text style={{ color: COLORS.Primary }}>Change</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Button
                  outlined
                  text="Upload"
                  style={{ paddingVertical: 0, paddingHorizontal: 20 }}
                  onPress={addFrontImage}
                  buttonText={{ fontSize: 12 }}
                />
              )}
            </View>
          </View>
          <View style={styles.uploadPan}>
            {aadharBack ? (
              <Image
                source={{ uri: aadharBack }}
                style={{ width: 120, height: 72 }}
              />
            ) : (
              <Image source={require("../assets/images/aadhar.png")} />
            )}
            <View style={{ flex: 1, justifyContent: "center", marginLeft: 30 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: COLORS.TextGray,
                  marginBottom: 10,
                }}
              >
                Upload AADHAR Card back Image
              </Text>
              {aadharBack ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "500",
                      color: COLORS.TextDark,
                    }}
                  >
                    aadharBack.jpg
                  </Text>
                  <TouchableOpacity onPress={addImage}>
                    <Text style={{ color: COLORS.Primary }}>Change</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Button
                  outlined
                  text="Upload"
                  style={{ paddingVertical: 0, paddingHorizontal: 20 }}
                  onPress={addImage}
                  buttonText={{ fontSize: 12 }}
                />
              )}
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 20, marginHorizontal: 16 }}>
          <Button
            text="Submit"
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
    flex: 1,
    backgroundColor: COLORS.White,
  },
  formContainer: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  contentTitle: {
    fontSize: 32,
    color: COLORS.TextDark,
    fontWeight: "700",
    marginBottom: 22,
    marginTop: 0,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    fontSize: 10,
  },
  uploadPan: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
});

export default KycForm;
