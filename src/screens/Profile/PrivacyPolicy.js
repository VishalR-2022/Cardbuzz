import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextField, Button, Divider, BackButton } from "../../components";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const PrivacyPolicy = () => {
  function renderTop() {
    return <BackButton text="Privacy Policy" />;
  }

  const Content = ({ title, para }) => {
    return (
      <View>
        <Text style={styles.contentTitle}>{title}</Text>
        <Text style={styles.contentPara}>{para}</Text>
      </View>
    );
  };
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
        <View style={{ marginHorizontal: 16, marginTop: 40 }}>
          <Content
            title={"Privacy"}
            para="A mobile app privacy policy is a legal statement that must be clear, conspicuous, and consented to by all users. It must disclose how a mobile app gathers, stores, and uses the personally identifiable information it collects from its users.
          A mobile privacy app is developed and presented to users so that mobile app developers stay compliant with state, federal, and international laws. As a result, they fulfill the legal requirement to safeguard user privacy while protecting the company itself from legal challenges.
          "
          />
          <Content
            title={"Authorized Users"}
            para="A mobile app privacy policy is a legal statement that must be clear, conspicuous, and consented to by all users. It must disclose how a mobile app gathers, stores, and uses the personally identifiable information it collects from its users.
          "
          />
        </View>
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
    fontSize: 22,
    lineHeight: 30,
    marginBottom: 4,
    fontWeight: "600",
    color: COLORS.TextDark,
  },
  contentPara: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
    fontWeight: "300",
    color: COLORS.TextGray,
  },
});

export default PrivacyPolicy;
