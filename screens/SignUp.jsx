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
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { parsePhoneNumberFromString, getExampleNumber } from "libphonenumber-js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, setLoading, setError } from "../slices/userSlice";
import BASE_URL from "../apiConfig";

// Country Data (same as Login screen)
const rawCountries = [
  { label: "US +1", code: "US", callingCode: "1" },
  { label: "PH +63", code: "PH", callingCode: "63" },
  { label: "GB +44", code: "GB", callingCode: "44" },
  { label: "CA +1", code: "CA", callingCode: "1" },
  { label: "AU +61", code: "AU", callingCode: "61" },
  { label: "NZ +64", code: "NZ", callingCode: "64" },
  { label: "IN +91", code: "IN", callingCode: "91" },
  { label: "SG +65", code: "SG", callingCode: "65" },
  { label: "MY +60", code: "MY", callingCode: "60" },
  { label: "ID +62", code: "ID", callingCode: "62" },
  { label: "TH +66", code: "TH", callingCode: "66" },
  { label: "JP +81", code: "JP", callingCode: "81" },
  { label: "KR +82", code: "KR", callingCode: "82" },
  { label: "CN +86", code: "CN", callingCode: "86" },
  { label: "DE +49", code: "DE", callingCode: "49" },
  { label: "FR +33", code: "FR", callingCode: "33" },
  { label: "ES +34", code: "ES", callingCode: "34" },
  { label: "IT +39", code: "IT", callingCode: "39" },
  { label: "BR +55", code: "BR", callingCode: "55" },
  { label: "ZA +27", code: "ZA", callingCode: "27" },
  { label: "AE +971", code: "AE", callingCode: "971" },
  { label: "SA +966", code: "SA", callingCode: "966" },
  { label: "EG +20", code: "EG", callingCode: "20" },
  { label: "NG +234", code: "NG", callingCode: "234" },
];

const getFlagEmoji = (countryCode) => {
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
};



const SignUp = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState(rawCountries[0]); // default US
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);

  const handlePhoneChange = (text) => {
    const digitsOnly = text.replace(/\D/g, "");
    try {
      const example = getExampleNumber(selectedCountry.code, "mobile");
      const maxLength = example?.nationalNumber?.length || 10;
      if (digitsOnly.length <= maxLength) {
        setPhoneNumber(digitsOnly);
      }
    } catch {
      if (digitsOnly.length <= 15) {
        setPhoneNumber(digitsOnly);
      }
    }
  };

  const filteredCountries = rawCountries.filter((country) => {
    const query = searchQuery.toLowerCase();
    return (
      country.label.toLowerCase().includes(query) ||
      country.callingCode.includes(query) ||
      country.code.toLowerCase().includes(query)
    );
  });

  const handleSignUp = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    } else if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill out all password fields");
      return;
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    dispatch(setLoading(true));
    try {
       const now = new Date().toISOString();
    const client_country_code = selectedCountry.code;
    const client_number = phoneNumber;
    const client_password = password;
    const client_created_at = now;
     
    const response = await axios.post(`${BASE_URL}/clientAccount/registercl`, {
      client_country_code,
      client_number,
      client_password,
      client_created_at,
    });

   dispatch(setUser(response.data.client));
    dispatch(setError(null));
    Alert.alert("Success", "Signed up successfully!");
    navigation.navigate("SignUpVerification");
  } catch (error) {
    console.log('AXIOS ERROR:', error.response?.data, error);
    console.log(error);
    dispatch(setError(error.response?.data?.error || "Signup failed"));
    Alert.alert("Error", error.response?.data?.error || "Signup failed");
  } finally {
    dispatch(setLoading(false));
  }
};

  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1F1B24", paddingHorizontal: 16 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            {/* Header */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Feather name="arrow-left" size={25} color="#848287" />
                <Text style={{ color: "#fff", fontSize: 20, marginLeft: 8 }}>Register</Text>
              </TouchableOpacity>
            </View> 

            {/* Form */}
            <View style={{ marginTop: 60 }}>
              {/* Phone Input with Picker */}
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.countryPicker}
                >
                  <Text style={styles.flagText}>
                    {getFlagEmoji(selectedCountry.code)} +{selectedCountry.callingCode}
                  </Text>
                  <Feather name="chevron-down" size={18} color="#848287" />
                </TouchableOpacity>
                <View style={styles.separator} />
                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor="#848287"
                  keyboardType="phone-pad"
                  value={phoneNumber || ""}
                  onChangeText={handlePhoneChange}
                  style={styles.phoneInput}
                />
              </View>

              {/* Modal Picker */}
              <Modal visible={modalVisible} animationType="slide">
                <SafeAreaView style={styles.modalContainer}>
                  <View style={styles.searchBox}>
                    <Feather name="search" size={18} color="#888" style={{ marginRight: 8 }} />
                    <TextInput
                      placeholder="Search country, code or dial"
                      placeholderTextColor="#aaa"
                      style={styles.searchInput}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  </View>

                  <FlatList
                    data={filteredCountries}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.countryItem}
                        onPress={() => {
                          setSelectedCountry(item);
                          setModalVisible(false);
                          setSearchQuery("");
                        }}
                      >
                        <Text style={styles.countryText}>
                          {getFlagEmoji(item.code)} {item.label}
                        </Text>
                      </TouchableOpacity>
                    )} 
                  />
                </SafeAreaView>
              </Modal>

              {/* Password Input */}
              <View style={styles.passwordContainer}>
                <Feather name="lock" size={20} color="#848287" style={styles.lockIcon} />
                <TextInput
                  value={password || ""}
                  onChangeText={setPassword}
                  secureTextEntry={secureText}
                  placeholder="Password"
                  placeholderTextColor="#848287"
                  style={styles.passwordInput}
                />
                <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
                  <Feather name={secureText ? "eye-off" : "eye"} size={22} color="#848287" />
                </TouchableOpacity>
              </View>

              {/* Confirm Password */}
              <View style={styles.passwordContainer}>
                <Feather name="lock" size={20} color="#848287" style={styles.lockIcon} />
                <TextInput
                  value={confirmPassword || ""}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={secureConfirm}
                  placeholder="Confirm Password"
                  placeholderTextColor="#848287"
                  style={styles.passwordInput}
                />
                <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)} style={styles.eyeIcon}>
                  <Feather name={secureConfirm ? "eye-off" : "eye"} size={22} color="#848287" />
                </TouchableOpacity>
              </View>

              {/* Sign Up */}
              <TouchableOpacity
                onPress={handleSignUp}
                style={{
                  backgroundColor: "#6237A0", 
                  borderRadius: 10,
                  padding: 16,
                  marginTop: 38 ,
                }}
              >
                <Text style={styles.signup}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#444148",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  flagText: {
    color: "#fff",
    fontSize: 16,
    marginRight: 4,
  },
  separator: {
    width: 1,
    height: 18,
    backgroundColor: "#5E5C63",
    marginRight: 8,
  },
  phoneInput: {
    color: "#fff",
    flex: 1,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#1F1B24",
    padding: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  countryItem: {
    paddingVertical: 12,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  countryText: {
    color: "#fff",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    backgroundColor: "#444148",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  lockIcon: {
    marginRight: 10,
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  signup: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});