import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import Home from '../src/Home';
// import Login from './src/Login';
import Message from '../src/Message';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Provider, useDispatch, useSelector} from 'react-redux';
import Search from '../Screens/Search';

const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Message"
        component={Message}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Search"
        component={Search}
      />
    </Stack.Navigator>
  );
};
export default AppStack;
