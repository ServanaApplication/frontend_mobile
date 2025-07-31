import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "../styles/messageStyles";
import BASE_URL from "../apiConfig";

const InitialOptions = ({ onSelect, navigation }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/department/active`);
        setDepartments(res.data.departments || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

 const handleDepartmentSelect = async (dept) => {
  if (buttonDisabled) return;

  setSelectedDeptId(dept.dept_id);
  setButtonDisabled(true); // Prevent further taps

  try {
    const token = await AsyncStorage.getItem("token");

    const groupRes = await axios.get(`${BASE_URL}/messages/latest`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const groupId = groupRes.data.chat_group_id;
    if (!groupId) {
      Alert.alert("No chat group found.");
      setButtonDisabled(false);
      return;
    }

    const numericGroupId = Number(groupId);

    await axios.patch(
      `${BASE_URL}/clientAccount/chat_group/${numericGroupId}/set-department`,
      { dept_id: dept.dept_id },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await AsyncStorage.setItem("chat_group_id", String(numericGroupId));

    await axios.post(
      `${BASE_URL}/messages`,
      {
        chat_body: dept.dept_name,
        chat_group_id: numericGroupId,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    onSelect(dept);
    navigation.navigate("Messages");

  } catch (err) {
    console.error("❌ Failed to assign department:", err.response?.data || err.message);
    Alert.alert("Something went wrong assigning the department.");
    setButtonDisabled(false); // Allow retry
  }
};


  if (loading) {
    return <ActivityIndicator size="small" color="#999" />;
  }

  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
      <Text style={styles.promptText}>
        To connect you with the right support team...
      </Text>
      {departments.map((dept) => (
        <TouchableOpacity
          key={dept.dept_id}
          style={[
          styles.optionButton,
          selectedDeptId === dept.dept_id && { opacity: 0.6 },
          ]}
          onPress={() => handleDepartmentSelect(dept)}
          disabled={buttonDisabled}
        >
          <Text style={styles.optionText}>{dept.dept_name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default InitialOptions;
