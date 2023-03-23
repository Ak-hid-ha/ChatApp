import React, {useRef, useState} from 'react';
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
  Animated,
  Easing,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import database from '@react-native-firebase/database';
import Lottie from 'lottie-react-native';
import uuid from 'react-native-uuid';

const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;

export default function Register({navigation}) {
  // let rotateValueHolder = new Animated.Value(0);
  const animationProgress = useRef(new Animated.Value(0));

  function startImageRotateFunction() {
    // rotateValueHolder.setValue(0);
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  }

  // const rotateData = rotateValueHolder.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // });

  const [displayName, setdisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [animation, setanimation] = useState(false);

  // const SignUpToFirebase=()=>{
  //     Signup(email,password).then((res)=>{
  //         console.log("resssssss",res);
  //         // var userID = Firebase.auth().currentUser.uid;
  //         // console.log(userID);
  //     }).catch((error)=>{
  //         alert(error)
  //     })
  // }
  // function register (){

  //     if(email != '' && password != ''){
  //       auth().createUserWithEmailAndPassword(email,password,displayName).then((res)=>{

  //         res.user.updateProfile({
  //           displayName:displayName
  //         })
  //         console.log("response",res)

  //         setTimeout(()=>{
  //           res?.additionalUserInfo?.isNewUser==true && navigation.navigate("Login")
  //       },8000,animation)

  //         setData(res.additionalUserInfo)

  //       })
  //       .catch((error)=>{
  //         console.log("error",error)
  //         Alert.alert('Both fields are necessary')
  //       })

  //     }else{
  //       Alert.alert("Both Fields are Mandatory")
  //     }

  //   }

  //  function Animation() {
  //     return (
  //       <Lottie source={require('./animation.json')} autoPlay loop /> 
  //     );
  //   }

  function register() {
    if (email == '' && password == '' && displayName == '') {
      Alert.alert('All fields are mandatory');
      return false;
    }
    let data = {
      id: uuid.v4(),
      name: displayName,
      email: email,
      password: password,
      image:
        'http://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png',
    };

    database()
      .ref('/users/' + data.id)
      .set(data)
      .then(() => {
        console.log('Registered Successfully!!'),
          navigation.navigate('Login'),
          setEmail(''),
          setPassword(''),
          setdisplayName('');
      });
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require('../src/Assets/chat1.jpg')}
        style={styles.background}>
        <Lottie
          style={{width: 180, height: 240}}
          source={require('../src/Assets/unlocking.json')}
          progress={animationProgress.current}
        />
        {/* <Animated.Image
          style={{
            width: 240,
            height: 240,
            // transform: [{rotate:rotateData}],
          }}
          source={require('../src/Assets/lock1.png')}
        /> */}
        <KeyboardAvoidingView style={{justifyContent: 'center'}}>
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            placeholderTextColor={'grey'}
            scrollEnabled={true}
            onChangeText={setdisplayName}
            value={displayName}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email Address"
            placeholderTextColor={'grey'}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={'grey'}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{fontSize: 18, color: 'blue'}}>Login?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            register();
            startImageRotateFunction();
            setanimation(true);
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
            SignUp
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
    height: height - 10,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'grey',
    padding: 10,
    opacity: 0.8,
    width: width - 60,
    height: '15%',
    borderRadius: 8,
    // padding:20,
    backgroundColor: '#fff',
    margin: 7,
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
