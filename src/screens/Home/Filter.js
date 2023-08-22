import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, BackButton, Divider } from "../../components";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";

const FilterForm = () => {
  const navigation = useNavigation();
  const [months, setMonths] = useState([
    "All",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const status = ["All", "Successful", "Processing", "Failure"];
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);

  function renderTop() {
    return (
      <>
        <BackButton text="Filter" />
        <Divider />
      </>
    );
  }

  const MonthButton = ({ text, onPress, style, textStyle }) => {
    return (
      <TouchableOpacity onPress={onPress} style={style}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const handleMonthButtonPress = (index) => {
    setSelectedMonth(index);
  };

  const handleStatusButtonPress = (index) => {
    setSelectedStatus(index);
  };

  function renderContent() {
    return (
      <View style={{ marginHorizontal: 16, marginVertical: 20 }}>
        <Text style={styles.contentTitle}>Monthly</Text>
        <View style={styles.buttonGroup}>
          {months.map((month, index) => (
            <MonthButton
              key={index}
              text={month}
              onPress={() => handleMonthButtonPress(index)}
              style={[
                styles.monthButton,
                selectedMonth === index && styles.selectedMonthButton,
              ]}
              textStyle={[
                styles.monthButtonText,
                selectedMonth === index && styles.selectedMonthButtonText,
              ]}
            />
          ))}
        </View>
        <Text style={styles.contentTitle}>Status</Text>
        <View style={styles.buttonGroup}>
          {status.map((month, index) => (
            <MonthButton
              key={index}
              text={month}
              onPress={() => handleStatusButtonPress(index)}
              style={[
                styles.statusButton,
                selectedStatus === index && styles.selectedMonthButton,
              ]}
              textStyle={[
                styles.monthButtonText,
                selectedStatus === index && styles.selectedMonthButtonText,
              ]}
            />
          ))}
        </View>
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
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text="Apply"
          onPress={() => {
            navigation.navigate("MainLayout", { selectedTab: "History" });
          }}
          width={"100%"}
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
  contentTitle: {
    fontSize: 14,
    color: COLORS.TextDark,
    fontWeight: "700",
    marginBottom: 14,
    marginTop: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  monthButton: {
    width: "30%",
    marginBottom: 10,
    backgroundColor: COLORS.LightGray,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: COLORS.TextGray,
  },
  statusButton:{
    width: "49%",
    marginBottom: 10,
    backgroundColor: COLORS.LightGray,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: COLORS.TextGray,
  },
  selectedMonthButton: {
    backgroundColor: COLORS.Primary,
    borderWidth: 0,
  },
  monthButtonText: {
    color: COLORS.TextDark,
    fontSize: 14,
    textAlign: "center",
  },
  selectedMonthButtonText: {
    color: COLORS.White,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
    paddingBottom: 20,
    justifyContent: "flex-end",
    marginHorizontal: 16,
  },
});

export default FilterForm;
