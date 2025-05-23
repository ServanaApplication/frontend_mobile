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
import CountryPicker from "react-native-country-picker-modal";
import Feather from "react-native-vector-icons/Feather";

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("US");
  const [country, setCountry] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
        hidden={false}
      />
      <SafeAreaView className="flex-1 bg-[#1F1B24]">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios ? 100 : 0"}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 items-center justify-center py-15 px-4">
              <Image
                source={require("../assets/icon.png")}
                resizeMode="contain"
                style={{
                  width: 250,
                  height: 250,
                  maxWidth: "100%",
                  maxHeight: 250,
                }}
              />
              <Text className="text-white text-2xl font-bold mt-5">
                Forgot Password
              </Text>
              <Text className="text-gray-400 text-base mt-2">
                Enter your phone number to reset your password
              </Text>
              <View className="w-full mt-10 flex-row items-center bg-[#2B2B2B] rounded-lg px-3 mb-10">
                {/* Country Picker */}
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
                  <Text className="text-white text-base ml- 1">
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
                  onChangeText={(text) => setPhoneNumber(text)}
                  className="bg-[#2B2B2B] text-white flex-1 py-4"
                  keyboardType="phone-pad"
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  if (phoneNumber.trim()) {
                    Alert.alert("Success", "Code is successfully sent");
                  } else {
                    Alert.alert("Error", "Please enter a valid phone number");
                  }
                }}
                className="bg-[#6237A0] w-full rounded-lg p-4 mt-5"
              >
                <Text className="text-white text-center text-base font-bold">
                  Send Code
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ForgotPassword;
