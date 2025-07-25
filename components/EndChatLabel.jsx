// components/EndChatLabel.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EndChatLabel = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />
      <Text style={styles.label}>You ended the conversation</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 8,
  },
  label: {
    color: "#aaa",
    fontSize: 12,
  },
});

export default EndChatLabel;
