import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../Redux/Reducers';
import {User} from '../Redux/Combine';
import Auth from '../Screens/Auth';
import {ListItem, Avatar, SearchBar} from 'react-native-elements';
import database from '@react-native-firebase/database';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {fonts} from 'react-native-elements/dist/config';
import uuid from 'react-native-uuid';
import Modal from '../Screens/Components/Modal'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';



const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;

export default function Home({navigation}) {
  // const {userData} = useSelector(state => state.User);
  const {userData} = useSelector(state => state);

  const [getData, setgetData] = useState({});
  const [allUser, setallUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [chatLists, setchatList] = useState([]);
  const [modalVisible,setModalVisible] = useState(false)
  const [imageUri,setImageUri] = useState()

  useEffect(() => {
    getAllUsers();
    chatList();
  }, []);

  const getAllUsers = () => {
    database()
      .ref('users/')
      .once('value')
      .then(snapshot => {
        console.log(' all User data: ', Object.values(snapshot.val()));
        setallUsers(
          Object.values(snapshot.val()).filter(item => item.id != userData.id),
        );
      });
  };

  // const createChat = data => {
  //   let roomId = uuid.v4();
  //   let mydata = {
  //     roomId,
  //     name: userData.name,
  //     image: userData.image,
  //     email: userData.email,
  //     lastMessage: '',
  //   };
  //   database()
  //     .ref('/chatList/' + data.id + '/' + userData.id)
  //     .update(mydata)
  //     .then(() => console.log('Data updated.'));

  //   delete data['password'];
  //   data.lastMessage = '';
  //   data.roomId;

  //   database()
  //     .ref('/chatList/' + userData.id + '/' + data.id)
  //     .update(data)
  //     .then(() => console.log('Data updated.'));

  //   // navigation.navigate('Message');
  // };

  // const searchUser = (val)=>{
  //   setallUsers(val)
  // }
  const chatList = () => {
    database()
      .ref('/chatList/' + userData.id)
      .on('value', snapshot => {
        console.log('User data: ', Object.values(snapshot.val()));
       if( Object.values(snapshot.val()) != null){ 
        setchatList(Object.values(snapshot.val()))
      };
      });
  };
 
  const [checked, setChecked] = useState(0);
  
  const openCamera = async()=>{
    let options ={
      storagePermission:{
        path:'images',
        mediaType:'photo'
      },
      includeBase64:true,
    }
    launchCamera(options,response=>{
      console.log("ressssss=>",response);
      if(response.didCancel){
        console.log("User cancelled image Picker");
      }else if(response.error){
        console.log("errorrr",response.error);
      }else if(response.customButton){
        console.log("custombutton",response.customButton)
      }else{
        // const source={uri: }
       console.log("spporkd",source);
        setImageUri(source)
      }
    });
    // let options ={
    //   saveToPhotos:true,
    //   mediaType:'photo'
    //  };
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.CAMERA,
    // )
    // if(granted===PermissionsAndroid.RESULTS.GRANTED){
    //   const result = await launchCamera(options);
    //   console.log(result)
    //   setImageUri(result.assets[0].uri)
    // }
  }
  return (
    <View style={[{position: 'relative',flex:1}]}>
    {modalVisible && 
              <View style={{zIndex:100, position:'absolute', flex:1,backgroundColor: "rgba(0,0,0,0.3)", width:'100%'}}>
                <Modal setModalVisible={setModalVisible} />
              </View>
              }
      <View style={styles.head}>
        <View
          style={{
            flexDirection: 'row',
            top: 6,
            justifyContent: 'space-between',
          }}>
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
             
            <Avatar
            source={{
              uri: imageUri,
            }}
            rounded
            size={'medium'}
          />
            </TouchableOpacity>
         
          <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 27}}>
           ChitChat
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Icon name="search" size={35}></Icon>
          </TouchableOpacity>
<TouchableOpacity onPress={openCamera}>
<Icon name="camera-alt" size={35} />
</TouchableOpacity>
         
        </View>
        <View
          style={{
            flexDirection: 'row',
            top: 15,
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() => {
              setChecked(0);
            }}
            style={[
              styles.button,
              {backgroundColor: checked === 0 ? '#000' : '#73C2FB'},
            ]}>
            <Text
              style={[
                styles.text,
                {
                  color: checked === 0 ? 'white' : 'grey',
                  paddingVertical: 5,
                },
              ]}>
              Chat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: checked === 1 ? '#000' : '#73C2FB'},
            ]}
            onPress={() => {
              setChecked(1);
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: checked === 1 ? 'white' : 'grey',
                },
              ]}>
              Status
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: checked === 2 ? '#000' : '#73C2FB'},
            ]}
            onPress={() => {
              setChecked(2);
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: checked === 2 ? 'white' : 'grey',
                  paddingVertical: 5,
                },
              ]}>
              Call
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={chatLists}
        renderItem={({item}) => {
          return (
            <View style={styles.listStyle}>
              <TouchableOpacity
                style={{top: 10, flexDirection: 'row', left: 10}}
                onPress={() =>{ navigation.navigate('Message', {data:item})}}>
                <Avatar source={{uri: item.image}} rounded size={'medium'} />
                <Text style={{fontSize: 18, fontWeight: '800', color: 'black'}}>
                  {item.name}
                </Text>
              </TouchableOpacity>
    <View style={{width:"70%",marginLeft:70}}>
              <Text
              // lineBreakMode='middle'
              numberOfLines={1}
                style={{
                  fontSize: 14,
                  fontWeight: '200',
                  color: 'black',
                  // alignSelf: 'center',
                  // right: 90,
                  bottom: 10,
                
                }}>
                {item.lastMessage}
              </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#281E5D',
    height: height,
    width: width,
  },
  head: {
    height: '18%',
    backgroundColor: '#73C2FB',
    justifyContent: 'space-around',
  },
  button: {
    width: '20%',
    height: '70%',
    borderColor: 'black',
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  listStyle: {
    height: 80,
    width: '100%',
    elevation: 40,
    marginTop: 4,
    backgroundColor: 'white',

    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    // width:'90%',
    height: '90%',
  },
  input1: {
    fontSize: 16,
    color: 'white',
  },
});
