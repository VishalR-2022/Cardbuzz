import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AndroidSafeArea, COLORS } from "../constants/theme";
import BackButton from "./BackButton";
import Divider from "./Divider";
import Button from "./Button";
import TextField from "./TextField";

const NavigateRecharge = ({
  data,
  operatorName,
  text,
  placeholder,
  defaultValue,
  desc,
  buttonText,
  onPress,
  bg = "#fff",
}) => {
  const [value, setValue] = useState();
  function renderTop() {
    return (
      <>
        <BackButton />
        <Divider />
      </>
    );
  }

  function renderData() {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.operatorItem}>
          <Image source={data?.icon} style={styles.operatorIcon} />
          <View style={{ display: "flex" }}>
            <Text style={styles.navigationName}>{operatorName}</Text>
            <Text style={styles.operatorName}>{data?.name}</Text>
          </View>
        </View>
        <Divider />
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{text}</Text>
          <TextField
            keyboardType="numeric"
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => setValue(text)}
            defaultValue={defaultValue}
          />
          <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        ...AndroidSafeArea.AndroidSafeArea,
      }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        {renderData()}
      </KeyboardAwareScrollView>
      <View style={{ marginHorizontal: 16, marginBottom: 10 }}>
        <Button text={buttonText} width={"100%"} onPress={onPress} />
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
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  dataContainer: {
    marginHorizontal: 16,
  },
  operatorItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: COLORS.White,
    borderRadius: 8,
    marginTop: 10,
  },
  operatorIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  operatorName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.TextGray,
  },
  navigationName: {
    fontSize: 12,
    color: COLORS.TextGray,
    fontWeight: "400",
  },
  inputContainer: {
    marginTop: 40,
  },
  inputText: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
    color: COLORS.TextDark,
  },
  desc: {
    fontSize: 12,
    color: COLORS.TextGray,
    lineHeight: 20,
    marginTop: 20,
    fontWeight: "300",
  },
});

export default NavigateRecharge;
