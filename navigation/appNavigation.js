import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import SignUp from "../screens/SignUp";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#1F1B24", // Set the background to transparent
  },
};

const AppNavigation = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { 
            backgroundColor: "#1F1B24" },
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Main" component={BottomNavbar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
