import { useNavigation } from "@react-navigation/native";
import React from "react";
import {View,Text,StyleSheet, Dimensions, FlatList,Image, TouchableOpacity,TouchableHighlight} from 'react-native'
import { Avatar } from "react-native-elements";
import  Icon  from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Redux/Reducers";

const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;

export default function Modal ({setModalVisible}){
    const {userData} = useSelector(state=>state)
    const navigation = useNavigation()
    const dispatch =useDispatch()
const arr=[
    {
        id:1,
        name:'Profile',
        image:require('../../src/Assets/proff12.gif')

    },
    {
        id:2,
        name:"Settings",
        image:require('../../src/Assets/settings23.gif')
    },
    {
        id:3,
        name:'Favourites',
        image:require('../../src/Assets/love.gif')
    },
    {
        id:4,
        name: "Logout",
        image:require('../../src/Assets/logout.gif')
    }
]
const navigations = ()=>{
    if(arr[3].id==4){
       dispatch(removeUser(userData))
    }else{null}
}
    return(
        <View style={styles.container}>
        <View style={{alignItems:'center',justifyContent:'center',marginTop:40, padding:20}}>
            <TouchableOpacity onPress={()=>setModalVisible(false)}>
            <Icon name="arrow-back-ios" size={25} color="black" style={{right:90}} />
            </TouchableOpacity>
          
           <Avatar
           rounded
           source={{
            uri: "http://pluspng.com/img-png/user-png-icon-young-user-icon-2400.png"
           }}
           size='large' />
           <Text style={styles.txt}>Kalluu</Text>
           <Text style={styles.txt1}>kallu@gmail.com</Text>
           <Text>ksdjhiuf</Text>

           </View>
           <FlatList
           data={arr}
           keyExtractor={it=>it.id}
           renderItem={({item})=>{
            return(
                <TouchableOpacity style={styles.card}
                onPress={navigations}>
                    <Image source={item.image}
                style={{width: 30, height: 30 }}></Image>
                <Text style={styles.txt2}>{item.name}</Text>
                </TouchableOpacity>
            )
           }}/>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
    width:width-130,
    backgroundColor:'white',
    height: height,
    justifyContent:'center',
    },
    card:{
    flexDirection:'row',
    marginTop:40,
    marginLeft:30,
    margin:20,
    
    },
    txt:{
        lineHeight:30,
        fontFamily:'serif',
        fontSize:20,
        fontWeight:'500',
        color:'black'
    },
    txt1:{
        lineHeight:20,
        fontFamily:'Poppins-ExtraBold',
        fontSize:16,
        fontWeight:'800',
        color:'black'
    },
    txt2:{
        fontFamily:'Poppins-ExtraBold',
        fontSize:20,
        fontWeight:'800',
        color:'black',
        left:20
    }
})