import React, { useState, useRef, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  View,
  InteractionManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ChatHeader from "../components/ChatHeader";
import MessageItem from "../components/MessageItem";
import InputBar from "../components/InputBar";
import InitialOptions from "../components/InitialOptions";
import DateLabel from "../components/DateLabel";
import CannedMessagesModal from "../components/CannedMessagesModal";
import EndChatModal from "../components/EndChatModal";
import EndChatLabel from "../components/EndChatLabel";

import styles from "../styles/messageStyles";
import { getDateLabel } from "../utils/getDateLabel";

const Messages = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEndChatModal, setShowEndChatModal] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);

  const flatListRef = useRef();
  const inputRef = useRef();
  const modalizeRef = useRef();

  const cannedMessages = [
    "Can you describe the issue in detail?",
    "Please provide your account number.",
    "Let me check that for you.",
    "Thank you for your patience.",
    "I will escalate this issue to our support team.",
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    sendMessage(option);
  };

  const sendMessage = (text = null) => {
    const content = (text ?? inputMessage).trim();
    if (!content) return;

    const now = new Date();
    const newMessage = {
      id: `${Date.now()}`,
      sender: "user",
      content,
      timestamp: now.toISOString(),
      displayTime: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
  };

  const focusMainInput = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        inputRef.current?.focus?.();
      }, 80);
    });
  };

  // 🔁 Group messages with date label and end chat label
  const groupedMessages = [];
  let lastDate = null;
  messages.forEach((msg, index) => {
    const label = getDateLabel(msg.timestamp);
    if (label !== lastDate) {
      groupedMessages.push({
        id: `label-${label}-${index}`,
        type: "label",
        label,
      });
      lastDate = label;
    }
    groupedMessages.push({ ...msg, type: "message" });
  });

  if (chatEnded && messages.length > 0) {
    groupedMessages.push({
      id: "end-chat-label",
      type: "endChat",
    });
  }

  // 🔽 Scroll to bottom on new message or keyboard show
  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [groupedMessages.length]);

  useEffect(() => {
    const listener = Keyboard.addListener("keyboardDidShow", scrollToBottom);
    return () => listener.remove();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 30}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ChatHeader
              navigation={navigation}
              onEndChat={() => setShowEndChatModal(true)}
            />

            <FlatList
              ref={flatListRef}
              data={groupedMessages}
              keyExtractor={(item, index) => item.id + "-" + index}
              renderItem={({ item }) => {
                if (item.type === "label") return <DateLabel label={item.label} />;
                if (item.type === "endChat") return <EndChatLabel />;
                return <MessageItem item={item} />;
              }}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 10,
                paddingBottom: 40,
                flexGrow: 1,
                justifyContent: "flex-end",
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onContentSizeChange={() => scrollToBottom()}
            />

            {messages.length === 0 && !selectedOption && (
              <InitialOptions onSelect={handleOptionSelect} />
            )}

            <InputBar
              ref={inputRef}
              inputMessage={inputMessage}
              onChangeText={setInputMessage}
              onSend={() => sendMessage()}
              onShowCannedMessages={() => modalizeRef.current?.open()}
            />

            <CannedMessagesModal
              ref={modalizeRef}
              cannedMessages={cannedMessages}
              onSelect={(msg) => {
                setInputMessage(msg);
                modalizeRef.current?.close();
              }}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              onFocusMainInput={focusMainInput}
            />

            <EndChatModal
              visible={showEndChatModal}
              onCancel={() => setShowEndChatModal(false)}
              onConfirm={() => {
                setShowEndChatModal(false);
                setChatEnded(true);
                setSelectedOption(null);
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Messages;
