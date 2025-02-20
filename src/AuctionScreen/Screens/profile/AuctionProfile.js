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

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
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
import { baseUrl } from '../../../Config/base_url';
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
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      profileShowData();
      const interval = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearInterval(interval);
    }, []))

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
      fetch(`${baseUrl}api/user/get_user?user_id=${data?.id}&status=activated`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.status == true) {
            setUserData(result?.data)
          } else {
            common_fn.showToast(result?.message);
          }
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
      fetch(`${baseUrl}api/plan/user?user_id=${data?.id}&status=activated`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.status == true) {
            // console.log("profile data -----------------113232123", result?.data[0]?.Invoice)
            setExpireDate(moment(result?.data[0]?.expires_at).format('DD-MM-YYYY'));

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
                  marginVertical: 2,
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
                      fontSize: 13,
                      color: '#444',
                      fontFamily: Poppins.Medium,
                      // marginVertical: 5,
                    }}>
                    {userData?.phone_number}
                  </Text>
                  : null}

                {data?.id != undefined ?
                  <Text
                    style={{
                      fontSize: 13,
                      color: Color.black,
                      fontFamily: Poppins.SemiBold,
                      marginBottom: 5
                    }}>
                    {userData?.address}
                  </Text> : null}
                {data?.id != undefined && planStatus ?
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.white,
                      fontFamily: Poppins.Medium, backgroundColor: Color.primary, borderRadius: 30, padding: 7, paddingHorizontal: 30, marginBottom: 10
                    }}>
                    {planStatus == 1 ? "Free Plan" : planStatus == 2 ? "3 Months Plan" : planStatus == 3 ? "6 Months Plan" : planStatus == 4 ? "12 Months Plan" : null}
                  </Text> : <TouchableOpacity style={{
                    fontSize: 12,
                    color: Color.white,
                    marginBottom: 10,
                    fontFamily: Poppins.Bold, backgroundColor: Color.primary, borderRadius: 30, padding: 7, paddingHorizontal: 30
                  }} onPress={() => navigation.navigate('AuctionPrime')}>
                    <Text style={{ color: Color.white, fontFamily: Poppins.Medium }}>
                      Upgrade plan
                    </Text>
                  </TouchableOpacity>}


                {data?.id != undefined && expireDate != "null" && planStatus ?
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.black,
                      fontFamily: Poppins.Bold,
                    }}>
                    Expires At : {expireDate}
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
                      <Text style={{ fontSize: 14, color: '#333', fontFamily: Poppins?.Medium }}>
                        Profile
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#666', fontFamily: Poppins?.Medium }}>
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
                      <Text style={{ fontSize: 14, color: '#333', fontFamily: Poppins?.Medium }}>
                        Interested properties
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#666', fontFamily: Poppins?.Medium }}>
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
                      <Text style={{ fontSize: 14, color: '#333', fontFamily: Poppins?.Medium }}>
                        Subscription Details
                      </Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#666', fontFamily: Poppins?.Medium }}>
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
                          <Text style={{ fontSize: 14, color: '#333', fontFamily: Poppins?.Medium }}>
                            Invoice List
                          </Text>
                        </View>
                        <Text style={{ fontSize: 12, color: '#666', fontFamily: Poppins?.Medium }}>
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
                  <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    navigation.navigate('DeleteProfile',{
                      data: data
                    })
                  }}
                >
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'options-outline'}
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
                      style={{ fontSize: 14, color: '#333', fontFamily: Poppins?.Medium }}>
                      Others
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
                  onPress={async () => {
                    console.log("userid", data?.id);
                    const logout = await fetchData?.Auction_Logout_Api(data?.id);
                    console.log("logout", logout);
                    if (logout?.message == "Logout Successfully") {
                      await AsyncStorage.clear();
                      common_fn.showToast('Logout Successfully');
                      navigation.navigate('OnboardingScreen2');
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'OnboardingScreen2' }],
                      })
                    }
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
                      style={{ fontSize: 14, color: '#333', fontFamily: Poppins?.Medium }}>
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
