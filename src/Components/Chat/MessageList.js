import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, Text } from 'react-native';
import Message from './Message';
import Color from '../../Config/Color';

const height = Dimensions.get('window').height;

const MessagesList = ({ messages, Categories, Questions, Responses, setMessages }) => {
  const scrollView = useRef();
  return (
    <ScrollView
      style={{ backgroundColor: 'white', height: height / 1.2 }}
      ref={ref => (scrollView.current = ref)}
      onContentSizeChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}>
      {messages.map((item, index) => {
        var { content, time, user } = item;
        return (
          <Message
            key={index}
            time={time}
            isLeft={user !== 0}
            message={content}
          />
        );
      })}
      {messages.map((item, index) => {
        var { content, time, user } = item;
        return (
          <Message
            key={index}
            time={time}
            isLeft={user !== 0}
            message={content}
          />
        );
      })}
    </ScrollView>
  );
};

export default MessagesList;
