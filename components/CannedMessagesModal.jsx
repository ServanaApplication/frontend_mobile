import React, { forwardRef } from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  InteractionManager,
} from "react-native";
import { Modalize } from "react-native-modalize";

const CannedMessagesModal = forwardRef(
  ({ cannedMessages, onSelect, inputMessage, setInputMessage, onFocusMainInput }, ref) => {
    return (
      <Modalize
        ref={ref}
        adjustToContentHeight
        modalStyle={styles.modal}
        handlePosition="inside"
        flatListProps={{
          data: cannedMessages,
          keyExtractor: (item, index) => index.toString(),
          keyboardShouldPersistTaps: "handled",
          ListHeaderComponent: () => (
            <TextInput
              style={styles.input}
              value={inputMessage}
              placeholder="Type a message..."
              onChangeText={setInputMessage}
              onFocus={() => {
                // Close the modal first
                ref?.current?.close();

                // Wait for animations to finish
                InteractionManager.runAfterInteractions(() => {
                  setTimeout(() => {
                    onFocusMainInput?.(); // Call parent to focus main input
                  }, 80); // Smooth short delay
                });
              }}
            />
          ),
          renderItem: ({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => onSelect(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    );
  }
);

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 14,
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
});

export default CannedMessagesModal;
