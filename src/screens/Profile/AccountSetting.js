import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Switch, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  TextField,
  Button,
  Divider,
  BackButton,
  ArrowButton,
} from "../../components";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import Notification from "./../../svg/Notification";

const AccountSetting = () => {
  const navigation = useNavigation();
  const [switchValue, setSwitchValue] = useState(true);

  const toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    setSwitchValue(value);
    //state changes according to switch
    //which will result in re-render the text
  };

  function renderTop() {
    return <BackButton text="Account Setting" />;
  }

  function renderContent() {
    return (
      <View style={styles.contentContainer}>
        <Text>Notification</Text>
        <Switch
          trackColor={{ false: "#767577", true: COLORS.Primary }}
          thumbColor={switchValue ? COLORS.White : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={switchValue}
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
        {renderContent()}
        <Divider />
      </KeyboardAwareScrollView>
      <View style={{ marginBottom: 10 }}>
        <ArrowButton
          text="Logout"
          onPress={() => navigation.navigate("Logout")}
        />
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
  contentContainer: {
    marginHorizontal: 16,
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent:'space-between'
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
});

export default AccountSetting;
