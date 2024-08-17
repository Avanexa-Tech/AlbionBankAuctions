import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
//Config
import ImageSlider from './ImageSlider';
import ImageZoom from './imageZoom';
import Color from '../../Config/Color';

const { width, height } = Dimensions.get('window');
export default class ImageView extends Component {
    constructor(props) {
        super(props);
        this.state = { visible: false, active: 0 };
    }

    render() {
        var { images } = this.props;
        var { visible, active } = this.state;
        return (
            <View style={{ height: 220 }}>
                <ImageSlider images={images} width={width} showModal={(active) => this.setState({ visible: true, active })} />
                <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={() => this.setState({ visible: false })}>
                    <View style={{ backgroundColor: Color.transparantBlack, flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ImageZoom index={active} images={images} width={width} height={height} />
                        </View>
                        <TouchableOpacity style={{ position: 'absolute', right: 0, padding: 10, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', top: Platform.OS == "ios" ? 50 : 0 }}
                            onPress={() => this.setState({ visible: false })}>
                            <Icon name={'close-circle'} size={28} color={Color.red} />
                            <Text style={{ opacity: 1, color: Color.red, fontWeight: 'bold', fontSize: 20 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}