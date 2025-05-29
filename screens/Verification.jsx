import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";

const Verification = () => {
  const navigation = useNavigation();
  const [verificationCode, setVerificationCode] = useState("");

  const handleVerify = () => {
    if (!/^\d{6}$/.test(verificationCode)) {
      Alert.alert("Error", "Please enter a 6-digit verification code");
    } else {
      Alert.alert("Success", "Code verified successfully!");
      navigation.navigate("ResetPassword");
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#1F1B24", paddingHorizontal: 16 }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Feather name="arrow-left" size={25} color="#848287" />
                <Text style={{ color: "#fff", fontSize: 20, marginLeft: 8 }}>
                  Verification
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={{ marginTop: 60 }}>
              {/* Verification Code Input */}
              <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text style={styles.text}>
                  Please enter the 6-digit code sent to your phone
                </Text>
              </View>

              <View style={styles.passwordContainer}>
                <TextInput
                  value={verificationCode}
                  onChangeText={(text) => {
                    // Remove non-numeric characters and limit to 6 digits
                    const numericText = text.replace(/[^0-9]/g, "").slice(0, 6);
                    setVerificationCode(numericText);
                  }}
                  keyboardType="numeric"
                  placeholder="Enter 6-digit code"
                  placeholderTextColor="#848287"
                  style={styles.code}
                />
              </View>
              {/* Resend Code Button */}
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Code Resent",
                    "A new code has been sent to your phone"
                  )
                }
                style={{ marginTop: 20 }}
              >
                <Text style={[styles.signup, { color: "#8B5CF6" }]}>
                  Resend Code
                </Text>
              </TouchableOpacity>
              {/* Verify Button */}
              <TouchableOpacity
                onPress={handleVerify}
                style={{
                  backgroundColor: "#6237A0",
                  borderRadius: 10,
                  padding: 16,
                  marginTop: 20,
                }}
              >
                <Text style={styles.signup}>Verify</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Verification;

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: "#444148",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  code: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  signup: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});
