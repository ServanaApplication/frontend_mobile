import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import styles from "../styles/messageStyles";

const ChatHeader = ({ navigation, onEndChat }) => (
  <View style={styles.header}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{ flexDirection: "row", alignItems: "center" }}
    >
      <Feather name="arrow-left" size={25} color="#6A1B9A" />
      <Text style={styles.headerText}>Chats</Text>
    </TouchableOpacity>
    {/* Trigger modal instead of navigation */}
    <TouchableOpacity onPress={onEndChat}>
      <Text style={styles.endChatText}>End chat</Text>
    </TouchableOpacity>
  </View>
);

export default ChatHeader;
