import React, { useState, useEffect } from "react";
import { AppModal, NavigateRecharge } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { Modal, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

const InsuranceRecharge = ({ route }) => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (route.params && route.params.data) {
      setData(route.params.data);
    }
  }, [route.params]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <NavigateRecharge
          operatorName={"Insurance"}
          data={data}
          text="Enter Policy Number"
          placeholder={"Policy Number"}
          defaultValue={"9898989898"}
          desc="Your service provider will take two working days to consider bill paid in their accounts."
          buttonText={"Next"}
          onPress={() => {
            setOpen(true);
          }}
        />
        {open && (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black layer
            }}
          />
        )}
      </View>
      <View
        style={{ backgroundColor: open ? "rgba(0, 0, 0, 0.5)" : COLORS.White }}
      >
        <AppModal
          open={open}
          onPress={() => {
            setOpen(false);
            navigation.navigate("PaymentOptions");
          }}
          title="No pending premium Found"
          para="Seems like you have paid all of premiums for this policy"
        />
      </View>
    </>
  );
};

export default InsuranceRecharge;
