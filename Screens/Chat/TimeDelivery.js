import Moment from 'react-moment';
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../Constant/Color';
import moment from 'moment';

// create a component
const TimeDelivery = (props) => {
    const { sender, item } = props
    return (
        <View
            style={[styles.mainView, {
                justifyContent: 'flex-end',
            }]}
        >
            <Text style={{
                fontFamily: "notoserif", 
                fontSize: 7,
                color: sender ? "white" : "gray"
            }}>
                {moment(item.send_time).format('LLL')}
            </Text>

                <Icon
                    name = {"done-all"}
                   
                    style={{color: item.seen ? "black" : "white" , fontSize: 15, marginLeft: 5}}
                />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2
    }
});

//make this component available to the app
export default TimeDelivery;