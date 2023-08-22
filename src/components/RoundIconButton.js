import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

const RoundIconButton = ({ Svg, onPress, text, color }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={{ ...styles.iconContainer, backgroundColor: color }}>
          <Svg />
        </View>
      </TouchableOpacity>
      {text.length < 10 ? (
        text.split(" ").map((word, index) => (
          <Text key={index} style={styles.buttonText}>
            {word}
          </Text>
        ))
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    borderRadius: 18,
    overflow: "hidden",
    width: 50,
  },
  iconContainer: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#6D717A",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
  },
});

export default RoundIconButton;
