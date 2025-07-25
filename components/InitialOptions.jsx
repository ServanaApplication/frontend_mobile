import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/messageStyles";

const options = ["Billing", "Customer Service", "Sales"];

const InitialOptions = ({ onSelect }) => (
  <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
    <Text style={styles.promptText}>
      To connect you with the right support team...
    </Text>
    {options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.optionButton}
        onPress={() => onSelect(option)}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default InitialOptions;
