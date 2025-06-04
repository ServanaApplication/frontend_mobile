import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function EditProfile() {
  const navigation = useNavigation();
  const [birthdate, setBirthdate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSave = () => {
    navigation.goBack();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formatted = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    setBirthdate(formatted);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Edit Profile</Text>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Image and Edit Button */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/userblank.jpg')}
            style={styles.profileImage}
          />
          <TouchableOpacity>
            <Text style={styles.editPhotoText}>Edit Profile Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Inputs */}
        <View style={styles.formContainer}>
          <InputField label="Name" placeholder="Enter your name" />
          <InputField label="Email" placeholder="Enter your email" />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Birthdate</Text>
            <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
              <Text style={styles.dateText}>
                {birthdate ? birthdate : 'Select your birthdate'}
              </Text>
              <Feather name="calendar" size={20} color="#6237A0" />
            </TouchableOpacity>
          </View>

          <InputField label="Street Name, Building, House No." placeholder="Enter street info" />
          <InputField label="Region, Province, City, Barangay" placeholder="Enter location info" />
          <InputField label="Postal Code" placeholder="Enter postal code" />
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

function InputField({ label, placeholder }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  saveText: {
    fontSize: 16,
    color: '#8a2be2',
    fontWeight: '500',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  imageContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  editPhotoText: {
    color: '#8a2be2',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  formContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    fontSize: 16,
  },
  dateInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

