import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStore } from '../store/useStore';
import { Text, View } from 'react-native';

// Screen Imports
import {
  HomeScreen,
  ShopScreen,
  BookingsScreen,
  ProfileScreen,
  LoginScreen,
  RegisterScreen,
  TechnicianDashboard
} from '../screens/Screens';

// TypeScript Types for Stack and Tab Navigators
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  ShopTab: undefined;
  BookingsTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  TechnicianHome: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

// Custom Tab Bar Icon Helper
const TabIcon = ({ label, focused }: { label: string; focused: boolean }) => {
  let emoji = '🏠';
  if (label === 'ShopTab') emoji = '📦';
  else if (label === 'BookingsTab') emoji = '☀️';
  else if (label === 'ProfileTab') emoji = '👤';

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>{emoji}</Text>
    </View>
  );
};

// Customer Tab Navigator
function CustomerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: any }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#0f172a', // Slate 900
        },
        headerTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#0f172a',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#22c55e', // Emerald 500
        tabBarInactiveTintColor: '#94a3b8', // Slate 400
        tabBarIcon: ({ focused }: { focused: boolean }) => <TabIcon label={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen} 
        options={{ title: 'Home', tabBarLabel: 'Home' }} 
      />
      <Tab.Screen 
        name="ShopTab" 
        component={ShopScreen} 
        options={{ title: 'Mushroom Shop', tabBarLabel: 'Shop' }} 
      />
      <Tab.Screen 
        name="BookingsTab" 
        component={BookingsScreen} 
        options={{ title: 'My Bookings', tabBarLabel: 'Bookings' }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{ title: 'My Profile', tabBarLabel: 'Profile' }} 
      />
    </Tab.Navigator>
  );
}

// Authentication Stack Screen Flow
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// Main App Navigation Bootstrapper
export default function AppNavigator() {
  const { isAuthenticated, user } = useStore();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          // 1) Unauthenticated Flow
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : user?.role === 'technician' ? (
          // 2) Specialized Technician Flow
          <RootStack.Screen name="TechnicianHome" component={TechnicianDashboard} />
        ) : (
          // 3) Standard Customer Flow
          <RootStack.Screen name="Main" component={CustomerTabs} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
