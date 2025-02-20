//import liraries
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    PermissionsAndroid,
    Modal,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';

import Color from '../../../Config/Color';
import { Poppins } from '../../../Global/FontFamily';
import { Media } from '../../../Global/Media';
import { TextInput } from 'react-native';
import { scr_height, scr_width } from '../../../Utils/Dimensions';
import fetchData from '../../../Config/fetchData';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import common_fn from '../../../Config/common_fn';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);


// create a component
const FeedbackRatings = () => {

    const navigation = useNavigation();
    const Auction_userData = useSelector(
        state => state.UserReducer.auctionUserData,
    );
    var { id, name, email, phone_number, state, district } = Auction_userData;


    const starImageCorner = Media.starOutline;
    const [defaultRating, setDefaultRating] = useState(null);
    const starImageFilled = Media.star;

    const [comments, setComments] = useState('');
    const [maxRating, setMaxRating] = useState([
        {
            id: 1,
            rating: 1,
            experience: 'Poor',
        },
        {
            id: 2,
            rating: 2,
            experience: 'Bad',
        },
        {
            id: 3,
            rating: 3,
            experience: 'Okay',
        },
        {
            id: 4,
            rating: 4,
            experience: 'Average',
        },
        {
            id: 5,
            rating: 5,
            experience: 'Good',
        },
    ]);

    const handleRatingPress = item => {
        if (defaultRating === item) {
            setDefaultRating(null);
        } else {
            setDefaultRating(item);
        }
    };


    const feedbackSubmitClick = async () => {
        try {
            if (defaultRating != null && comments != '') {
                var data = {
                    user_id: id,
                    rating: defaultRating,
                    feedback: comments
                };

                const feedbackresponse = await fetchData.Auction_feedbackData(data);
                if (feedbackresponse?.status == true) {
                    common_fn.showToast(feedbackresponse?.message);
                    navigation.navigate("ActionHome");
                } else {
                    common_fn.showToast(feedbackresponse?.message);
                    navigation.navigate("ActionHome");
                }

            } else {
                common_fn.showToast("Please select your rating and enter your comments");
            }

        } catch (error) {
            console.log("catch in feedbackSubmit_Click : ", error);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
            style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, width: scr_width, alignItems: 'center' }}>
                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3EAE4', paddingVertical: 20 }}>
                        <Image
                            source={require('../../../assets/image/feedback.png')}
                            style={{ width: '100%', height: 120, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{ width: scr_width, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <View style={{ width: '90%', marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 14, color: Color.black, fontFamily: Poppins.SemiBold }}>Rate Your Experience ?</Text>
                            <View style={styles.customRatingBarStyle}>
                                {maxRating.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            key={index}
                                            onPress={() => handleRatingPress(item.rating)}
                                            style={{
                                                marginHorizontal: 10,
                                                alignItems: 'center',
                                            }}>
                                            <Image
                                                style={styles.starImageStyle}
                                                source={{
                                                    uri:
                                                        item.rating <= defaultRating
                                                            ? starImageFilled
                                                            : starImageCorner,
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: 13,
                                                    color: Color.cloudyGrey,
                                                    marginVertical: 10,
                                                    fontFamily: Poppins.SemiBold,
                                                }}>
                                                {item.experience}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 3, backgroundColor: '#EAEAEF', borderRadius: 30, }}></View>
                        <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10, marginVertical: 10 }}>
                            <Text style={{ width: '100%', fontSize: 14, color: Color.black, fontFamily: Poppins.SemiBold, paddingVertical: 5 }}>Tell us about your experience</Text>

                            <View style={{ width: '100%', backgroundColor: Color.white, borderWidth: 1, borderColor: Color.lightgrey, borderRadius: 5, marginVertical: 10 }}>
                                <TextInput
                                    placeholder="Write your comments here ..."
                                    placeholderTextColor={Color.cloudyGrey}
                                    value={comments}
                                    multiline={true}
                                    onChangeText={text => {
                                        setComments(text);
                                    }}
                                    keyboardType="name-phone-pad"
                                    returnKeyType='done'
                                    style={styles.phoneTextInput}
                                />
                            </View>
                        </View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={100}>
                            <TouchableOpacity onPress={() => feedbackSubmitClick()}
                                style={{ width: scr_width - 50, height: 50, backgroundColor: Color.primary, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
                                <Text style={{ fontSize: 14, color: Color.white, fontFamily: Poppins.Regular }}>Submit</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1, width: '100%',
        backgroundColor: Color.white,
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    starImageStyle: {
        width: 30,
        height: 30,
        resizeMode: 'cover',
    },
    phoneTextInput: {
        width: '100%',
        minHeight: 100,
        padding: 10,
        fontSize: 14,
        color: Color.black,
        textAlignVertical: 'top',
        maxHeight: 150,
        fontFamily: Poppins.Regular
    },
    scrollContent: {
        flexGrow: 1, // Ensures the content can grow and scroll when necessary
        alignItems: 'center', // Centers child components horizontally
        justifyContent: 'flex-start', // Aligns child components at the top
        padding: 0, // Adds padding inside the ScrollView
        backgroundColor: Color.white, // Keeps the background consistent
    },
});

//make this component available to the app
export default FeedbackRatings;
