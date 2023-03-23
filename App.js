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
import Home from './src/Home';
// import Login from './src/Login';
import Message from './src/Message';
import SignUp from './src/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Register from './Screens/Register'
import Login from './Screens/Login';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Redux/Store';
import Auth from './Screens/Auth';
import { setUser } from './Redux/Reducers';
import AuthStack from './Navigation/AuthStack'
import AppStack from './Navigation/AppStack'
import User from './Redux/Reducers';
import Modal from './Screens/Components/Modal';

const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;

const Stack = createNativeStackNavigator();

export default function App() {

  const [loginChk, setloginChk] = useState(true);

  const dispatch = useDispatch()
  const {User,login} = useSelector(state => state);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let data = await Auth.getAccount();
    if (data != null) {
      dispatch(setUser(data));
      // console.log("userrrr",getData)
     
      setloginChk(false)
    } else {
      setloginChk(false)
    }
  };
  if (loginChk) {
    return null;
  }


  return (

    
    <NavigationContainer>
      <Stack.Navigator>
{! login ? 
     
        <Stack.Screen
          options={{headerShown: false}}
          name="AuthStack"
          component={AuthStack}
        /> 
        :

     <Stack.Screen 
         options={{headerShown: false}} name="AppStack" component={AppStack} />
          } 
         <Stack.Screen options={{headerShown:false}} name='Modal' component={Modal}/>
        
     
       
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({});


