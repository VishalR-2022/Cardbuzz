import React, { useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, Share } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AndroidSafeArea, COLORS } from "../../constants/theme";
import { Button, BackButton } from "../../components";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import ViewShot from "react-native-view-shot"; // Import the react-native-view-shot library

const QrGoodService = () => {
  const svgRef = useRef(null);

  const navigation = useNavigation();

  const saveQRCode = async () => {
    try {
      if (!svgRef.current) {
        return;
      }

      // Capture the QRCode SVG as an image
      const uri = await captureRef(svgRef, {
        format: "jpg", // Change the format to jpg
        quality: 1,
      });

      Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Error sharing QR code:", error);
    }
  };

  function renderTop() {
    return <BackButton text="QR code" />;
  }

  function renderCardContent() {
    return (
      <ViewShot ref={svgRef} options={{ format: "jpg", quality: 1 }}>
        <View style={styles.cardContent}>
          <Text style={styles.headerText}>Goods and Services</Text>
          <QRCode
            value="https://www.youtube.com/"
            logoSize={30}
            size={300}
            logoBackgroundColor="transparent"
          />
        </View>
      </ViewShot>
    );
  }

  return (
    <SafeAreaView
      style={{ ...styles.container, ...AndroidSafeArea.AndroidSafeArea }}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        {renderCardContent()}
      </KeyboardAwareScrollView>
      <View style={{ marginHorizontal: 16, marginBottom: 20, gap: 16 }}>
        <Button outlined text="Share QR" width={"100%"} onPress={saveQRCode} />
        <Button
          text="Download QR"
          width={"100%"}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 30,
    textAlign: "left",
    color: COLORS.TextGray,
    marginBottom: 40,
  },
  cardContent: {
    backgroundColor: "transparent",
    marginVertical: 80,
    alignItems: "center",
  },
  amountInput: {
    color: "#000",
    fontSize: 52,
    fontWeight: "700",
    lineHeight: 64,
    letterSpacing: 0,
    textAlign: "center",
    padding: 10,
    borderRadius: 8,
  },
  proceedButton: {
    width: 320,
    height: 56,
    padding: 4,
    paddingHorizontal: 20,
    borderRadius: 28,
    gap: 4,
    opacity: 1,
    backgroundColor: "#282B63",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#C9CAD8",
  },
  proceedButtonText: {
    color: "#E7E7E9",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default QrGoodService;
