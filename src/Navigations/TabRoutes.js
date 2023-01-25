import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from '../constants/navigationStrings';
import * as Screens from '../Screens';
import imagePath from '../constants/imagePath';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={navigationStrings.CHATS}>
      <Tab.Screen
        name={navigationStrings.STATUS}
        component={Screens.Status}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
                source={imagePath.icStatus}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={navigationStrings.CALLS}
        component={Screens.Call}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
                source={imagePath.icCalls}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={navigationStrings.CAMERA}
        component={Screens.Camera}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
                source={imagePath.icCamera}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={navigationStrings.CHATS}
        component={Screens.Chats}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
                source={imagePath.icChats}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={navigationStrings.SETTINGS}
        component={Screens.Settings}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  height: 25,
                  width: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
                source={imagePath.icSettings}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
