// import {Container} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {fonts} from 'react-native-elements/dist/config';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import {useSelector} from 'react-redux';
import {FONTS} from './Fonts';
import database from '@react-native-firebase/database';
import uuid from 'react-native-uuid';
import AsyncStorage from './AsyncStorage';



const Search = ({navigation}) => {
  const [search, setsearch] = useState('');
  const {userData} = useSelector(state => state);

  const [getData, setgetData] = useState({});
  const [allUser, setallUsers] = useState([]);
  const [chatLists, setchatList] = useState([]);
  const [allUserBackup, setallUserBackup] = useState([]);


  useEffect(() => {
    getAllUsers();
    chatList()
  }, []);

  const sendchat = () => {};

  const getAllUsers = () => {
    database()
      .ref('users/')
      .once('value')
      .then(snapshot => {
        console.log(' all User data: ', Object.values(snapshot.val()));
        setallUsers(Object.values(snapshot.val()).filter(item => item.id != userData.id));
        setallUserBackup( Object.values(snapshot.val()).filter(item => item.id != userData.id))
      });
  };



  const createChat =(data) => {
    let roomId = uuid.v4();
    let mydata = {
      roomId,
      name: userData.name,
      image: userData.image,
      email: userData.email,
      lastMessage: '',
    };
    database()
      .ref('/chatList/' + data.id + '/' + userData.id)
      .update(mydata)
      .then(() => console.log('Data updated.'));

    delete data['password'];
    data.lastMessage = "";
    data.roomId= roomId

    database()
      .ref('/chatList/' + userData.id + '/' + data.id)
      .update(data)
      .then(() => console.log('Data updated.'));

    // navigation.navigate('Message', {chatLists});

    // const storeData = async roomId => {
    //   console.log(roomId)
    //   try {
       
    //     console.log("resss=>", roomId)
    //     await AsyncStorage.setItem('@room', roomId);
    //   } catch (e) {
    //   }
    // };

  };



  const chatList = () => {
    database()
      .ref('/chatList/' + userData.id)
      .on('value', snapshot => {
        console.log('User data: ', Object.values(snapshot.val()));
        setchatList(Object.values(snapshot.val()));
      });
  };
  const searchUser=(val)=>{
setsearch(val)
setallUsers(allUserBackup.filter((it)=>it.name.match(val)))
  }

  const renderItem = ({item}) => (
    <ListItem
      bottomDivider
      containerStyle={{paddingVertical: 7, marginVertical: 2}}
      onPress={() => createChat(item)}>
      <Avatar
        source={{uri: item.image}}
        rounded
        title={item.name}
        size="medium"
      />
      <ListItem.Content>
        <ListItem.Title style={{fontFamily: FONTS.Regular, fontSize: 14}}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{fontFamily: FONTS.Regular, fontSize: 12}}
          numberOfLines={1}>
          {item.subtitle}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <SearchBar
        placeholder="Search by name..."
        onChangeText={val => searchUser(val)}
        value={search}
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    elevation: 2,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 15,
    fontFamily: FONTS.Regular,
    color: 'black',
    opacity: 0.7,
  },
});
