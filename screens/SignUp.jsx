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
import CountryPicker from "react-native-country-picker-modal";
import Feather from "react-native-vector-icons/Feather";

const SignUp = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [country, setCountry] = useState({ callingCode: ["1"] });
  const [showPicker, setShowPicker] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
        hidden={false}
      />
      <SafeAreaView className="flex-1 bg-[#1F1B24] px-4">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header Back Button */}
            <View className="flex-row items-center mt-5">
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                className="flex-row items-center"
              >
                <Feather name="arrow-left" size={25} color="#848287" />
                <Text className="text-white text-xl ml-2">Register</Text>
              </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View className="flex items-center justify-center py-10">
              {/* Phone Number Input */}
            <View className="w-full flex-row items-center bg-[#444148] border-2 border-[#444148] rounded-lg px-3 mb-6 mt-16">
                <View className="flex-row items-center mr-3">
                  <CountryPicker
                    withFilter
                    withFlag
                    withCallingCode
                    withAlphaFilter
                    withEmoji
                    visible={showPicker}
                    onClose={() => setShowPicker(false)}
                    countryCode={countryCode}
                    onSelect={(selectedCountry) => {
                      setCountryCode(selectedCountry.cca2);
                      setCountry(selectedCountry);
                      setShowPicker(false);
                    }}
                    withModal
                    withCountryNameButton={false}
                    withCallingCodeButton={false}
                  />
                  <Text className="text-white text-base ml-1">
                    +{country?.callingCode[0] || "1"}
                  </Text>
                  <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <Feather
                      name="chevron-down"
                      size={16}
                      color="#848287"
                      style={{ marginLeft: 6 }}
                    />
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View
                  style={{
                    width: 1,
                    height: "70%",
                    backgroundColor: "#5E5C63",
                    marginRight: 8,
                  }}
                />

                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor="#7A7A7A"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  className="text-white flex-1 py-4"
                  keyboardType="phone-pad"
                />
              </View>

              {/* Password Input */}
              <View className="w-full flex-row items-center bg-[#444148] border-2 border-[#444148] rounded-lg px-3 mb-6">
                <Feather
                  name="lock"
                  size={20}
                  color="#848287"
                  style={{
                    position: "absolute",
                    top: Platform.OS === "web" ? 14 : 12,
                    left: 12,
                    zIndex: 1,
                    marginRight: 8,
                  }}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureText}
                  placeholder="Password"
                  placeholderTextColor="#848287"
                  className="text-white text-base flex-1 h-14"
                />
                <TouchableOpacity
                  onPress={() => setSecureText(!secureText)}
                  style={{
                    position: "absolute",
                    right: 19,
                    top: Platform.OS === "web" ? 14 : 12,
                  }}
                >
                  <Feather
                    name={secureText ? "eye-off" : "eye"}
                    size={22}
                    color="#848287"
                  />
                </TouchableOpacity>
              </View>

              {/* Confirm Password Input */}
              <View className="relative mb-10 w-full">
                <Feather
                  name="lock"
                  size={20}
                  color="#848287"
                  style={{
                    position: "absolute",
                    top: Platform.OS === "web" ? 14 : 12,
                    left: 12,
                    zIndex: 1,
                  }}
                />
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={secureConfirm}
                  placeholder="Confirm Password"
                  placeholderTextColor="#848287"
                  className="bg-[#444148] border-2 border-[#444148] rounded-lg h-12 pl-12 text-white text-lg"
                />
                <TouchableOpacity
                  onPress={() => setSecureConfirm(!secureConfirm)}
                  style={{
                    position: "absolute",
                    right: 19,
                    top: Platform.OS === "web" ? 14 : 12,
                  }}
                >
                  <Feather
                    name={secureConfirm ? "eye-off" : "eye"}
                    size={22}
                    color="#848287"
                  />
                </TouchableOpacity>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                onPress={() => {
                  if (!phoneNumber.trim()) {
                    Alert.alert("Error", "Please enter a valid phone number");
                  } else if (!password || !confirmPassword) {
                    Alert.alert("Error", "Please fill out all password fields");
                  } else if (password !== confirmPassword) {
                    Alert.alert("Error", "Passwords do not match");
                  } else {
                    Alert.alert("Success", "Signed up successfully!");
                  }
                }}
                className="bg-[#6237A0] w-full rounded-lg p-4"
              >
                <Text className="text-white text-center text-base font-bold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
