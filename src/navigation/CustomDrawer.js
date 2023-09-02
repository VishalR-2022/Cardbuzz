import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
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
  const [open, setOpen] = useState(false);
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
            onPress={() => navigation.navigate("EditForm")}
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
          <ArrowButton
            text="Terms and condition"
            onPress={() => navigation.navigate("TermAndConditions")}
            icon={<FileIcon />}
          />
          <ArrowButton
            text="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
            icon={<FileIcon />}
          />
          <ArrowButton
            text="About Us"
            onPress={() => navigation.navigate("AboutUs")}
            icon={<FileIcon />}
          />
          <ArrowButton
            text="Contact Us"
            onPress={() => navigation.navigate("ContactUs")}
            icon={<FileIcon />}
          />
        </View>
      </DrawerContentScrollView>
      <ArrowButton
        text="Logout"
        onPress={() => setOpen(true)}
        icon={<LogoutTab />}
      />
      {open && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: "#0216384D", // Semi-transparent black layer
          }}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <View style={styles.model}>
          <View style={styles.content}>
            <Text style={styles.headerTitle}>
              Do you really want to sign out of your account?
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                borderTopWidth: 1,
                width: "100%",
                borderColor: COLORS.TextGray,
              }}
            >
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text
                  style={{
                    textAlign: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    fontSize: 16,
                    fontWeight: "600",
                    color: COLORS.TextGray,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <View style={styles.verticalLine} />
              <TouchableOpacity
                onPress={() => {
                  setOpen(false);
                  navigation.navigate("OnBoarding");
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    paddingVertical: 12,
                    fontSize: 16,
                    fontWeight: "600",
                    color: COLORS.Error,
                    paddingHorizontal: 16,
                  }}
                >
                  Log Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  model: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  content: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: COLORS.White,
    width: 300,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.TextDark,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    marginHorizontal: 16,
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: COLORS.TextGray,
  },
});

export default CustomDrawer;
