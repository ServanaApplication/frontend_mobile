import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function Test() {
  const client = useSelector((state) => state.client.data);
  console.log("Client data from Redux store:", client);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Test Screen</Text>
        {client ? (
          <>
          <Text>Client ID: {client.id}</Text>
            {/* <Text>
              Name: {client.prof_id.prof_firstname}{" "}
              {client.prof_id.prof_middlename} {client.prof_id.prof_lastname}
            </Text>
            <Text>
              Phone: +{client.client_country_code} {client.client_number}
            </Text>
            <Text>Address: {client.prof_id.prof_address}</Text>
            <Text>Region: {client.prof_id.prof_region_info}</Text>
            <Text>Postal: {client.prof_id.prof_postal_code}</Text> */}
          </>
        ) : (
          <Text>Loading client...</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
};
