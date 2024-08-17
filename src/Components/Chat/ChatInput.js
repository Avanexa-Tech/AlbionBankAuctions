import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Modal,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatBottomModal from './ChatBottomModal';
import Color from '../../Config/Color';

const ChatInput = ({ closeReply, isLeft, username, setMessages, messages }) => {
  const [visible, setVisible] = useState(false);
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          <TextInput
            multiline
            placeholder={'Type a Message...'}
            placeholderTextColor={Color.lightBlack}
            style={styles.input}
            value={messages}
            onChangeText={text => setMessages(text)}
          />
          <TouchableOpacity style={styles.sendButton}>
            <MIcon
              onPress={() => { }}
              name={'send'}
              size={18}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
        <ChatBottomModal visible={visible} setVisible={setVisible} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // backgroundColor: '#ABA7A7',
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  closeReply: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FC',
    flex: 3,
    marginRight: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 20,
    color: 'black',
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: 'center',
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
  },
  swipeToCancelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  swipeText: {
    color: 'green',
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  recordingTime: {
    color: 'red',
    fontSize: 20,
    marginLeft: 5,
  },
  microphoneAndLock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lockView: {
    backgroundColor: '#eee',
    width: 60,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 130,
    paddingTop: 20,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },
});

export default ChatInput;
