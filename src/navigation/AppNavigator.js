import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  WalletPayment,
  OnBoarding,
  CreatePin,
  SuccessfulPinSet,
  AddDetails,
  UploadPicture,
  BusinessKyc,
  KycSuccess,
  PopUpKycSuccess,
  BroadBand,
  EditProfile,
  ResetPin,
  QrCashWithdrawal,
  QrGoodService,
  Wallet,
  FastTagIssuer,
  GasOperator,
  CableDth,
  Electricity,
  InsuranceOperator,
  Notification,
  BroadBandRecharge,
  DthRecharge,
  InsuranceRecharge,
  FastTagRecharge,
  GasBillRecharge,
  ElectricityRecharge,
  MobileOperator,
  FilterForm,
  AccountSetting,
  ContactUs,
  AboutUs,
  TermAndConditions,
  PrivacyPolicy,
  EditFormOtpVerification,
  MobileRecharge,
  VerificationOtpSignUp,
  VerificationRegister,
  EditFormSuccess,
  ResetPinSuccess,
  ForgotPin,
  ForgotPinOtp,
  PaymentOptions,
  BroadBandRechargePayment,
  DthRechargePayment,
  FastTagRechargePayment,
  ElectricityOperatorType,
  AddUpiId,
  PopUpSuccessWalletMoney,
  PopUpWarningWalletMoney,
} from "../screens";
import { useSelector } from "react-redux";
import PinLogin from "../screens/PinLogin";
import AppDrawerNavigator from "./AppDrawer";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isLoggedIn = useSelector((state) => state.kyc.kycComplete);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerShown: false,
      }}
      initialRouteName={"OnBoarding"}
    >
      {/* ---------------------OnBoarding------------------- */}

      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen
        name="VerificationOtpSignUp"
        component={VerificationOtpSignUp}
      />
      <Stack.Screen
        name="VerificationRegister"
        component={VerificationRegister}
      />
      <Stack.Screen name="CreatePin" component={CreatePin} />
      <Stack.Screen name="PinSuccess" component={SuccessfulPinSet} />
      <Stack.Screen name="PinLogin" component={PinLogin} />
      <Stack.Screen name="AddDetails" component={AddDetails} />
      <Stack.Screen name="UploadPicture" component={UploadPicture} />
      {/* //TODO: KYC PAGE NOT COMPLETED WITH UI  */}
      <Stack.Screen name="BusinessKyc" component={BusinessKyc} />
      <Stack.Screen name="KycSuccess" component={KycSuccess} />

      {/* -------------------------Success/Error/Warning Popup-------------------------------- */}
      <Stack.Screen name="PopUpKycSuccess" component={PopUpKycSuccess} />

      {/* -----------------MAIN PAGE LAYOUTS--------------------- */}

      <Stack.Screen name="Root" component={AppDrawerNavigator} />

      {/* ---------------------HOME: ---------------- */}
      <Stack.Screen name="WalletPayment" component={WalletPayment} />
      <Stack.Screen name="BroadBandOperator" component={BroadBand} />
      <Stack.Screen name="BroadBandRecharge" component={BroadBandRecharge} />
      <Stack.Screen
        name="BroadBandRechargePayment"
        component={BroadBandRechargePayment}
      />
      <Stack.Screen name="DthRechargePayment" component={DthRechargePayment} />
      <Stack.Screen name="FastTagIssuer" component={FastTagIssuer} />
      <Stack.Screen name="GasOperator" component={GasOperator} />
      <Stack.Screen name="CableDthOperator" component={CableDth} />
      <Stack.Screen name="DthRecharge" component={DthRecharge} />
      <Stack.Screen name="InsuranceRecharge" component={InsuranceRecharge} />
      <Stack.Screen name="FastTagRecharge" component={FastTagRecharge} />
      <Stack.Screen
        name="FastTagRechargePayment"
        component={FastTagRechargePayment}
      />
      <Stack.Screen name="GasBillRecharge" component={GasBillRecharge} />
      <Stack.Screen
        name="ElectricityRecharge"
        component={ElectricityRecharge}
      />
      <Stack.Screen name="ElectricityOperator" component={Electricity} />
      <Stack.Screen
        name="ElectricityOperatorType"
        component={ElectricityOperatorType}
      />
      <Stack.Screen name="InsuranceOperator" component={InsuranceOperator} />
      <Stack.Screen name="MobileOperator" component={MobileOperator} />
      <Stack.Screen name="MobileRecharge" component={MobileRecharge} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Filter" component={FilterForm} />
      <Stack.Screen name="QrCashWithDrawal" component={QrCashWithdrawal} />
      <Stack.Screen name="QrGoodAndService" component={QrGoodService} />
      {/* ---------------------PROFILE: ----------------- */}
      <Stack.Screen name="EditForm" component={EditProfile} />
      <Stack.Screen name="ResetPin" component={ResetPin} />
      <Stack.Screen name="ForgotPin" component={ForgotPin} />
      <Stack.Screen name="ForgotPinOTP" component={ForgotPinOtp} />
      <Stack.Screen
        name="EditFormOtpVerification"
        component={EditFormOtpVerification}
      />
      <Stack.Screen name="AccountSetting" component={AccountSetting} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="TermAndConditions" component={TermAndConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="EditFormSuccess" component={EditFormSuccess} />
      <Stack.Screen name="ResetPinSuccess" component={ResetPinSuccess} />

      <Stack.Screen name="PaymentOptions" component={PaymentOptions} />
      <Stack.Screen name="AddUpiId" component={AddUpiId} />
      <Stack.Screen
        name="PopUpSuccessWalletMoney"
        component={PopUpSuccessWalletMoney}
      />
      <Stack.Screen
        name="PopUpWarningWalletMoney"
        component={PopUpWarningWalletMoney}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
