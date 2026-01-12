import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import WalletScreen from "./screens/Wallet";
import OpportunitiesScreen from "./screens/Opportunities";
import OpportunityDetails from "./screens/OpportunityDetails";
import HomeScreen from "./screens/Home";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "./theme";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const stackHeaderOptions: StackNavigationOptions = {
  headerStyle: { backgroundColor: theme.primary },
  headerTintColor: theme.surface,
  headerTitleAlign: "center",
  headerTitleStyle: { fontWeight: "700", fontSize: 20 },
};

function OpportunitiesStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen
        name="OpportunitiesList"
        component={OpportunitiesScreen}
        options={{ title: "Opportunities" }}
      />
      <Stack.Screen
        name="OpportunityDetails"
        component={OpportunityDetails}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="OpportunityDetails"
        component={OpportunityDetails}
        options={{ title: "Details" }}
      />
    </Stack.Navigator>
  );
}

function WalletStack() {
  return (
    <Stack.Navigator screenOptions={stackHeaderOptions}>
      <Stack.Screen
        name="WalletMain"
        component={WalletScreen}
        options={{ title: "Wallet" }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarIcon: ({ color, size }) => {
            let iconName = "home";

            if (route.name === "Home") iconName = "home";
            if (route.name === "Wallet") iconName = "wallet";
            if (route.name === "Opportunities")
              iconName = "lightbulb-on-outline";

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Wallet"
          component={WalletStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Opportunities"
          component={OpportunitiesStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
