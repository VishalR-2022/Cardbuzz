import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";
import {
  Close,
  FileIcon,
  HistoryTab,
  LogoutTab,
  ProfileTab,
  ResetPinTab,
} from "../svg";
import { ArrowButton } from "../components";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const image = useSelector((state) => state.auth.imageUrl);

  const closeDrawer = () => {
    props.navigation.closeDrawer(); // Close the drawer
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            marginTop: 15,
            marginBottom: 40,
            marginHorizontal: 16,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={closeDrawer} // Close the drawer
          >
            <Close />
          </TouchableOpacity>
          <View style={styles.uploadContainer}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 40, height: 40 }}
              />
            )}
          </View>
          <View
            style={{ marginLeft: 8, flex: 1, justifyContent: "flex-start" }}
          >
            <Text style={styles.userName}>Amit Thakur</Text>
            <Text style={styles.welcomeText}>Welcome Back,</Text>
          </View>
        </View>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <ArrowButton
            text="My Profile"
            onPress={() => navigation.navigate("Profile")}
            icon={<ProfileTab />}
          />
          <ArrowButton
            text="My Earnings"
            onPress={() => navigation.navigate("History")}
            icon={<HistoryTab />}
          />
          <ArrowButton
            text="Reset Pin"
            onPress={() => navigation.navigate("ResetPin")}
            icon={<ResetPinTab />}
          />
          {/* <ArrowButton
            text="Account Settings"
            onPress={() => navigation.navigate("AccountSetting")}
            icon={<ProfileTab />}
          /> */}
          <ArrowButton
            text="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
            icon={<FileIcon />}
          />
          <ArrowButton
            text="Contact Us"
            onPress={() => navigation.navigate("ContactUs")}
            icon={<FileIcon />}
          />
        </View>
      </DrawerContentScrollView>
      {/* <ArrowButton
        text="Logout"
        onPress={() => navigation.navigate("Logout")}
        icon={<LogoutTab />}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    elevation: 2,
    height: 40,
    width: 40,
    backgroundColor: "#efefef",
    borderRadius: 999,
    overflow: "hidden",
  },
  welcomeText: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0,
    color: COLORS.TextDark,
  },
  userName: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    color: COLORS.TextDark,
  },
});

export default CustomDrawer;
