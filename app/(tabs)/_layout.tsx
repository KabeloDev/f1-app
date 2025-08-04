import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '.';
import CarDataScreen from './car-data';
import DriversScreen from './drivers';
import MeetingsScreen from './meetings';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].icon,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tab.Screen
        name="index"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />

      <Tab.Screen
        name="drivers"
        component={DriversScreen}
        options={{
          title: 'Drivers',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="body" color={color} />,
        }}
      />

      <Tab.Screen
        name="car-data"
        component={CarDataScreen}
        options={{
          title: 'Car Data',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="car-sport" color={color} />,
        }}
      />

      <Tab.Screen
        name="meetings"
        component={MeetingsScreen}
        options={{
          title: 'Meetings',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="earth" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
