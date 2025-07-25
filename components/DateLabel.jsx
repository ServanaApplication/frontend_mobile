// components/DateLabel.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DateLabel = ({ label }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  text: {
    marginHorizontal: 8,
    color: "#666",
    fontSize: 12,
  },
});

export default DateLabel;
