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
// import { LogBox } from 'react-native';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import RNPickerSelect from "react-native-picker-select";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { getExampleNumber } from 'libphonenumber-js';

// Ignore specific warning about defaultProps in react-native-country-picker-modal
// LogBox.ignoreLogs([
//   'Support for defaultProps will be removed',
// ]);

const countryOptions = [
  { label: "US +1", value: { code: "US", callingCode: "1"} },
  {label: "PH +63", value: { code: "PH", callingCode: "26"} },
  { label: "GB +44", value: { code: "GB", callingCode: "44"} },
  { label: "CA +1", value: { code: "CA", callingCode: "1"} },
  { label: "AU +61", value: { code: "AU", callingCode: "61"} },
  { label: "NZ +64", value: { code: "NZ", callingCode: "64"} },
  { label: "IN +91", value: { code: "IN", callingCode: "91"} },
  { label: "SG +65", value: { code: "SG", callingCode: "65"} },
  { label: "MY +60", value: { code: "MY", callingCode: "60"} },
  { label: "ID +62", value: { code: "ID", callingCode: "62"} },
  { label: "TH +66", value: { code: "TH", callingCode: "66"} },
]

const Login = () => {
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState({code: "PH", callingCode: "63"});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
  const fullNumber = `+${selectedCountry.callingCode}${phoneNumber}`;
  const parsed = parsePhoneNumberFromString(fullNumber);

  // Validate phone number and password
  if (!phoneNumber.trim() || !password.trim()) {
    Alert.alert("Error", "Please fill in both fields");
    return;
  }

  if (!parsed?.isValid()) {
    Alert.alert("Error", "Invalid phone number for selected country");
    return;
  }

  Alert.alert("Success", `Login successful for ${parsed.number}`);
};

const handlePhoneChange = (text) => {
  const digitsOnly = text.replace(/\D/g, "");
  
  // Use libphonenumber-js to check possible length
  try {
   const example = getExampleNumber(selectedCountry.code, 'mobile');
    const maxLength = example?.nationalNumber?.length || 10;
    if (digitsOnly.length <= maxLength) {
      setPhoneNumber(digitsOnly);
    }
  } catch (error) {
    // fallback if parsing fails
    if (digitsOnly.length <= 15) {
      setPhoneNumber(digitsOnly);
    }
  }
};


  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="#1F1B24"
        barStyle="light-content"
        translucent={true}
        hidden={false}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: "#1F1B24"}}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 items-center justify-center py-15 px-4 bg-[#1F1B24]">
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
              <Text className="font-medium text-6xl text-[#6237A0] mb-12">
                servana
              </Text>

              <View className="w-full max-w-md mt-5">
                {/* Phone Number Input with Picker */}
                <View className="flex-row items-center bg-[#444148] border-2 border-[#444148] rounded-lg h-12 mb-7 px-3">
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: 6,
                    }}
                  >
                    <RNPickerSelect
                    onValueChange={(value) => setSelectedCountry(value)}
                    items={countryOptions}
                    value={selectedCountry}
                    useNativeAndroidPickerStyle={false}
                     style={{
                        inputAndroid: {
                          color: "#fff",
                          fontSize: 16,
                        },
                        inputIOS: {
                          color: "#fff",
                          fontSize: 16,
                        },
                        iconContainer: {
                          top: 10,
                          right: 12,
                        },
                      }}
                     
                    />
                    <Text
                      style={{ color: "#fff", marginRight: 5, fontSize: 16 }}
                    >
                      +{country?.callingCode?.[0] || "1"}
                    </Text>
                    <TouchableOpacity onPress={() => setShowPicker(true)}>
                      <Feather name="chevron-down" size={16} color="#848287" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: 1,
                      height: "70%",
                      backgroundColor: "#5E5C63",
                      marginRight: 8,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <TextInput
                      value={phoneNumber}
                      onChangeText={handlePhoneChange}
                      placeholder="Phone Number"
                      placeholderTextColor="#848287"
                      keyboardType="phone-pad"
                      style={{
                        color: "#fff",
                        fontSize: 16,
                        height: "100%",
                        paddingHorizontal: 15,
                      }}
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View className="relative mb-3">
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
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secureText}
                    placeholder="Password"
                    placeholderTextColor="#848287"
                    className="bg-[#444148] border-2 border-[#444148] rounded-lg h-12 pl-12 text-white text-lg"
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
                
                <View style={{ alignItems: "flex-end"}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      textDecorationLine: "underline",
                      marginBottom: 12,
                      fontWeight: "600",
                    }}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                  </View>

                {/* Login Button */}
                <View className="mt-12">
                <TouchableOpacity
                  className="w-full max-w-md bg-[#6237A0] rounded-2xl py-3 items-center"
                  activeOpacity={0.8}
                  onPress={handleLogin}
                >
                  <Text className="text-white font-semibold text-lg">
                    Login
                  </Text>
                </TouchableOpacity>
                </View>

                {/* Sign Up Prompt */}
                <View className="flex-row justify-center mt-5">
                  <Text className="text-[#ffffff]">Don't have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        marginLeft: 6,
                        textDecorationLine: "underline",
                        fontWeight: "600",
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Login;

const styles = StyleSheet.create({});
