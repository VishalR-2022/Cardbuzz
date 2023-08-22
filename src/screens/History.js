import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BackButton, Divider, Transactions } from "../components";
import { AndroidSafeArea, COLORS, SIZES } from "../constants/theme";
import { Wallet } from "../svg";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const History = () => {
  const [active, setActive] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isFromDatePickerVisible, setIsFromDatePickerVisible] = useState(false);
  const [isToDatePickerVisible, setIsToDatePickerVisible] = useState(false);

  const scrollButtons = ["Today", "Last 7 Days", "Last 30 Days", "Custom"];

  const fromToButtonText = () => {
    if (fromDate && toDate) {
      return `From ${fromDate.toDateString()} - To ${toDate.toDateString()}`;
    } else if (fromDate) {
      return `From ${fromDate.toDateString()}`;
    } else if (toDate) {
      return `To ${toDate.toDateString()}`;
    }
    return "Custom";
  };

  const showFromDatePicker = () => {
    setIsFromDatePickerVisible(true);
  };

  const hideFromDatePicker = () => {
    setIsFromDatePickerVisible(false);
  };

  const showToDatePicker = () => {
    setIsToDatePickerVisible(true);
  };

  const hideToDatePicker = () => {
    setIsToDatePickerVisible(false);
  };

  const handleFromDateConfirm = (date) => {
    setFromDate(date);
    hideFromDatePicker();
    showToDatePicker();
  };

  const handleToDateConfirm = (date) => {
    setToDate(date);
    hideToDatePicker();
  };

  const renderScrollButton = () => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.scrollButtonContainer}>
          {scrollButtons.map((item, index) => (
            <HorizontalButton
              text={item === "Custom" ? fromToButtonText() : item}
              index={index}
            />
          ))}
        </View>
      </ScrollView>
    );
  };

  const HorizontalButton = ({ text, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setActive(index);
          if (index === 3) {
            showFromDatePicker();
          }
        }}
        style={{
          ...styles.horizontalButton,
          borderWidth: active === index ? 0 : 1,
          borderRadius: 6,
          backgroundColor: active === index ? COLORS.Primary : COLORS.White,
        }}
      >
        <Text
          style={{
            color: active === index ? COLORS.White : COLORS.TextDark,
            fontSize: 16,
            fontWeight: active === index ? "600" : "500",
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTop = () => {
    return <BackButton text="My Earnings" />;
  };

  const renderContent = () => {
    return (
      <View
        style={{
          marginHorizontal: 16,
          backgroundColor: "#f5f5f5",
          marginVertical: 20,
          borderRadius: 8,
        }}
      >
        <View style={styles.searchBar}>
          <View>
            <Wallet strokeColor={true} />
          </View>
          <Text style={styles.contentTitle}>Total Earning</Text>
          <Text style={styles.walletAmount}>₹2,000</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ ...styles.container, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        <Divider width={3} />
        {renderContent()}
        {renderScrollButton()}
        <Transactions earnings={true} />
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={isFromDatePickerVisible}
        mode="date"
        onConfirm={handleFromDateConfirm}
        onCancel={hideFromDatePicker}
      />
      <DateTimePickerModal
        isVisible={isToDatePickerVisible}
        mode="date"
        onConfirm={handleToDateConfirm}
        onCancel={hideToDatePicker}
      />
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
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: SIZES.borderRadius,
    padding: 10,
    backgroundColor: "#f5f5f5",
    gap: 20,
  },
  walletAmount: {
    fontSize: 16,
    color: COLORS.TextDark,
    fontWeight: "700",
  },
  contentTitle: {
    fontSize: 16,
    color: COLORS.TextDark,
    fontWeight: "500",
    flex: 1,
    justifyContent: "flex-start",
  },
  horizontalButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: "#EDEDED",
  },
  scrollButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
  },
});

export default History;
