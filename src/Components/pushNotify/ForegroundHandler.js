import React, {useEffect} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

const ForegroundHandler = () => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'my-channel', // (required)
        channelName: 'My channel', // (required)
      },
      created => console.log(`CreateChannel returned '${created}'`),
    );
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
      });
    const unsubcribe = messaging().onMessage(async remoteMessage => {
      // console.log(
      //   'Notification on foreground state ====================== : ',
      //   JSON.stringify(remoteMessage),
      // );
      var {notification, messageId} = remoteMessage;
      if (Platform.OS == 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          sound: 'default',
        });
      } else {
        PushNotification.localNotification({
          channelId: 'my-channel',
          autoCancel: true,
          body: remoteMessage.notification.body,
          title: remoteMessage.notification.title,
          message: remoteMessage.notification.body,
          vibrate: true,
          vibration: 300,
          playSound: true,
          soundName: 'default',
          date: new Date(new Date().getTime() + 3000),
        });
      }
    });
    return unsubcribe;
  }, []);
  return null;
};

export default ForegroundHandler;
