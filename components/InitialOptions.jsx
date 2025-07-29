import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../styles/messageStyles";
import BASE_URL from "../apiConfig.js"

const InitialOptions = ({ onSelect }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${BASE_URL}/department/active`);
        const data = await response.json();
           console.log("Fetched data:", data); // 👀 Log the response
        setDepartments(data.departments || []);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <ActivityIndicator size="small" color="#999" />;

  return (
    <View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
      <Text style={styles.promptText}>
        To connect you with the right support team...
      </Text>
      {departments.map((dept) => (
        <TouchableOpacity
          key={dept.dept_id}
          style={styles.optionButton}
          onPress={() => onSelect(dept.dept_name)}
        >
          <Text style={styles.optionText}>{dept.dept_name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default InitialOptions;
