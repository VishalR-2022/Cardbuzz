import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField, Button, Divider, BackButton } from "../../components";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const AboutUs = () => {
  function renderTop() {
    return <BackButton text="About Us" />;
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
});

export default AboutUs;
