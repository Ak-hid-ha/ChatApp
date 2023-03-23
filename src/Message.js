import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TextInput,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;
import database from '@react-native-firebase/database';
import MsgComponent from '../Screens/Chat/Msgcomponent';
import Moment from 'react-moment';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function Message(props) {
const navigation = useNavigation()

  const [msg, setMsgs] = useState('');
    const [allChat, setallChats] = useState([]);
  const {userData} = useSelector(state => state);

  const {data} = props.route.params;
  console.log('propssssss', data);

  const msgvalid =  txt =>txt && txt.replace(/\s/g, "").length



 
  const sendMsg = () => {
    if (msg == '' || msgvalid(msg)==0) {
      return false;
    }
    let mydata = {
      roomId: data.roomId,
      message: msg,
      from: userData.id,
      to: data.id,
      sendTime: moment().format(),
      msgType: 'text',
    };
    const newReference = database()
      .ref('/messages/' + data.roomId)
      .push();

    // console.log('Auto generated key: ', newReference.key);
    mydata.id = newReference.key;

    newReference.set(mydata).then(() => {
      let chatlistUpdate = {
        lastMessage: msg,
        sendTime: mydata.sendTime,
      };
      database()
        .ref('/chatList/' + data.id + '/' + userData.id)
        .update(chatlistUpdate)
        .then(() => console.log('Data updated.'));

        database()
        .ref('/chatList/' + userData.id + '/' + data.id )
        .update(chatlistUpdate)
        .then(() => console.log('Data updated.'));
        setMsgs("")
    });
  };

useEffect(() => {
  console.log("fffdysah")
    const onChildAdd = 
      database()
      .ref('/messages/'+ data.roomId)
      .on('child_added', snapshot => {
        console.log('A new node has been added', snapshot.val());
         setallChats((state)=>[snapshot.val(),...state])
      },);

    // Stop listening for updates when no longer required
    return () => database().ref('/messages/'+data.roomId).off('child_added', onChildAdd);
    
    
  }, []);

  const Data = [
    {
      massage: 'Yes Ofcourse..',
      type: 'sender',
    },
    {
      massage: 'How are You ?',
      type: 'sender',
    },
    {
      massage: 'How Your Opinion about the one done app ?',
      type: 'sender',
    },
    {
      massage:
        'Well i am not satisfied with this design plzz make design better ',
      type: 'receiver',
    },
    {
      massage: 'could you plz change the design...',
      type: 'receiver',
    },
    {
      massage: 'How are You ?',
      type: 'sender',
    },
    {
      massage: 'How Your Opinion about the one done app ?',
      type: 'sender',
    },
    {
      massage:
        'Well i am not satisfied with this design plzz make design better ',
      type: 'receiver',
    },
    {
      massage: 'could you plz change the design...',
      type: 'receiver',
    },
    {
      massage: 'How are You ?',
      type: 'sender',
    },
    {
      massage: 'How Your Opinion about the one done app ?',
      type: 'sender',
    },
  ];

  return (
   
      <SafeAreaView style={styles.container}>
        <View style={styles.head}>
          <View
            style={{
              flexDirection: 'row',
              top: 6,
              margin: 20,
              justifyContent: 'space-between',
              height: '50%',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <Icon name="arrow-back-ios" size={30} />
            </TouchableOpacity>
             
           
            <View style={{flexDirection: 'row'}}>
              {/* <View style={{height:30,width:30,borderRadius:20,}} > */}
              <Avatar source={{uri: data.image}} rounded size={'medium'} />
              {/* </View> */}
              <Text
                style={{
                  fontStyle: 'italic',
                  fontWeight: 'bold',
                  fontSize: 27,
                  left: 7,
                }}>
                {data.name}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icon name="video-call" size={35} />
              <Icon name="call" size={35} style={{left: 10}} />
            </View>
          </View>
        </View>

        <ImageBackground
          style={styles.container1}
          source={require('./Assets/chatback.jpg')}>
          <FlatList
            style={{flex: 1}}
            data={allChat}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            inverted
            renderItem={({item}) => {
              return (
                
                <MsgComponent
                  sender={item.from == userData?.id}
                  massage={item.message}
                  item={item}
                />
              );
            }}
          />
          <View style={styles.bottombar}>
            <View
              style={{
                flexDirection: 'row',
                elevation: 5,
                // height: 60,
                alignItems:'center',
                paddingVertical:7,
                justifyContent:'space-evenly',
                backgroundColor:'grey'
              }}>
              <Icon name="photo" size={25} />
              <Icon name="camera-alt" size={25} />
              <Icon name="add" size={25} />

              <TextInput
                style={styles.textInput}
                placeholder="Send Message"
                placeholderTextColor={'black'}
                multiline={true}
                value={msg}
                onChangeText={val => setMsgs(val)}
              />
              <TouchableOpacity
                onPress={() => sendMsg()}
                underlineColorAndroid="transparent">
                <Icon name="send" size={25} style={{right: 8}} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
   
  );
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#281E5D',
    // height: height,
    // width: width,
    flex:1
  },
  bottombar: {
    height: 'auto',
    width: '100%',
    backgroundColor: 'white',
  },
  head: {
    height: '13%',
    backgroundColor: '#73C2FB',
    justifyContent: 'space-around',
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'grey',
    padding: 10,
    opacity: 0.8,
    width: '60%',
    height: '60%',
    borderRadius: 15,
    backgroundColor: '#fff',
    margin: 8,
    color: 'black',
  },
  container1: {
    flex:1
    // justifyContent:'space-between'
  },
  box: {
    width: 'auto',
    height: 20,
  },
});
