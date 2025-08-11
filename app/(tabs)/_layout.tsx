import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';
import HomeScreen from '.';
import DriversScreen from './drivers';
import MeetingsScreen from './meetings';
import ProfileScreen from './profile';

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

      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="person" color={color} />,
        }}
      />

    </Tab.Navigator>
  );
}
