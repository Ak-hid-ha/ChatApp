// import moment from 'moment';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { FONTS } from '../Fonts';
import TimeDelivery from './TimeDelivery';

const MsgComponent = ({ sender, item, sendTime } ) => {
    // const { sender, massage, item, sendTime } = props;


    // console.log("item",item)
    return (
        <Pressable
           
        >
            <View
                style={[styles.TriangleShapeCSS,
                sender ?
                    styles.right
                    :
                    [styles.left]
                ]}
            />
            <View
                style={[styles.masBox, {
                    alignSelf: sender ? 'flex-end' : 'flex-start',
                    // borderWidth:1,
                    backgroundColor: sender ? "#73C2FB" : "white"
                }]}
            >

                <Text style={{ paddingLeft: 5, color:  sender ? "white" : "black",fontFamily:FONTS.Regular,fontSize:12.5 }}>
                    {item.message}
                    {/* {item.message} */}
                </Text>

                <TimeDelivery
                    sender={sender}
                    item={item}
                />



            </View>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    masBox: {
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        minWidth: 80,
        maxWidth: '80%',
        paddingHorizontal: 10,
        marginVertical: 5,
        paddingTop: 5,
        borderRadius: 8
    },
    timeText: {
        fontFamily: 'AveriaSerifLibre-Light',
        fontSize: 10
    },
    dayview: {
        alignSelf: 'center',
        height: 30,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginTop: 10
    },
    iconView: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TriangleShapeCSS: {
        position: 'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 15,
        borderRightWidth: 5,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    left: {
        borderBottomColor: "white",
        left: 2,
        bottom: 10,
        transform: [{ rotate: '0deg' }]
    },
    right: {
        borderBottomColor: "grey",
        right: 2,
        bottom: 5,
        transform: [{ rotate: '103deg' }]
    },
});
export default MsgComponent;