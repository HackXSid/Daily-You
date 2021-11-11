import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from './dashboard.screen';

const Tab = createBottomTabNavigator();

const Temp = () => <Text>Hi</Text>;

const DailyYouScreen = ({ logout }) => {
  return (
    <View style={{ height: '100%' }}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Dashboard">
          <Tab.Screen
            name="Dashboard"
            options={{
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}>
            {props => <Dashboard {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Dose Calendar"
            options={{
              tabBarLabel: 'Dose Calendar',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar" color={color} size={size} />
              ),
            }}>
            {props => <Temp {...props} aadhar />}
          </Tab.Screen>
          <Tab.Screen
            name="Prescriptions"
            options={{
              tabBarLabel: 'Prescriptions',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
              ),
            }}>
            {props => <Temp {...props} logout={logout} />}
          </Tab.Screen>
          <Tab.Screen
            name="Settings"
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
            }}>
            {props => <Temp {...props} logout={logout} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export { DailyYouScreen };
