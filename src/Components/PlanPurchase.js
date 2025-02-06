import React, { useState, useEffect, useMemo } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
  Modal,
  BackHandler,
  ScrollView,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import Color from '../Config/Color';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { Poppins } from '../Global/FontFamily';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPayCancelVisible, setPaySuccessVisible } from '../Redux';
import { useNavigation } from '@react-navigation/native';
import { AgentPlanData, BuyerPlanData, OwnerPlanData } from '../contentJson';
import Table from './PayTable';
import fetchData from '../Config/fetchData';
import common_fn from '../Config/common_fn';

const PlanPurchase = props => {
  const [planData, setPlanData] = useState([]);
  const [cardHeight] = useState(undefined);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectItem, setSelectItem] = useState({});
  const [selectPlan, setSelectPlan] = useState('');
  const userData = useSelector(state => state.UserReducer.userData || {});
  const [changeResponseText, setChangeResponseText] = useState('');
  var { user_id, username, mobile_number, user_type_id, change_persona, email } =
    userData;
  const [visible, setVisible] = useState({});
  function selectPlanItem(item, index) {
    try {
      setSelectPlan(item.amount);
      setSelectItem(item);
    } catch (error) {
      console.log('catch in selectPlan_Item :', error);
    }
  }

  // const getCheckOut = async () => {
  //   var data = {
  //     order_amount: selectPlan,
  //     order_id: `order_${Math.floor(Math.random() * 10000 + 1)}`,
  //     order_currency: 'INR',
  //     customer_details: {
  //       customer_id: user_id,
  //       customer_name: username,
  //       customer_email: email,
  //       customer_phone: mobile_number,
  //     },
  //     order_meta: {
  //       notify_url: 'https://test.cashfree.com',
  //     },
  //     order_note: 'some order note here',
  //   };
  //   const response = await axios.post(
  //     'https://sandbox.cashfree.com/pg/orders',
  //     data,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-client-id': 'TEST1004441509edc9fd654c1afc69b351444001',
  //         'x-client-secret': 'TESTfe5eaf6e51b092252f62e2f31bdfedfa1248206f',
  //         'x-api-version': '2022-09-01',
  //         'x-request-id': 'Veeramani',
  //       },
  //     },
  //   );
  //   const resp = {
  //     session_id: response?.data?.payment_session_id,
  //     order_id: response?.data?.order_id,
  //   };
  //   startCheckout(resp);
  // };

  // useEffect(() => {
  //   CFPaymentGatewayService.setCallback({
  //     async onVerify(orderID) {
  //       setChangeResponseText('orderId is :' + orderID);

  //       const Payments = await axios.get(
  //         `https://backend.albionpropertyhub.com/api/Payments/return_order?order_id=${orderID}&plan_id=${selectItem?.id}&user_id=${user_id}`,
  //       );
  //       console.log('Payments', Payments?.data);
  //       dispatch(setPaySuccessVisible(true));
  //       props.navigation.replace('TabNavigator', {user_id});
  //     },
  //     onError(error, orderID) {
  //       setChangeResponseText(
  //         'exception is : ' +
  //           JSON.stringify(error) +
  //           '\norderId is :' +
  //           orderID,
  //       );
  //       dispatch(setPayCancelVisible(true));
  //       props.navigation.replace('TabNavigator', {user_id});
  //     },
  //   });

  //   return () => {
  //     CFPaymentGatewayService.removeCallback();
  //   };
  // }, []);

  // const startCheckout = async response => {
  //   try {
  //     const session = new CFSession(
  //       response.session_id,
  //       response.order_id,
  //       CFEnvironment.SANDBOX,
  //     );
  //     const theme = new CFThemeBuilder()
  //       .setNavigationBarBackgroundColor('#E64A19') // ios
  //       .setNavigationBarTextColor('#FFFFFF') // ios
  //       .setButtonBackgroundColor('#FFC107') // ios
  //       .setButtonTextColor('#FFFFFF') // ios
  //       .setPrimaryTextColor('#212121')
  //       .setSecondaryTextColor('#757575') // ios
  //       .build();
  //     const dropPayment = new CFUPIIntentCheckoutPayment(session, theme);
  //     const resp = await CFPaymentGatewayService.doUPIPayment(dropPayment);
  //   } catch (e) {
  //     console.log('error msg ----------- :', e.message);
  //   }
  // };

  useEffect(() => {
    if (planData?.length == 0) {
      getApiData(user_type_id);
    }
  }, []);

  const getApiData = async user_type_id => {
    try {
      const data = `plan_group=2&user_type_id=${user_type_id}`;
      const plandata = await fetchData.check_plan(data);
      let specificData = [];
      if (user_type_id === '1') {
        specificData = plandata.map(plan_data => {
          return {
            plan_id: plan_data.plan_id,
            plan_name: plan_data.plan_name,
            duration: plan_data.duration,
            response_rate: plan_data.response_rate,
            no_of_listings: plan_data.no_of_listings,
            whatsapp_notification: plan_data.whatsapp_notification,
            highlight_in_homepage: plan_data.highlight_in_homepage,
            verified_tag: plan_data.verified_tag,
            relationship_manager: plan_data.relationship_manager,
            dedicated_support: plan_data.dedicated_support,
            amount: plan_data.amount,
          };
        });
      } else if (user_type_id === '2') {
        specificData = plandata.map(plan_data => {
          return {
            plan_id: plan_data.plan_id,
            plan_name: plan_data.plan_name,
            no_of_listings: plan_data.no_of_listings,
            response_rate: plan_data.response_rate,
            featured_listing: plan_data.featured_listing,
            whatsapp_notification: plan_data.whatsapp_notification,
            urgent_sale: plan_data.urgent_sale,
            certified_agent: plan_data.certified_agent,
            relationship_manager: plan_data.relationship_manager,
            dedicated_support: plan_data.dedicated_support,
            duration: plan_data.duration,
            amount: plan_data.amount,
          };
        });
      }

      // Assuming you want to set the specific data somewhere
      setPlanData(specificData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const paymentDetails = async () => {
    console.log("Razorpay=========");

    // const paymentData = {
    //   user_id: user_id,
    //   plan_id: selectItem?.plan_id,
    // };
    // const payment_start = await fetchData.pay_plan(paymentData);
    // RazorpayCheckout.open(payment_start)
    //   .then(
    //     async ({
    //       razorpay_payment_id,
    //       razorpay_order_id,
    //       razorpay_signature,
    //     }) => {
    //       var data = {
    //         orderCreationId: paymentData?.order_id,
    //         razorpayPaymentId: razorpay_payment_id,
    //         razorpayOrderId: razorpay_order_id,
    //         razorpaySignature: razorpay_signature,
    //         plan_id: selectItem?.plan_id,
    //         user_id: user_id,
    //         plan_group: '2',
    //       };
    //       const placeOrder = await fetchData.verify_pay(data);
    //       console.log('placeOrder', placeOrder);
    //       dispatch(setPaySuccessVisible(true));
    //       navigation?.replace('TabNavigator', {user_id});
    //     },
    //   )
    //   .catch(error => {
    //     dispatch(setPayCancelVisible(true));
    //     navigation?.replace('TabNavigator', {user_id});
    //   });
  };

  function handleBackButtonClick() {
    props.setPlanVisible(false);
    navigation.replace('TabNavigator');
    return true;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  const keys = useMemo(() => {
    if (planData && planData.length > 0) {
      return Object.keys(planData[0]).filter(
        key =>
          key !== 'plan_name' &&
          key !== 'plan_id' &&
          key !== 'plan_uid' &&
          key !== 'plan_group' &&
          key !== 'amount' &&
          key !== 'plan_price' &&
          key !== 'status' &&
          key !== 'created_at' &&
          key !== 'updated_at' &&
          key !== 'get_phone_quota' &&
          key !== 'user_type_id' &&
          key !== 'duration' &&
          key !== 'response_rate' &&
          key !== 'no_of_listings',
      );
    } else {
      return [];
    }
  }, [planData]);

  const renderIcon = (value, key) => {
    if (
      key !== 'duration' &&
      key !== 'response_rate' &&
      key !== 'no_of_listings'
    ) {
      return value == '1' ? '1' : '0';
    } else {
      return value;
    }
  };

  const clickHistory = index => {
    setVisible({ ...visible, [index]: !visible[index] });
    common_fn.Accordion;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <Modal transparent visible={true} animationType="slide">
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          backgroundColor: Color.transparantBlack,
        }}
        onPress={() => {
          props.setPlanVisible(false);
          navigation.replace('TabNavigator');
        }}
      />
      <View
        style={{
          backgroundColor: Color.white,
          borderRadius: 10,
          padding: 10,
          height: cardHeight,
        }}>
        <ScrollView showsVerticalScrollIndicator>
          <TouchableOpacity
            onPress={() => {
              props.setPlanVisible(false);
              navigation.replace('TabNavigator');
            }}
            style={{
              marginRight: 10,
              // position: 'absolute',
              // left: 0,
              // right: 0,
              // top: 0,
              // bottom: 0,
              alignItems: 'flex-end',
            }}>
            <Icon name="close-circle" size={30} color={Color.red} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#EBF7EC',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.black,
                marginHorizontal: 10,
              }}>
              Your Plan Has Been Expired
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
              }}>
              Choose Your Plan
            </Text>
          </View>
          {/* <Table data={planData} /> */}
          <FlatList
            data={planData}
            // horizontal
            // showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => {
              let selecttextbg = 'black';
              let selectsubtextbg = '#666';
              // let selecttextbg = selectItem?.id === item?.id ? 'white' : 'black';
              // let selectsubtextbg = selectItem?.id === item?.id ? 'white' : '#666';

              let selectbg =
                selectItem?.plan_id === item?.plan_id ? '#008B89' : 'white';
              let selectTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              let selectSubTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              return (
                <View style={{ marginVertical: 10 }} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      clickHistory(index);
                      selectPlanItem(item, index);
                    }}
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: Color.lightgrey,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor:
                        item?.plan_id == 1 ? Color.lightgrey : selectbg,
                      width: '100%',
                      paddingVertical: 10,
                    }}
                    disabled={item?.plan_name == 'Free'}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginHorizontal: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.white,
                            fontFamily: Poppins.SemiBold,
                            paddingTop: 7,
                            backgroundColor:
                              item.plan_name == 'Free'
                                ? Color.grey
                                : item.plan_name == 'Basic'
                                  ? Color.lightgrey
                                  : item.plan_name == 'Standard'
                                    ? Color.blue
                                    : item.plan_name == 'Premium'
                                      ? Color.green
                                      : item.plan_name == 'Premium Plus'
                                        ? Color.purple
                                        : Color.sunShade,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}>
                          {item?.plan_name}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            textAlign: 'right',
                            color: selectSubTextColor,
                            fontFamily: Poppins.SemiBold,
                            textDecorationLine: 'line-through',
                          }}>
                          ₹ {item?.org_price || item?.amount * 2}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                            paddingTop: 7,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}>
                          No of Listings - {item?.no_of_listings}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            textAlign: 'right',
                            color: selectTextColor,
                            fontFamily: Poppins.SemiBold,
                            marginHorizontal: 5,
                          }}>
                          ₹ {item?.amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                            paddingTop: 7,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}>
                          Response rate - {item?.response_rate}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            textAlign: 'right',
                            color: selectTextColor,
                            fontFamily: Poppins.SemiBold,
                            marginHorizontal: 5,
                          }}>
                          ₹ {item?.duration} Days
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {visible[index] && (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        padding: 10,
                      }}>
                      {keys.map((key, index) => {
                        return (
                          <View
                            key={key}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: 5,
                            }}>
                            <Text key={item.plan_name} style={styles.cell}>
                              {key !== 'duration' &&
                                key !== 'response_rate' &&
                                key !== 'no_of_listings' ? (
                                renderIcon(item[key], key) == '1' ? (
                                  <Icon
                                    name="checkmark-circle"
                                    size={18}
                                    color={Color.green}
                                  />
                                ) : (
                                  <Icon
                                    name="close-circle"
                                    size={18}
                                    color={Color.red}
                                  />
                                )
                              ) : (
                                renderIcon(item[key], key)
                              )}
                            </Text>
                            <Text style={styles.headerCell}>
                              {common_fn.formatText(key)}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
          <Button
            title={'Purchase'}
            onPress={() => paymentDetails()}
            titleStyle={{
              fontSize: 16,
              fontFamily: Poppins.SemiBold,
              color: Color.white,
            }}
            disabled={selectPlan?.length == 0}
            // disabled={true}
            buttonStyle={{
              marginVertical: 20,
              backgroundColor: Color.primary,
            }}
          />
        </ScrollView>
      </View>
      {/* </View> */}
    </Modal>
  );
};

export const PlanPhonePurchase = props => {
  const [planData, setPlanData] = useState([]);
  var { setPhoneQuotoVisible, phoneQuotoVisible } = props;
  const [cardHeight] = useState(undefined);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectItem, setSelectItem] = useState({});
  const [selectPlan, setSelectPlan] = useState('');
  const [visible, setVisible] = useState({});
  const userData = useSelector(state => state.UserReducer.userData || {});
  var { user_id, username, mobile_number, user_type_id, change_persona, email } =
    userData;
  function selectPlanItem(item, index) {
    try {
      setSelectPlan(item.amount);
      setSelectItem(item);
    } catch (error) {
      console.log('catch in selectPlan_Item :', error);
    }
  }
  const [changeResponseText, setChangeResponseText] = useState('');

  // const getCheckOut = async () => {
  //   var data = {
  //     order_amount: selectPlan,
  //     order_id: `order_${Math.floor(Math.random() * 10000 + 1)}`,
  //     order_currency: 'INR',
  //     customer_details: {
  //       customer_id: user_id,
  //       customer_name: username,
  //       customer_email: email,
  //       customer_phone: mobile_number,
  //     },
  //     order_meta: {
  //       notify_url: 'https://test.cashfree.com',
  //     },
  //     order_note: 'some order note here',
  //   };
  //   const response = await axios.post(
  //     'https://sandbox.cashfree.com/pg/orders',
  //     data,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-client-id': 'TEST1004441509edc9fd654c1afc69b351444001',
  //         'x-client-secret': 'TESTfe5eaf6e51b092252f62e2f31bdfedfa1248206f',
  //         'x-api-version': '2022-09-01',
  //         'x-request-id': 'Veeramani',
  //       },
  //     },
  //   );
  //   const resp = {
  //     session_id: response?.data?.payment_session_id,
  //     order_id: response?.data?.order_id,
  //   };
  //   startCheckout(resp);
  // };

  // useEffect(() => {
  //   CFPaymentGatewayService.setCallback({
  //     async onVerify(orderID) {
  //       setChangeResponseText('orderId is :' + orderID);

  //       const Payments = await axios.get(
  //         `https://backend.albionpropertyhub.com/api/Payments/return_order?order_id=${orderID}&plan_id=${selectItem?.id}&user_id=${user_id}`,
  //       );
  //       console.log('Payments', Payments?.data);
  //       dispatch(setPaySuccessVisible(true));
  //       props.navigation.replace('TabNavigator', {user_id});
  //     },
  //     onError(error, orderID) {
  //       setChangeResponseText(
  //         'exception is : ' +
  //           JSON.stringify(error) +
  //           '\norderId is :' +
  //           orderID,
  //       );
  //       dispatch(setPayCancelVisible(true));
  //       props.navigation.replace('TabNavigator', {user_id});
  //     },
  //   });

  //   return () => {
  //     CFPaymentGatewayService.removeCallback();
  //   };
  // }, []);

  // const startCheckout = async response => {
  //   try {
  //     const session = new CFSession(
  //       response.session_id,
  //       response.order_id,
  //       CFEnvironment.SANDBOX,
  //     );
  //     const theme = new CFThemeBuilder()
  //       .setNavigationBarBackgroundColor('#E64A19') // ios
  //       .setNavigationBarTextColor('#FFFFFF') // ios
  //       .setButtonBackgroundColor('#FFC107') // ios
  //       .setButtonTextColor('#FFFFFF') // ios
  //       .setPrimaryTextColor('#212121')
  //       .setSecondaryTextColor('#757575') // ios
  //       .build();
  //     const dropPayment = new CFUPIIntentCheckoutPayment(session, theme);
  //     const resp = await CFPaymentGatewayService.doUPIPayment(dropPayment);
  //   } catch (e) {
  //     console.log('error msg ----------- :', e.message);
  //   }
  // };

  // function handleBackButtonClick() {
  //   console.log('Back button pressed');
  //   setPhoneQuotoVisible(false);
  //   return true;
  // }

  // useEffect(() => {
  //   console.log('Adding event listener');
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     console.log('Removing event listener');
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };
  // }, []);

  useEffect(() => {
    if (planData?.length == 0) {
      getApiData(user_type_id);
    }
  }, []);

  const getApiData = async () => {
    try {
      const data = `plan_group=1&user_type_id=1`;
      const plandata = await fetchData.check_plan(data);
      const specificData = plandata.map(plan_data => ({
        plan_id: plan_data.plan_id,
        plan_name: plan_data.plan_name,
        duration: plan_data.duration,
        get_phone_quota: plan_data.get_phone_quota,
        whatsapp_notification: plan_data.whatsapp_notification,
        dedicated_support: plan_data.dedicated_support,
        amount: plan_data.amount,
      }));
      setPlanData(specificData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const paymentDetails = async () => {
    console.log('payment details =============');

    // const paymentData = {
    //   user_id: user_id,
    //   plan_id: selectItem?.plan_id,
    // };
    // const payment_start = await fetchData.pay_plan(paymentData);
    // RazorpayCheckout.open(payment_start)
    //   .then(
    //     async ({
    //       razorpay_payment_id,
    //       razorpay_order_id,
    //       razorpay_signature,
    //     }) => {
    //       var data = {
    //         orderCreationId: paymentData?.order_id,
    //         razorpayPaymentId: razorpay_payment_id,
    //         razorpayOrderId: razorpay_order_id,
    //         razorpaySignature: razorpay_signature,
    //         plan_id: selectItem?.plan_id,
    //         user_id: user_id,
    //         plan_group: '1',
    //       };
    //       const placeOrder = await fetchData.verify_pay(data);
    //       console.log('placeOrder', placeOrder);
    //       dispatch(setPaySuccessVisible(true));
    //       navigation?.replace('TabNavigator', {user_id});
    //     },
    //   )
    //   .catch(error => {
    //     dispatch(setPayCancelVisible(true));
    //     navigation?.replace('TabNavigator', {user_id});
    //   });
  };

  const keys = useMemo(() => {
    if (planData && planData.length > 0) {
      return Object.keys(planData[0]).filter(
        key =>
          key !== 'plan_name' &&
          key !== 'plan_id' &&
          key !== 'plan_uid' &&
          key !== 'plan_group' &&
          key !== 'amount' &&
          key !== 'plan_price' &&
          key !== 'status' &&
          key !== 'created_at' &&
          key !== 'updated_at' &&
          key !== 'get_phone_quota' &&
          key !== 'user_type_id' &&
          key !== 'duration' &&
          key !== 'response_rate' &&
          key !== 'no_of_listings',
      );
    } else {
      return [];
    }
  }, [planData]);

  const renderIcon = (value, key) => {
    if (
      key !== 'duration' &&
      key !== 'response_rate' &&
      key !== 'no_of_listings'
    ) {
      return value == '1' ? '1' : '0';
    } else {
      return value;
    }
  };

  const clickHistory = index => {
    setVisible({ ...visible, [index]: !visible[index] });
    common_fn.Accordion;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <Modal transparent visible={phoneQuotoVisible} animationType="slide">
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          backgroundColor: Color.transparantBlack,
        }}
        onPress={() => {
          setPhoneQuotoVisible(false);
        }}
      />
      <View
        style={{
          backgroundColor: Color.white,
          borderRadius: 10,
          padding: 10,
          height: cardHeight,
        }}>
        <ScrollView showsVerticalScrollIndicator>
          <TouchableOpacity
            onPress={() => {
              setPhoneQuotoVisible(false);
            }}
            style={{
              marginRight: 10,
              // position: 'absolute',
              // left: 0,
              // right: 0,
              // top: 0,
              // bottom: 0,
              alignItems: 'flex-end',
            }}>
            <Icon name="close-circle" size={30} color={Color.red} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#EBF7EC',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.black,
                marginHorizontal: 10,
              }}>
              Your Plan Has Been Expired
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
              }}>
              Choose Your Plan
            </Text>
          </View>
          {/* <Table data={planData} /> */}
          <FlatList
            data={planData}
            // horizontal
            // showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => {
              let selecttextbg = 'black';
              let selectsubtextbg = '#666';
              // let selecttextbg = selectItem?.id === item?.id ? 'white' : 'black';
              // let selectsubtextbg = selectItem?.id === item?.id ? 'white' : '#666';

              let selectbg =
                selectItem?.plan_id === item?.plan_id ? '#008B89' : 'white';
              let selectTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              let selectSubTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              return (
                <View style={{ marginVertical: 10 }} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      clickHistory(index);
                      selectPlanItem(item, index);
                    }}
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: Color.lightgrey,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor:
                        item?.plan_id == 1 ? Color.lightgrey : selectbg,
                      width: '100%',
                      paddingVertical: 10,
                    }}
                    disabled={item?.plan_name == 'Free'}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginHorizontal: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.white,
                            fontFamily: Poppins.SemiBold,
                            paddingTop: 7,
                            backgroundColor:
                              item.plan_name == 'Free'
                                ? Color.grey
                                : item.plan_name == 'Basic'
                                  ? Color.lightgrey
                                  : item.plan_name == 'Standard'
                                    ? Color.blue
                                    : item.plan_name == 'Premium'
                                      ? Color.green
                                      : item.plan_name == 'Premium Plus'
                                        ? Color.purple
                                        : Color.sunShade,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}>
                          {item?.plan_name}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            textAlign: 'right',
                            color: selectSubTextColor,
                            fontFamily: Poppins.SemiBold,
                            textDecorationLine: 'line-through',
                          }}>
                          ₹ {item?.org_price || item?.amount * 2}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                            paddingTop: 7,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}>
                          No of Listings - {item?.no_of_listings}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            textAlign: 'right',
                            color: selectTextColor,
                            fontFamily: Poppins.SemiBold,
                            marginHorizontal: 5,
                          }}>
                          ₹ {item?.amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                            paddingTop: 7,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}>
                          Response rate - {item?.response_rate}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            textAlign: 'right',
                            color: selectTextColor,
                            fontFamily: Poppins.SemiBold,
                            marginHorizontal: 5,
                          }}>
                          ₹ {item?.duration} Days
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {visible[index] && (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        padding: 10,
                      }}>
                      {keys.map((key, index) => {
                        return (
                          <View
                            key={key}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: 5,
                            }}>
                            <Text key={item.plan_name} style={styles.cell}>
                              {key !== 'duration' &&
                                key !== 'response_rate' &&
                                key !== 'no_of_listings' ? (
                                renderIcon(item[key], key) == '1' ? (
                                  <Icon
                                    name="checkmark-circle"
                                    size={18}
                                    color={Color.green}
                                  />
                                ) : (
                                  <Icon
                                    name="close-circle"
                                    size={18}
                                    color={Color.red}
                                  />
                                )
                              ) : (
                                renderIcon(item[key], key)
                              )}
                            </Text>
                            <Text style={styles.headerCell}>
                              {common_fn.formatText(key)}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
          <Button
            title={'Purchase'}
            onPress={() => paymentDetails()}
            titleStyle={{
              fontSize: 16,
              fontFamily: Poppins.SemiBold,
              color: Color.white,
            }}
            disabled={selectPlan?.length == 0}
            // disabled={true}
            buttonStyle={{
              marginVertical: 20,
              backgroundColor: Color.primary,
            }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export const AgentPlanPurchase = props => {
  const [planData, setPlanData] = useState([]);
  const [cardHeight] = useState(undefined);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectItem, setSelectItem] = useState({});
  const [visible, setVisible] = useState({});
  const [selectPlan, setSelectPlan] = useState('');
  const userData = useSelector(state => state.UserReducer.userData || {});
  var { user_id, username, mobile_number, user_type_id, change_persona, email } =
    userData;
  function selectPlanItem(item, index) {
    try {
      setSelectPlan(item.amount);
      setSelectItem(item);
    } catch (error) {
      console.log('catch in selectPlan_Item :', error);
    }
  }
  const [changeResponseText, setChangeResponseText] = useState('');

  // const getCheckOut = async () => {
  //   var data = {
  //     order_amount: selectPlan,
  //     order_id: `order_${Math.floor(Math.random() * 10000 + 1)}`,
  //     order_currency: 'INR',
  //     customer_details: {
  //       customer_id: user_id,
  //       customer_name: username,
  //       customer_email: email,
  //       customer_phone: mobile_number,
  //     },
  //     order_meta: {
  //       notify_url: 'https://test.cashfree.com',
  //     },
  //     order_note: 'some order note here',
  //   };
  //   const response = await axios.post(
  //     'https://sandbox.cashfree.com/pg/orders',
  //     data,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'x-client-id': 'TEST1004441509edc9fd654c1afc69b351444001',
  //         'x-client-secret': 'TESTfe5eaf6e51b092252f62e2f31bdfedfa1248206f',
  //         'x-api-version': '2022-09-01',
  //         'x-request-id': 'Veeramani',
  //       },
  //     },
  //   );
  //   const resp = {
  //     session_id: response?.data?.payment_session_id,
  //     order_id: response?.data?.order_id,
  //   };
  //   startCheckout(resp);
  // };

  // useEffect(() => {
  //   CFPaymentGatewayService.setCallback({
  //     async onVerify(orderID) {
  //       setChangeResponseText('orderId is :' + orderID);

  //       const Payments = await axios.get(
  //         `https://backend.albionpropertyhub.com/api/Payments/return_order?order_id=${orderID}&plan_id=${selectItem?.id}&user_id=${user_id}`,
  //       );
  //       console.log('Payments', Payments?.data);
  //       dispatch(setPaySuccessVisible(true));
  //       props.navigation.replace('TabNavigator', {user_id});
  //     },
  //     onError(error, orderID) {
  //       setChangeResponseText(
  //         'exception is : ' +
  //           JSON.stringify(error) +
  //           '\norderId is :' +
  //           orderID,
  //       );
  //       dispatch(setPayCancelVisible(true));
  //       props.navigation.replace('TabNavigator', {user_id});
  //     },
  //   });

  //   return () => {
  //     CFPaymentGatewayService.removeCallback();
  //   };
  // }, []);

  // const startCheckout = async response => {
  //   try {
  //     const session = new CFSession(
  //       response.session_id,
  //       response.order_id,
  //       CFEnvironment.SANDBOX,
  //     );
  //     const theme = new CFThemeBuilder()
  //       .setNavigationBarBackgroundColor('#E64A19') // ios
  //       .setNavigationBarTextColor('#FFFFFF') // ios
  //       .setButtonBackgroundColor('#FFC107') // ios
  //       .setButtonTextColor('#FFFFFF') // ios
  //       .setPrimaryTextColor('#212121')
  //       .setSecondaryTextColor('#757575') // ios
  //       .build();
  //     const dropPayment = new CFUPIIntentCheckoutPayment(session, theme);
  //     const resp = await CFPaymentGatewayService.doUPIPayment(dropPayment);
  //   } catch (e) {
  //     console.log('error msg ----------- :', e.message);
  //   }
  // };

  useEffect(() => {
    if (planData?.length == 0) {
      getApiData(user_type_id);
    }
  }, []);

  const getApiData = async user_type_id => {
    try {
      const data = `plan_group=2&user_type_id=${user_type_id}`;
      const plandata = await fetchData.check_plan(data);
      let specificData = [];
      if (user_type_id === '1') {
        specificData = plandata.map(plan_data => {
          return {
            plan_id: plan_data.plan_id,
            plan_name: plan_data.plan_name,
            duration: plan_data.duration,
            response_rate: plan_data.response_rate,
            no_of_listings: plan_data.no_of_listings,
            whatsapp_notification: plan_data.whatsapp_notification,
            highlight_in_homepage: plan_data.highlight_in_homepage,
            verified_tag: plan_data.verified_tag,
            relationship_manager: plan_data.relationship_manager,
            dedicated_support: plan_data.dedicated_support,
            amount: plan_data.amount,
          };
        });
      } else if (user_type_id === '2') {
        specificData = plandata.map(plan_data => {
          return {
            plan_name: plan_data.plan_name,
            no_of_listings: plan_data.no_of_listings,
            response_rate: plan_data.response_rate,
            featured_listing: plan_data.featured_listing,
            whatsapp_notification: plan_data.whatsapp_notification,
            urgent_sale: plan_data.urgent_sale,
            certified_agent: plan_data.certified_agent,
            relationship_manager: plan_data.relationship_manager,
            dedicated_support: plan_data.dedicated_support,
            duration: plan_data.duration,
            amount: plan_data.amount,
          };
        });
      }

      // Assuming you want to set the specific data somewhere
      setPlanData(specificData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const paymentDetails = async () => {
    console.log("details -------");

    // const paymentData = {
    //   user_id: user_id,
    //   plan_id: selectItem?.plan_id,
    // };
    // const payment_start = await fetchData.pay_plan(paymentData);
    // RazorpayCheckout.open(payment_start)
    //   .then(
    //     async ({
    //       razorpay_payment_id,
    //       razorpay_order_id,
    //       razorpay_signature,
    //     }) => {
    //       var data = {
    //         orderCreationId: paymentData?.order_id,
    //         razorpayPaymentId: razorpay_payment_id,
    //         razorpayOrderId: razorpay_order_id,
    //         razorpaySignature: razorpay_signature,
    //         plan_id: selectItem?.plan_id,
    //         user_id: user_id,
    //         plan_group: '2',
    //       };
    //       const placeOrder = await fetchData.verify_pay(data);
    //       console.log('placeOrder', placeOrder);
    //       dispatch(setPaySuccessVisible(true));
    //       navigation?.replace('TabNavigator', {user_id});
    //     },
    //   )
    //   .catch(error => {
    //     dispatch(setPayCancelVisible(true));
    //     navigation?.replace('TabNavigator', {user_id});
    //   });
  };

  function handleBackButtonClick() {
    props.setPlanVisible(false);
    navigation.replace('TabNavigator');
    return true;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, []);

  const keys = useMemo(() => {
    if (planData && planData.length > 0) {
      return Object.keys(planData[0]).filter(
        key =>
          key !== 'plan_name' &&
          key !== 'plan_id' &&
          key !== 'plan_uid' &&
          key !== 'plan_group' &&
          key !== 'amount' &&
          key !== 'plan_price' &&
          key !== 'status' &&
          key !== 'created_at' &&
          key !== 'updated_at' &&
          key !== 'get_phone_quota' &&
          key !== 'user_type_id' &&
          key !== 'duration' &&
          key !== 'response_rate' &&
          key !== 'no_of_listings',
      );
    } else {
      return [];
    }
  }, [planData]);

  const renderIcon = (value, key) => {
    if (
      key !== 'duration' &&
      key !== 'response_rate' &&
      key !== 'no_of_listings'
    ) {
      return value == '1' ? '1' : '0';
    } else {
      return value;
    }
  };

  const clickHistory = index => {
    setVisible({ ...visible, [index]: !visible[index] });
    common_fn.Accordion;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <Modal transparent visible={props?.planVisible} animationType="slide">
      <Pressable
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          backgroundColor: Color.transparantBlack,
        }}
        onPress={() => {
          props.setPlanVisible(false);
          navigation.replace('TabNavigator');
        }}
      />
      <View
        style={{
          backgroundColor: Color.white,
          borderRadius: 10,
          padding: 10,
          height: cardHeight,
        }}>
        <ScrollView showsVerticalScrollIndicator>
          <TouchableOpacity
            onPress={() => {
              props.setPlanVisible(false);
              navigation.replace('TabNavigator');
            }}
            style={{
              marginRight: 10,
              // position: 'absolute',
              // left: 0,
              // right: 0,
              // top: 0,
              // bottom: 0,
              alignItems: 'flex-end',
            }}>
            <Icon name="close-circle" size={30} color={Color.red} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#EBF7EC',
              justifyContent: 'center',
              padding: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.black,
                marginHorizontal: 10,
              }}>
              Your Plan Has Been Expired
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontFamily: Poppins.SemiBold,
              }}>
              Choose Your Plan
            </Text>
          </View>
          {/* <Table data={planData} /> */}
          <FlatList
            data={planData}
            // horizontal
            // showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => {
              let selecttextbg = 'black';
              let selectsubtextbg = '#666';
              // let selecttextbg = selectItem?.id === item?.id ? 'white' : 'black';
              // let selectsubtextbg = selectItem?.id === item?.id ? 'white' : '#666';

              let selectbg =
                selectItem?.plan_id === item?.plan_id ? '#008B89' : 'white';
              let selectTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              let selectSubTextColor =
                selectItem?.plan_id === item?.plan_id
                  ? Color.white
                  : Color.cloudyGrey;
              return (
                <View style={{ marginVertical: 10 }} key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      clickHistory(index);
                      selectPlanItem(item, index);
                    }}
                    style={{
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: Color.lightgrey,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor:
                        item?.plan_id == 1 ? Color.lightgrey : selectbg,
                      width: '100%',
                      paddingVertical: 10,
                    }}
                    disabled={item?.plan_name == 'Free'}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginHorizontal: 20,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Color.white,
                            fontFamily: Poppins.SemiBold,
                            paddingTop: 7,
                            backgroundColor:
                              item.plan_name == 'Free'
                                ? Color.grey
                                : item.plan_name == 'Basic'
                                  ? Color.lightgrey
                                  : item.plan_name == 'Standard'
                                    ? Color.blue
                                    : item.plan_name == 'Premium'
                                      ? Color.green
                                      : item.plan_name == 'Premium Plus'
                                        ? Color.purple
                                        : Color.sunShade,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}>
                          {item?.plan_name}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            textAlign: 'right',
                            color: selectSubTextColor,
                            fontFamily: Poppins.SemiBold,
                            textDecorationLine: 'line-through',
                          }}>
                          ₹ {item?.org_price || item?.amount * 2}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                            paddingTop: 7,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}>
                          No of Listings - {item?.no_of_listings}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            textAlign: 'right',
                            color: selectTextColor,
                            fontFamily: Poppins.SemiBold,
                            marginHorizontal: 5,
                          }}>
                          ₹ {item?.amount}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            color: Color.black,
                            fontFamily: Poppins.SemiBold,
                            paddingTop: 7,
                            borderRadius: 10,
                            paddingVertical: 5,
                            paddingHorizontal: 5,
                          }}>
                          Response rate - {item?.response_rate}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 12,
                            textAlign: 'right',
                            color: selectTextColor,
                            fontFamily: Poppins.SemiBold,
                            marginHorizontal: 5,
                          }}>
                          ₹ {item?.duration} Days
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {visible[index] && (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                        padding: 10,
                      }}>
                      {keys.map((key, index) => {
                        return (
                          <View
                            key={key}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              marginVertical: 5,
                            }}>
                            <Text key={item.plan_name} style={styles.cell}>
                              {key !== 'duration' &&
                                key !== 'response_rate' &&
                                key !== 'no_of_listings' ? (
                                renderIcon(item[key], key) == '1' ? (
                                  <Icon
                                    name="checkmark-circle"
                                    size={18}
                                    color={Color.green}
                                  />
                                ) : (
                                  <Icon
                                    name="close-circle"
                                    size={18}
                                    color={Color.red}
                                  />
                                )
                              ) : (
                                renderIcon(item[key], key)
                              )}
                            </Text>
                            <Text style={styles.headerCell}>
                              {common_fn.formatText(key)}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />
          <Button
            title={'Purchase'}
            onPress={() => paymentDetails()}
            titleStyle={{
              fontSize: 16,
              fontFamily: Poppins.SemiBold,
              color: Color.white,
            }}
            disabled={selectPlan?.length == 0}
            // disabled={true}
            buttonStyle={{
              marginVertical: 20,
              backgroundColor: Color.primary,
            }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default PlanPurchase;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  headerCell: {
    width: 120,
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
    color: Color.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    width: 120,
    textAlign: 'center',
    paddingVertical: 10,
    color: Color.black,
  },
  headerText: {
    color: Color.black,
    textAlign: 'center',
  },
  evenRow: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  oddRow: {
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
});
