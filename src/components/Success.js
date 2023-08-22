import { Text, StyleSheet, SafeAreaView, View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AndroidSafeArea, COLORS } from "../constants/theme";
import BackButton from "./BackButton";
import Button from "./Button";

const Success = ({ text, onPress, para }) => {
  function renderTop() {
    return <BackButton />;
  }

  function renderContent() {
    return (
      <View style={styles.contentContainer}>
        <Image source={require("../assets/images/Success.png")} />
        <Text style={styles.contentTitle}>{text}</Text>
        <Text style={styles.contentPara}>{para}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ ...styles.container}}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 5,
      }}
        showsVerticalScrollIndicator={false}
      >
        {renderTop()}
        {renderContent()}
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Done" onPress={onPress} width={"100%"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#ffff",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 140,
  },
  contentTitle: {
    fontSize: 32,
    color: COLORS.TextDark,
    marginHorizontal: 20,
    fontWeight: "700",
    marginTop: 40,
    textAlign: "center",
  },
  contentPara: {
    fontSize: 14,
    color: COLORS.TextGray,
    marginHorizontal: 20,
    fontWeight: "400",
    marginVertical: 20,
    lineHeight: 22,
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    paddingBottom: 5,
    marginHorizontal: 16,
  },
});

export default Success;
