import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
} from "react-native";
import { COLORS } from "../constants/theme";
import Button from "./Button";

// ? popupType should be one of the 'error', 'warning' and 'complete'

const PopUp = ({
  onPress,
  title,
  para,
  rechargeText,
  rechargeAmount,
  buttontext,
  popupType,
}) => {
  let imageName;

  if (popupType === "error") {
    imageName = require("../assets/images/error.png");
  } else if (popupType === "complete") {
    imageName = require("../assets/images/complete.png");
  } else if (popupType === "warning") {
    imageName = require("../assets/images/warning.png");
  }

  return (
    <SafeAreaView style={{ ...styles.container }}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../assets/images/PopUpbg.png")}
      >
        <Image style={{ zIndex: 100, marginBottom: -65 }} source={imageName} />
        <View style={styles.content}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerPara}>{para}</Text>

          {rechargeText && (<Text style={styles.headerAmount}>{rechargeText}</Text>)}
          {rechargeAmount && (<Text style={styles.amount}>{rechargeAmount}</Text>)}
          <View style={{ marginTop: 30 }}>
            <Button text={buttontext} width="100%" onPress={onPress} />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  bgImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderRadius: 20, 
    overflow: "hidden", 
    backgroundColor: COLORS.White,
    width: 340,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    color: COLORS.TextDark,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  headerPara: {
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.TextGray,
    textAlign: "center",
    marginBottom: 16,
  },
  headerAmount: {
    fontSize: 16,
    color: COLORS.TextDark,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  amount: {
    fontSize: 32,
    color: COLORS.TextDark,
    fontWeight: "700",
    textAlign: "center",
  },
});

export default PopUp;
