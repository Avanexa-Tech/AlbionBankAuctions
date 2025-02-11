import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
  Dimensions,
} from 'react-native';

import { primarycolor } from '../../../Utils/Colors';
import Color from '../../../Config/Color';
import { Media } from '../../../Global/Media';
import { Poppins } from '../../../Global/FontFamily';
import { Iconviewcomponent } from '../../../Components/Icontag';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setActionUserData, setAsync, setLoginType, setUserData } from '../../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Divider } from 'react-native-elements';
import fetchData from '../../../Config/fetchData';
import AuctionBottomLogin from '../../Auctioncomponents/AuctionBottomLogin';
import { Linking } from 'react-native';
import moment from 'moment';
import common_fn from '../../../Config/common_fn';
var { width, height } = Dimensions.get('screen');

const AuctionProfile = ({ navigation }) => {
  const routeName = useRoute();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);

  const [Username, setUsername] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  // const Auction_userData = useSelector(
  //   state => state.UserReducer.auctionUserData,
  // );
  // var { id, name, email, phone_number, state, district } = Auction_userData;

  const data = useSelector(
    state => state.UserReducer.auctionUserData,
  );

  const [expireDate, setExpireDate] = useState('')
  const [planStatus, setPlanStatus] = useState('')
  const [invoiceShown, setInvoiceShown] = useState('')

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  function handleBackButtonClick() {
    if (routeName.name == 'AuctionProfile') {
      navigation.goBack();
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (data?.id) {
      setLoading(true);
      profileShowData();
      const interval = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data?.id]);


  useEffect(() => {
    try {
      plan_CheckData();
    } catch (error) {
      console.log("catch in use_Effect:", error);
    }
  }, [])


  const profileShowData = () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      // console.log("Profile user id =========== :", data?.id);
      fetch(`https://api.albionbankauctions.com/api/user/get_user?user_id=${data?.id}&status=activated`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.status == true) {
            setUserData(result?.data)
          } else {
            common_fn.showToast(result?.message);
          }
          console.log("Profile Data =========== :", result.data);
        })
        .catch((error) => console.error("catch in profileShowData_Api :", error));
    } catch (error) {
      console.log("catch in profileShow_Data:", error);
    }
  }


  const plan_CheckData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("accept", "*/*");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      // fetch(`http://192.168.29.204:5000/api/plan/user?user_id=${id}`, requestOptions)
      fetch(`http://13.127.95.5:5000/api/plan/user?user_id=${data?.id}&status=activated`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.status == true) {
            // console.log("profile data -----------------113232123", result?.data[0]?.Invoice)
            setExpireDate(moment(result?.data[0]?.expires_at).format('DD-MM-YYYY'));
            console.log("http://13.127.95.5:5000/api/plan/2266",result?.data[0]);
            
            setPlanStatus(result?.data[0]?.plan_id)
            setInvoiceShown(result?.data[0]?.Invoice)
            // console.log("PLAN ======= :", result?.data[0])
          }
        }
        )
        .catch((error) => console.error(error));

    } catch (error) {
      console.log("catch in plan_CheckData_Home : ", error);
    }
  }

  console.log("data?.id ============== :", data?.id);



  return (
    <View style={{ flex: 1, backgroundColor: Color.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height,
            }}>
            <Image
              source={{ uri: Media.loader }}
              style={{ width: 80, height: 80, resizeMode: 'contain' }}
            />
          </View>
        ) : (
          <View style={styles.container}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                marginVertical: 20,
              }}>
              <View style={{ alignItems: 'center' }}>
                <View
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#f3f3f3',
                    borderRadius: 100,
                  }}>
                  <Image
                    source={{ uri: Media.Userpng }}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                {data?.id == undefined ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ActionLogin")
                    }}
                    style={{ marginVertical: 10 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.white,
                        fontFamily: Poppins.Bold,
                        marginHorizontal: 20,
                        backgroundColor: Color.primary,
                        borderRadius: 50,
                        padding: 7,
                        paddingHorizontal: 30,
                      }}>
                      {'Login'}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                {data?.id != undefined ?
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Poppins.Bold,
                    }}>
                    {userData?.name}
                  </Text>
                  :
                  null}

                {data?.id != undefined ?
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#444',
                      fontFamily: Poppins.SemiBold,
                      marginVertical: 5,
                    }}>
                    {userData?.phone_number}
                  </Text>
                  : null}

                {data?.id != undefined ?
                  <Text
                    style={{
                      fontSize: 13,
                      color: Color.black,
                      fontFamily: Poppins.Bold,
                    }}>
                    {userData?.address}
                  </Text> : null}

                {data?.id != undefined ?
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.white,
                      fontFamily: Poppins.Bold, backgroundColor: Color.primary, borderRadius: 30, padding: 7, paddingHorizontal: 30, marginVertical: 10
                    }}>
                    {planStatus == 1 ? "Free Plan" : planStatus == 2 ? "3 Months Plan" : planStatus == 3 ? "6 Months Plan" : planStatus == 4 ? "12 Months Plan" : null}
                  </Text> : null}


                {data?.id != undefined && expireDate != "null" ?
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.black,
                      fontFamily: Poppins.Bold,
                    }}>
                    Expired Date : {expireDate}
                  </Text>
                  : null}
              </View>
            </View>

            {data?.id != undefined ?
              <View style={{ marginVertical: 10, marginBottom: 50 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('AuctionEditProfile');
                  }}>
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={'account-edit'}
                    icon_size={28}
                    icon_color={Color.primary}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginHorizontal: 10,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>
                        Profile
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#666' }}>
                      Your profile details will be edited here
                    </Text>
                  </View>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward'}
                    icon_size={18}
                    icon_color={'#666'}
                  />
                </TouchableOpacity>
                <Divider style={{ height: 1, marginVertical: 10 }} />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('InterestedProperties');
                  }}>
                  <MCIcon name="home-city" size={22} color={Color.primary} />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginHorizontal: 10,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>
                        Interested properties
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#666' }}>
                      Your Interested property details
                    </Text>
                  </View>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward'}
                    icon_size={18}
                    icon_color={'#666'}
                  />
                </TouchableOpacity>
                <Divider style={{ height: 1, marginVertical: 10 }} />

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('SubscriptionDetails')
                  }}>
                  <MCIcon name="home-city" size={22} color={Color.primary} />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginHorizontal: 10,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>
                        Subscription Details
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#666' }}>
                      Your subscription plan details
                    </Text>
                  </View>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward'}
                    icon_size={18}
                    icon_color={'#666'}
                  />
                </TouchableOpacity>
                <Divider style={{ height: 1, marginVertical: 10 }} />
                {invoiceShown != null ?
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 10,
                        marginHorizontal: 10,
                      }}
                      onPress={() => {
                        navigation.navigate('InvoiceList')
                      }}>
                      <Iconviewcomponent
                        Icontag={'FontAwesome5'}
                        iconname={'file-invoice'}
                        icon_size={22}
                        icon_color={Color.primary}
                      />
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          marginHorizontal: 10,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>
                            Invoice List
                          </Text>
                        </View>
                        <Text style={{ fontSize: 12, color: '#666' }}>
                          Your invoice list details
                        </Text>
                      </View>
                      <Iconviewcomponent
                        Icontag={'Ionicons'}
                        iconname={'chevron-forward'}
                        icon_size={18}
                        icon_color={'#666'}
                      />
                    </TouchableOpacity>
                    <Divider style={{ height: 1, marginVertical: 10 }} />
                  </View>
                  :
                  null}
                {data?.id == undefined ? (
                  <View />
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        '',
                        'Do You like to remove your account',
                        [
                          {
                            text: 'No',
                            onPress: async () => { },
                          },
                          {
                            text: 'Yes',
                            onPress: async () => {
                              Linking.openURL(`https://albionbankauctions.com/web/user/delete/${data?.id}`,);
                              AsyncStorage.clear();
                              navigation.replace('OnboardingScreen2');
                              dispatch(setActionUserData({}));
                              dispatch(setLoginType(''));
                              // const usersData = await fetchData.Auction_deleteData(
                              //   data,
                              // );
                              // if (usersData?.message == 'Success') {
                              //   AsyncStorage.clear();
                              //   navigation.replace('ActionLogin');
                              //   dispatch(setActionUserData({}));
                              //   dispatch(setLoginType(''));
                              // }

                            },
                          },
                        ],
                        { cancelable: false },
                      );
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 10,
                      marginHorizontal: 10,
                    }}>
                    {/* <Icon name="heart-outline" size={25} color={Color.primary} /> */}
                    <Iconviewcomponent
                      Icontag={'AntDesign'}
                      iconname={'deleteuser'}
                      icon_size={22}
                      icon_color={Color.primary}
                    />
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginHorizontal: 10,
                      }}>
                      <Text style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>
                        Delete User
                      </Text>
                      <Text style={{ fontSize: 12, color: '#666' }}>
                        Removing Your Account
                      </Text>
                    </View>
                    <Iconviewcomponent
                      Icontag={'Ionicons'}
                      iconname={'chevron-forward'}
                      icon_size={18}
                      icon_color={'#666'}
                    />
                  </TouchableOpacity>
                )}

                <Divider style={{ height: 1, marginVertical: 10 }} />

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}
                  // onPress={async () => {
                  //   try {
                  //     await AsyncStorage.removeItem('user_data');  // ✅ Remove stored user data

                  //     dispatch(setUserData(null)); // ✅ Reset Redux state
                  //     dispatch(setActionUserData(null));
                  //     dispatch(setLoginType(''));

                  //     navigation.replace('OnboardingScreen2');  // ✅ Navigate to onboarding

                  //   } catch (error) {
                  //     console.error("Logout Error:", error);
                  //   }
                  // }}

                  onPress={async () => {
                    await AsyncStorage.clear();
                    navigation.navigate('OnboardingScreen2');
                    // dispatch(setActionUserData({}));
                    // dispatch(setLoginType(''));
                  }}
                >
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'log-out'}
                    icon_size={24}
                    icon_color={Color.primary}
                  />
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginHorizontal: 10,
                    }}>
                    <Text
                      style={{ fontSize: 14, color: '#333', fontWeight: 'bold' }}>
                      Logout
                    </Text>
                  </View>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'chevron-forward'}
                    icon_size={18}
                    icon_color={'#666'}
                  />
                </TouchableOpacity>
                <Divider style={{ height: 1, marginVertical: 10 }} />
              </View>
              : null}

          </View>)}
      </ScrollView>
      {/* <AuctionBottomLogin login={login} setLogin={setLogin} /> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: width,
    // height: height,
    backgroundColor: Color.white,
  },
});

export default AuctionProfile;
