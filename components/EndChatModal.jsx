import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const EndChatModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>End Chat</Text>
          <Text style={styles.message}>Are you sure you want to end this chat?</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: screenWidth * 0.9, // Wider modal
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: "red",
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "flex-start", // Align left
  },
  message: {
    fontSize: 14,
    textAlign: "left",
    marginBottom: 20,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#6f3fc9",
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  cancelText: {
    color: "#6f3fc9",
    fontWeight: "500",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#6f3fc9",
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "500",
  },
});

export default EndChatModal;
