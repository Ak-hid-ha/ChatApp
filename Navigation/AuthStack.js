import React, { useEffect, useState } from 'react';
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

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Register from '../Screens/Register';
import Login from '../Screens/Login';


const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;

const Stack = createNativeStackNavigator();

const  AuthStack=() =>{
    return(
      
            <Stack.Navigator initialRouteName='Register' >
            <Stack.Screen
          options={{headerShown: false}}
          name="Register"
          component={Register}
        /> 
     <Stack.Screen
         options={{headerShown: false}} name="Login" component={Login} />
            </Stack.Navigator>
      
    )
}
export default AuthStack;