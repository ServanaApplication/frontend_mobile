import React, { forwardRef, useRef, useImperativeHandle } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InputBar = forwardRef(({ inputMessage, onChangeText, onSend, onShowCannedMessages }, ref) => {
  const textInputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      textInputRef.current?.focus();
    },
  }));

  return (
    <View style={styles.container}>
      {/* Canned Messages Icon (left side) */}
      <TouchableOpacity onPress={onShowCannedMessages} style={styles.iconButton}>
        <Ionicons name="menu-outline" size={24} color="#5C2E90" />
      </TouchableOpacity>

      {/* Input Field */}
      <TextInput
        ref={textInputRef}
        style={styles.input}
        placeholder="Message"
        value={inputMessage}
        onChangeText={onChangeText}
        multiline
      />

      {/* Send Button (right side) */}
      <TouchableOpacity onPress={onSend} style={styles.iconButton}>
        <Ionicons name="send" size={24} color="#5C2E90" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20, // More rounded like before
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    maxHeight: 120,
  },
  iconButton: {
    padding: 6,
  },
});

export default InputBar;
