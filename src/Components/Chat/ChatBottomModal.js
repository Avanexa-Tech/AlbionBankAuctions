import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
// import DocumentPicker, {types} from 'react-native-document-picker';

const ChatBottomModal = props => {
  var {visible, setVisible} = props;
  const animated = useRef(new Animated.Value(0)).current;
  const [fileResponse, setFileResponse] = useState([]);
  useEffect(() => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const galleryImage = () => {
    ImagePicker.launchImageLibrary(
      {noData: true, selectionLimit: 0},
      response => {
        var {assets} = response;
        if (assets.length > 0) {
          console.log(assets[0]);
          // setImage(assets[0]);
          // setISVisible(false);
        }
      },
    );
  };

  const handleDocumentSelection = async () => {
    try {
      // const response = await DocumentPicker.pick({
      //   presentationStyle: 'fullScreen',
      //   type: [types.pdf],
      // });
      // setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Modal transparent={true} visible={visible}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: '#00000050',
          transform: [
            {
              translateY: animated.interpolate({
                inputRange: [0, 1],
                outputRange: [600, 0],
              }),
            },
          ],
        }}>
        <Pressable onPress={() => setVisible(false)} style={{flex: 1}} />
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Icon
            onPress={() => setVisible(false)}
            name="close-circle"
            size={30}
            color="#DA0000"
            style={{
              alignSelf: 'flex-end',
              marginHorizontal: 10,
              marginVertical: 10,
            }}
          />
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => galleryImage()}
                style={{
                  paddingHorizontal: 70,
                  paddingVertical: 10,
                }}>
                <Icon name="images" size={90} />
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  Gallery
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDocumentSelection()}>
                <Icon name="document" size={100} />
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'gray',
                    fontWeight: '700',
                    fontSize: 20,
                  }}>
                  Document
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default ChatBottomModal;
