import React, { useEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  TextField,
  Button,
  Divider,
  ArrowButton,
  BackButton,
} from "../components";
import { AndroidSafeArea, COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { saveImageUrl } from "../store/slice/authSlice";
import { useActionSheet } from "@expo/react-native-action-sheet";

const Profile = () => {
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();

  const image = useSelector((state) => state.auth.imageUrl);
  const name = useSelector((state) => state.user.fullName);
  const contactInfo = useSelector((state) => state.auth.mobileNumber);
  const dispatch = useDispatch();

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };

  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

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
          console.log(JSON.stringify(_image));
          if (!_image.canceled) {
            dispatch(saveImageUrl({ imageUrl: _image.assets[0].uri }));
          }
        } else if (buttonIndex === 1) {
          let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
          if (!_image.cancelled) {
            dispatch(saveImageUrl({ imageUrl: _image.uri }));
          }
        }
      }
    );
  };

  function renderTop() {
    return <BackButton text={"My Profile"} />;
  }

  function renderContent() {
    return (
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 16,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ position: "relative" }}>
          <View style={styles.uploadContainer}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 80, height: 80 }}
              />
            )}
          </View>
          <TouchableOpacity style={styles.edit} onPress={addImage}>
            <Image source={require("../assets/images/camera.png")} />
          </TouchableOpacity>
        </View>

        <View style={{ marginLeft: 20, flex: 1, justifyContent: "flex-start" }}>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.contactInfo}>{contactInfo}</Text>
        </View>
      </View>
    );
  }

  function renderButtons() {
    return (
      <View>
        <ArrowButton
          text="Edit Profile"
          onPress={() => navigation.navigate("EditForm")}
        />
        <ArrowButton
          text="Reset Pin"
          onPress={() => navigation.navigate("ResetPin")}
          width={15}
        />
        <ArrowButton
          text="Contact Us"
          onPress={() => navigation.navigate("ContactUs")}
        />
        <ArrowButton
          text="About Us"
          onPress={() => navigation.navigate("AboutUs")}
        />
        <ArrowButton
          text="Term and condition"
          onPress={() => navigation.navigate("TermAndConditions")}
        />
        <ArrowButton
          text="Privacy Policy"
          onPress={() => navigation.navigate("PrivacyPolicy")}
        />
        <ArrowButton
          text="Logout"
          onPress={() => navigation.navigate("Logout")}
        />
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
        <Divider width={3} />
        {renderContent()}
        <Divider width={15} />
        {renderButtons()}
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
  uploadContainer: {
    elevation: 2,
    height: 80,
    width: 80,
    backgroundColor: "#efefef",
    borderRadius: 999,
    overflow: "hidden",
  },
  edit: {
    backgroundColor: "#717171",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    borderRadius: 68,
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 28,
    color: COLORS.TextDark,
  },
  contactInfo: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 22,
    color: COLORS.TextDark,
  },
});

export default Profile;
