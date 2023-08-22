import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { COLORS } from "../constants/theme";
import Button from "./Button";

const AppModal = ({ open, onPress, title, para }) => {
  return (
    <SafeAreaView style={{ marginHorizontal: 16, ...styles.container }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={onPress}
      >
        <View style={styles.model}>
          <Image
            style={{ marginBottom: -65, zIndex: 5 }}
            source={require("../assets/images/file-error.png")}
          />
          <View style={styles.content}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.headerPara}>{para}</Text>
            <View style={{ marginTop: 30 }}>
              <Button text={"Done"} width="100%" onPress={onPress} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  model: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 10
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
    paddingBottom: 16,
    paddingHorizontal: 16,
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
export default AppModal;
