import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../../Config/Color';

const Message = ({ time, isLeft, message, setMessages }) => {
  const isOnLeft = type => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: "#ECF4FF",
        borderBottomLeftRadius: 0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: Color.black,
      };
    } else if (isLeft && type === 'time') {
      return {
        color: 'darkgray',
      };
    } else {
      return {
        borderBottomRightRadius: 0,
      };
    }
  };
  return (
    <View style={[styles.container]}>
      <View style={{ alignItems: isLeft ? "flex-start" : "flex-end", marginHorizontal: 20 }}>
        <Text
          style={[{ color: isLeft ? Color.primary : 'green', fontWeight: '600' }]}>
          {isLeft ? 'Albion Team' : 'You'}
        </Text>
      </View>
      <View style={[styles.messageContainer, isOnLeft('messageContainer')]}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={styles.messageView}>
            <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
          </View>
          {/* <View style={styles.timeView}>
            <Text style={[styles.time, isOnLeft('time')]}>{time}</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: '#F8F8F8',
    maxWidth: '80%',
    alignSelf: 'flex-end',
    borderRadius: 15,
    padding: 15,
    // paddingHorizontal: 15,
    marginHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 10,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 5,
  },
  message: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-end',
    fontSize: 10,
  },
});

export default Message;
