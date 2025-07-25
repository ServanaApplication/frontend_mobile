import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/messageStyles";

const MessageItem = ({ item }) => (
  <View
    style={[
      styles.selectedBubble,
      { alignSelf: item.sender === "user" ? "flex-end" : "flex-start" },
    ]}
  >
    <Text style={styles.selectedBubbleText}>{item.content}</Text>
    <Text style={styles.timeText}>{item.displayTime}</Text>
  </View>
);

export default MessageItem;
