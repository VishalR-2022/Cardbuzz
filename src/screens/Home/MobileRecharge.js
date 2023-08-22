import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../../constants/theme";
import { BackButton, Divider, Button, RechargeOptions } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MobileRecharge = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState(0);
  const [data, setData] = useState({
    id: "1",
    name: "Operator 1",
    icon: require("../../assets/images/jio.png"),
  });

  const scrollButtons = [
    "International Roaming",
    "Internet Pack",
    "International Roaming",
    "Internet Pack",
    "International Roaming",
    "Internet Pack",
  ];

  const HorizontalButton = ({ text, index }) => {
    return (
      <TouchableOpacity
        onPress={() => setActive(index)}
        style={{
          ...styles.horizontalButton,
          borderColor: active === index ? COLORS.Primary : "transparent",
          borderWidth: active === index ? 1 : 0,
          borderRadius: 95,
        }}
      >
        <Text
          style={{
            color: active === index ? COLORS.Primary : COLORS.TextDark,
            fontSize: 14,
            fontWeight: active === index ? "500" : "400",
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  function renderTop() {
    return (
      <>
        <BackButton text="Select Plan" />
        <Divider />
      </>
    );
  }

  function renderData() {
    return (
      <View style={styles.dataContainer}>
        <View style={styles.operatorItem}>
          <Image source={data?.icon} style={styles.operatorIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.navigationName}>Airtel • Karnataka</Text>
            <Text style={styles.operatorName}>+91 98989 89898</Text>
          </View>
          <Button
            outlined
            text="Edit"
            style={{ paddingHorizontal: 20, paddingVertical: 5 }}
            buttonText={{ fontSize: 16, fontWeight: "600" }}
          />
        </View>
        <Divider />
        {renderScrollButton()}
      </View>
    );
  }

  function renderScrollButton() {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.scrollButtonContainer}>
          {scrollButtons.length > 0 &&
            scrollButtons.map((item, index) => (
              <HorizontalButton text={item} index={index} />
            ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        {renderData()}
        <RechargeOptions />
        <RechargeOptions />
        <RechargeOptions />
        <RechargeOptions />
        <RechargeOptions />
      </KeyboardAwareScrollView>
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
    paddingTop: 10,
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
    justifyContent: "space-between",
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
    color: "#C5C5C5",
    fontWeight: "400",
  },
  scrollButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  scrollButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: COLORS.Primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  horizontalButton: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    backgroundColor: "#F5F5F5",
  },
});

export default MobileRecharge;
