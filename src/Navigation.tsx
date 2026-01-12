import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import WalletScreen from "./screens/Wallet";
import OpportunitiesScreen from "./screens/Opportunities";
import OpportunityDetails from "./screens/OpportunityDetails";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OpportunitiesStack() {
  return (
    <Stack.Navigator>
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

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "wallet";
            if (route.name === "Wallet") iconName = "wallet";
            if (route.name === "Opportunities")
              iconName = "lightbulb-on-outline";
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen
          name="Opportunities"
          component={OpportunitiesStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
