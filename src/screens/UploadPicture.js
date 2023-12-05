import React, { useEffect } from "react";
import { Text, StyleSheet, SafeAreaView, View, Image, PermissionsAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../components";
import { AndroidSafeArea, COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { saveImageUrl } from "../store/slice/authSlice";
import { postUserProfilePhoto } from "../hooks/useAgentApi";

const UploadPicture = () => {
  const navigation = useNavigation();

  const image = useSelector((state) => state.auth.imageUrl);
  const dispatch = useDispatch();
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        dispatch(saveImageUrl({ imageUrl: response.assets?.[0] }));
      }
    });
  }

  const openImagePicker = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image picker error: ", response.error);
      } else {
        dispatch(saveImageUrl({ imageUrl: response.assets?.[0] }));
      }
    });
  }

  const handleNext = async () => {
    if (image !== null) {
      console.log(image, ">>>>>>>>>>>>>>>>>>>> image");
      const response = await postUserProfilePhoto(image);
    }
    // navigation.navigate("BusinessKyc");
  };

  function renderTop() {
    return <BackButton />;
  }

  function renderContent() {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <Text style={styles.contentTitle}>Upload Your Pic</Text>

        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.uploadContainer}>
            {image && (
              <Image
                source={{ uri: image.uri }}
                style={{ width: 120, height: 120 }}
              />
            )}
          </View>
        </View>
        <View style={{ gap: 10, marginVertical: 32 }}>
          <Button
            text="Take a new Photo"
            outlined
            width={"90%"}
            onPress={handleCameraLaunch}
          />
          <Button
            text="Select Photo from device"
            outlined
            width={"90%"}
            onPress={openImagePicker}
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
          paddingTop: 0,
          paddingBottom: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        {renderContent()}
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Next" onPress={handleNext} width={"100%"} />
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
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
    paddingBottom: 20,
    justifyContent: "flex-end",
    marginHorizontal: 16,
  },
  uploadContainer: {
    elevation: 2,
    height: 120,
    width: 120,
    backgroundColor: "#efefef",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UploadPicture;
