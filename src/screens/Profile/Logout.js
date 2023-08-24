import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { BackButton, ArrowButton } from "../../components";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const Logout = () => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);

  function renderTop() {
    return <BackButton text="Logout" />;
  }

  function renderContent() {
    return (
      <View style={{ marginTop: 40 }}>
        <ArrowButton text="Logout" onPress={() => setOpen(true)} />
        {/* <ArrowButton
          text="Delete Account"
          onPress={() => navigation.navigate("OnBoarding")}
        /> */}
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
  contentContainer: {
    marginHorizontal: 16,
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  headerPara: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.TextGray,
    textAlign: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: COLORS.TextGray,
  },
});

export default Logout;
