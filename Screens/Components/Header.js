// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {  useSelector } from 'react-redux';
// import { setUser } from '../Redux/Reducers';
// // import Auth from '../Screens/Auth';
// import { ListItem,Avatar } from 'react-native-elements/dist/avatar/Avatar';

// const {width} = Dimensions.get('window');
// const height = Dimensions.get('window').height;

// const HeaderCad = ()=>{

//   // const [checked, setChecked] = useState(0);

//     // const userData = useSelector(state => state.User)
//     return(
        
//       <View style={styles.head}>
//         <View
//           style={{
//             flexDirection: 'row',
//             top: 6,
//             justifyContent: 'space-between',
//           }}>
//           <Avatar source={{uri:userData.image}}
//           rounded
//           size={"small"}/>
//           <Text style={{fontStyle: 'italic', fontWeight: 'bold', fontSize: 27}}>
//             Chattyy
//           </Text>
//           <Icon name="camera-alt" size={35} />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             top: 15,
//             justifyContent: 'space-evenly',
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               setChecked(0);
//             }}
//             style={[
//               styles.button,
//               {backgroundColor: checked === 0 ? '#000' : '#73C2FB'},
//             ]}>
//             <Text
//               style={[
//                 styles.text,
//                 {
//                   color: checked === 0 ? 'white' : 'grey',
//                   paddingVertical: 5,
//                 },
//               ]}>
//               Chat
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.button,
//               {backgroundColor: checked === 1 ? '#000' : '#73C2FB'},
//             ]}
//             onPress={() => {
//               setChecked(1);
//             }}>
//             <Text
//               style={[
//                 styles.text,
//                 {
//                   color: checked === 1 ? 'white' : 'grey',
//                 },
//               ]}>
//               Status
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.button,
//               {backgroundColor: checked === 2 ? '#000' : '#73C2FB'},
//             ]}
//             onPress={() => {
//               setChecked(2);
//             }}>
//             <Text
//               style={[
//                 styles.text,
//                 {
//                   color: checked === 2 ? 'white' : 'grey',
//                   paddingVertical: 5,
//                 },
//               ]}>
//               Call
//             </Text>
//           </TouchableOpacity>
//         </View>
//        </View>
//     )
// }
// export default HeaderCad()

// const styles = StyleSheet.create({
//     head: {
//         height: '18%',
//         backgroundColor: '#73C2FB',
//         justifyContent: 'space-around',
//       },
//       button: {
//         width: '20%',
//         height: '70%',
//         borderColor: 'black',
//         backgroundColor: '#000',
//         borderRadius: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//       },
//       text: {
//         fontSize: 20,
//       },
// })