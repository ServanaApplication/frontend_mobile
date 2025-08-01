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
import axios from "axios";

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

import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../apiConfig";

const Messages = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEndChatModal, setShowEndChatModal] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [chatGroupId, setChatGroupId] = useState(null);
  const [agentInfo, setAgentInfo] = useState({ name: "", avatar: "" });

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

  useEffect(() => {
    const loadChatGroupId = async () => {
      const storedGroupId = await AsyncStorage.getItem("chat_group_id");
      if (storedGroupId) {
        setChatGroupId(storedGroupId);
      } else {
        console.warn("No chat_group_id found in AsyncStorage.");
      }
    };
    loadChatGroupId();
  }, []);

  useEffect(() => {
    if (chatGroupId) {
      fetchMessages();
    }
  }, [chatGroupId]);


  useEffect(() => {
  if (chatGroupId) {

    const fetchAgentInfo = async () => {
      try {
        console.log("📡 AGENT FETCH URL:", `${BASE_URL}/agent/${chatGroupId}`);
        console.log("💬 ChatGroupID:", chatGroupId);

        const response = await axios.get(`${BASE_URL}/agent/${chatGroupId}`);
       console.log("Fetching agent from:", `/agent/${chatGroupId}`);
        setAgentInfo(response.data); // includes `name` and `image`
       

      } catch (error) {
        console.error("❌ Failed to fetch agent info:", error);
      }
    };

    fetchAgentInfo();
  }
}, [chatGroupId]);


  const fetchMessages = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/messages/group/${chatGroupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const loadedMessages = response.data.map((msg) => ({
        id: msg.chat_id.toString(),
        sender: msg.client_id ? "user" : "agent",
        content: msg.chat_body,
        timestamp: msg.chat_created_at,
        displayTime: new Date(msg.chat_created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setMessages(loadedMessages);
    } catch (err) {
      console.error("Fetch messages failed:", err.message);
    }
  };

  const sendMessage = async (text = null, groupIdOverride = null) => {
    const content = (text ?? inputMessage).trim();
    if (!content) {
      console.warn("Message content is empty.");
      return;
    }
    const finalGroupId = groupIdOverride ?? chatGroupId;
    if (!finalGroupId) {
      console.warn("Chat Group ID is missing.");
      return;
    }
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
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/messages`,
        {
          chat_body: content,
          chat_group_id: finalGroupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to send message:", error.message);
    }
  };

  const focusMainInput = () => {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        inputRef.current?.focus?.();
      }, 80);
    });
  };

  const handleOptionSelect = async (dept) => {
    setSelectedOption(dept.dept_name);
    setChatEnded(false);
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/messages/latest`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const groupId = res.data.chat_group_id;
      if (!groupId) {
        console.warn("No chat_group_id found.");
        return;
      }
      await AsyncStorage.setItem("chat_group_id", groupId.toString());
      setChatGroupId(groupId);
      await axios.patch(
        `${BASE_URL}/clientAccount/chat_group/${groupId}/set-department`,
        { dept_id: dept.dept_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await sendMessage(dept.dept_name, groupId);
    } catch (error) {
      console.error("Error assigning department or fetching chat group:", error.message);
    }
  };

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
    groupedMessages.push({ id: "end-chat-label", type: "endChat" });
  }

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
                return <MessageItem item={item} agentInfo={agentInfo} />;
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
              <InitialOptions onSelect={handleOptionSelect} navigation={navigation} />
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