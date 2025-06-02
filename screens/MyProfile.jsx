import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MyProfile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Profile</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Picture and Phone Number */}
        <View style={styles.centerRowContainer}>
          <View style={styles.profileRow}>
            <Image
              source={require('../assets/userblank.jpg')}
              style={styles.profileImage}
            />
            <Text style={styles.phoneNumber}>+1 234 567 8901</Text>
          </View>
        </View>

        {/* Profile Details */}
        <View style={styles.detailsContainer}>
          <ProfileItem label="Name" value="John Doe" />
          <ProfileItem label="Email" value="john.doe@example.com" />
          <ProfileItem label="Birthdate" value="January 1, 1990" />

          {/* Street Name etc */}
          <ProfileItem
            label="Street Name, Building, House No."
            value="123 Sunshine St., Bldg A, Unit 12"
          />

          {/* Combined Region, Province, City, Barangay */}
          <ProfileItem
            label="Region, Province, City, Barangay"
            value="Region IV-A, Batangas, Lipa City, Sabang"
          />

          <ProfileItem label="Postal Code" value="4217" />
        </View>
      </ScrollView>
    </View>
  );
}

function ProfileItem({ label, value }) {
  return (
    <View style={styles.profileItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  editButton: {
    fontSize: 16,
    color: '#8a2be2', // purple
    fontWeight: '500',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  centerRowContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  profileItem: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
