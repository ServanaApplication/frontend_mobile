import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
    const [phoneNumber, setPhoneNumber] = useState("");

  return (

    <View>
      <Text>ForgotPassword</Text>
    </View>
  )
}

export default ForgotPassword

