import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import {useDispatch} from 'react-redux';
import Auth from './Auth';
import {setUser} from '../Redux/Reducers';
import {useNavigation} from '@react-navigation/native';

// import auth from '@react-native-firebase/auth'

const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;

export default function Login({}) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  // const login =()=>{
  //     auth().signInWithEmailAndPassword(email,password).then((res)=>{
  //       console.log("response",res)
  //       res.additionalUserInfo.isNewUser==false ?navigation.navigate("Home")
  //       : Alert.alert("You have not signed in yet")

  //     })
  //     .catch((error)=>{
  //       console.log("error",error)
  //       Alert.alert('Both fields are necessary')
  //     })
  //   }
  const login = () => {
    database()
      .ref('/users/')
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() == null) {
          Alert.alert('Invalid EmailId');
          return false;
        }
        let userData = Object.values(snapshot.val())[0];
        if (userData.password != password) {
          Alert.alert('Incorrect Password!!');
        } else {
          navigation.navigate('AppStack');
        }
        console.log('User data: ', snapshot.val());
        dispatch(setUser(userData));
        Auth.setAccount(userData);
        userData.password == password && navigation.navigate('AppStack');
      });
  };
  return (
    <ScrollView>
      <ImageBackground
        source={require('../src/Assets/chat1.jpg')}
        style={styles.background}>
        <Image
          style={{width: 200, height: 260}}
          source={require('../src/Assets/lock.png')}></Image>
        <KeyboardAvoidingView style={{justifyContent: 'center'}}>
          <TextInput
            style={styles.textInput}
            placeholder="Email address/Phone no."
            placeholderTextColor={'grey'}
            scrollEnabled={true}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={'grey'}
            value={password}
            onChangeText={setPassword}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            Login
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#281E5D',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'grey',
    padding: 10,
    opacity: 0.8,
    width: width - 60,
    height: '18%',
    borderRadius: 8,
    // padding:20,
    backgroundColor: '#fff',
    margin: 8,
  },
  button: {
    width: width - 60,
    height: '7%',
    borderColor: 'black',
    backgroundColor: '#73C2FB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
