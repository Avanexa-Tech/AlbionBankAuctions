import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//Config
import ImageSlider from './ImageSlider';
import ImageZoom from './imageZoom';
import Color from '../../../Config/Color';
import { baseUrl } from '../../../Config/base_url';

const { width, height } = Dimensions.get('window');
export default class ImageView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      active: 0,
      expiredStatus: '',
      planStatus: '',
    };
  }

  componentDidMount() {
    // Equivalent to useEffect with an empty dependency array
    this.plan_CheckData();
  }

  async plan_CheckData() {
    try {
      const myHeaders = new Headers();
      myHeaders.append('accept', '*/*');

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      const response = await fetch(
        `${baseUrl}api/plan/user?user_id=${this.props.id}&status=activated`,
        requestOptions
      );
      const result = await response.json();
      
      if (result?.status === true) {
        this.setState({
          expiredStatus: result?.data[0]?.status,
          planStatus:result?.data[0]?.Plan?.id,
        });
      }
    } catch (error) {
      console.log('catch in plan_CheckData_Home : ', error);
    }
  }



  render() {
    var { images, } = this.props;
    var { visible, active, planStatus, expiredStatus } = this.state;
    
    // console.log("navigation ================== :", this.props.navigation);
    return (
      <View style={{ height: 220 }}>
        <ImageSlider
          images={images}
          width={width}
          active={active}
          navigation={this.props.navigation}
          planStatus={planStatus} // Pass planStatus as a prop
          expiredStatus={expiredStatus} // Pass expiredStatus as a prop
          showModal={active => {
            if (active === 0 || (planStatus > 1 && expiredStatus !== "expired")) {
              this.setState({ visible: true, active });
            } else {
              // Open the modal
              this.setState({ visible: false, active: false });
              ToastAndroid.show('Access to property images requires an active plan. Please upgrade your plan to view this feature', ToastAndroid.LONG,);
            }
          }}
        />
        <Modal
          transparent={true}
          animationType="slide"
          visible={visible}
          onRequestClose={() => this.setState({ visible: false })}>
          <View style={{ backgroundColor: Color.transparantBlack, flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ImageZoom
                index={active}
                images={images}
                width={width}
                height={height}
              />
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => this.setState({ visible: false })}>
              <Text
                style={{ opacity: 1, color: Color.white, fontWeight: 'bold' }}>
                Close
              </Text>
              <Icon name={'close'} size={22.5} color={Color.white} />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
