import React, { useEffect } from 'react';
import { Text, View, NativeModules } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from './dashboard.screen';
import { Settings } from './settings.screen';
import { DoseCalendar } from './calendar.screen';
import { Prescription } from './prescription.screen';
import { useSelector } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import { BACKEND_URL } from '../constants';

const Tab = createBottomTabNavigator();
const SharedStorage = NativeModules.SharedStorage;

const DailyYouScreen = ({ logout }) => {
  const authReducer = useSelector(state => state.authenticationReducer);
  const { user, token } = authReducer;
  const sendFcmToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      const data = {
        token,
        userPhoneNumber: user.phone_number,
      };
      console.log(data);
      await axios.post(BACKEND_URL + 'register', data);
    } catch (err) {
      //Do nothing
      console.log(err.response.data);
      return;
    }
  };

  useEffect(() => {
    sendFcmToken();
  }, []);

  useEffect(() => {
    SharedStorage.set(
      JSON.stringify({ text: 'This is data from the React Native app' }),
    );
  }, []);

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
              title: 'Daily You',
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
            {props => <DoseCalendar {...props} />}
          </Tab.Screen>
          <Tab.Screen
            name="Prescriptions"
            options={{
              tabBarLabel: 'Prescriptions',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="list" color={color} size={size} />
              ),
            }}>
            {props => <Prescription {...props} logout={logout} />}
          </Tab.Screen>
          <Tab.Screen
            name="Settings"
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" color={color} size={size} />
              ),
            }}>
            {props => (
              <Settings {...props} logout={logout} user={user} token={token} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

export { DailyYouScreen };
