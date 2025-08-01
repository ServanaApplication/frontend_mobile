import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import styles from "../styles/messageStyles";

const AGENT_NAME = "Agent-Maria";
const AGENT_AVATAR = require("../assets/agent.jpg");

const MessageItem = ({ item }) => {
  const isUser = item.sender === "user";

  return (
    <View
      style={[
        localStyles.messageContainer,
        { alignItems: isUser ? "flex-end" : "flex-start" },
      ]}
    >
      {/* Agent Info */}
      {!isUser && (
        <View style={localStyles.agentInfoContainer}>
          <Image source={AGENT_AVATAR} style={localStyles.avatar} />
          <Text style={localStyles.agentName}>{AGENT_NAME}</Text>
        </View>
      )}

      {/* Message Bubble */}
      <View
        style={[
          styles.selectedBubble,
          isUser
            ? {
                backgroundColor: "#6A1B9A",
                borderTopRightRadius: 0,
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              }
            : {
                backgroundColor: "#f5f5f5",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                marginLeft: 26,
                marginTop:0,
              },
        ]}
      >
        <Text
          style={[
            styles.selectedBubbleText,
            !isUser && { color: "#000" }, // Black text for agent
          ]}
        >
          {item.content}
        </Text>
        <Text
          style={[
            styles.timeText,
            !isUser && { color: "#888" }, // Gray time for agent
          ]}
        >
          {item.displayTime}
        </Text>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  messageContainer: {
    width: "100%",
    marginVertical: 4,
  },
  agentInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  agentName: {
    marginLeft: 6,
    fontWeight: "600",
    color: "#555",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

export default MessageItem;
