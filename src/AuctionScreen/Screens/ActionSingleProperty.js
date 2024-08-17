import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  Modal,
  Pressable,
  TextInput,
  SafeAreaView,
  Share,
  PermissionsAndroid,
  BackHandler,
  Platform,
} from 'react-native';
import { Media } from '../../Global/Media';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import { Button, Divider } from 'react-native-elements';
import { Poppins } from '../../Global/FontFamily';
import { useSelector } from 'react-redux';
import common_fn from '../../Config/common_fn';
import SimilarAuction from './SimilarAuction';
import moment from 'moment';
import {
  base_albionbankauctions_url,
  base_auction_image_url,
} from '../../Config/base_url';
import fetchData from '../../Config/fetchData';
import RNFetchBlob from 'rn-fetch-blob';
import ImageView from '../Auctioncomponents/imageView';
import { useRoute } from '@react-navigation/native';
import AuctionBottomLogin from '../Auctioncomponents/AuctionBottomLogin';

var { width, height } = Dimensions.get('screen');

const ActionSingleProperty = ({ navigation, route }) => {
  const routeName = useRoute();
  const [item] = useState(route.params.item);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [discMoreButton, setDiscShowMoreButton] = useState(false);
  const [discriptiontextShown, setDiscriptiontextShown] = useState(false);
  const [disclaimertextShown, setDisclaimerTextShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numLines, setNumLines] = useState(undefined);
  const [discnumLines, setdiscNumLines] = useState(undefined);
  const [cardHeight, setCardHeight] = useState(undefined);
  const [ProductData, setProductData] = useState({});
  const [InterestVisible, setInterestVisible] = useState(false);
  const [loginEnable, setLoginEnable] = useState(false);
  const [ReservedPriceFrom, setReservedPriceFrom] = useState('');
  const [check_interest, setCheck_interest] = useState('');
  const [ReservedPriceTo, setReservedPriceTo] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;
  const Auction_userData = useSelector(
    state => state.UserReducer.auctionUserData,
  );
  var { id, name, phone_number, email } = Auction_userData;

  const toggleTextShown = () => {
    setDiscriptiontextShown(!discriptiontextShown);
  };

  useEffect(() => {
    setNumLines(discriptiontextShown ? undefined : 3);
    setdiscNumLines(disclaimertextShown ? undefined : 3);
  }, [discriptiontextShown, disclaimertextShown]);

  const onDescriptionTextLayout = useCallback(
    e => {
      if (e.nativeEvent.lines.length > 3 && !discriptiontextShown) {
        setShowMoreButton(true);
        setNumLines(3);
      }
    },
    [discriptiontextShown],
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://albionbankauctions.com/web/view-auctions/${item?.file_id}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [Land] = useState([
    {
      id: 1,
      name: 'Immovable',
    },
    {
      id: 2,
      name: 'Land And Building',
    },
  ]);

  const [aution_related_doc] = useState([
    {
      id: 1,
      name: 'Pan Card',
      description:
        'This promotes trust among auction participants and helps maintain the credibility of the auction process.',
    },
    {
      id: 2,
      name: 'Auction Bid Form',
      description:
        'This documentation is essential for transparency in the auction process and aids in settling any disputes that may arise during or after the auction.',
    },
    {
      id: 3,
      name: 'Proof Of Address',
      description: `Proof of address is essential for regulatory compliance and confirmation of the bidder's residence.`,
    },
  ]);

  const interestfn = async () => {
    try {
      var data = {
        user_id: id,
        auction_id: item?.file_id,
        from_interest_reserve_price: 0,
        to_interest_reserve_price_max: 0,
      };
      const interest = await fetchData.Auction_add_interest(data);
      if (interest) {
        setInterestVisible(false);
        check_interestfn();
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast(interest?.message);
        } else {
          alert(interest?.message);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const removeInterestfn = async () => {
    try {
      var data = {
        user_id: id,
        auction_id: item?.file_id,
      };
      const removeinterest = await fetchData.Auction_remove_interest(data);
      if (removeinterest) {
        check_interestfn();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const check_interestfn = async () => {
    try {
      var data = `user_id=` + id + '&auction_id=' + item?.file_id;
      const check_interestData = await fetchData.Auction_check_interest(data);
      console.log(
        'check_interestData?.interested',
        check_interestData?.interested,
      );
      setCheck_interest(check_interestData?.interested);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    check_interestfn();
    setLoading(true);
    const interval = setTimeout(async () => {
      setLoading(false);
    }, 2000);
    return () => clearInterval(interval);
  }, [check_interest]);

  function handleBackButtonClick() {
    if (routeName.name == 'ActionSingleProperty') {
      navigation.goBack();
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadImage();
        } else {
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = async () => {
    try {
      let date = new Date();
      let image_URL = base_albionbankauctions_url + item?.nit_document;
      const { config, fs } = RNFetchBlob;
      let DownloadDir = fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            DownloadDir +
            '/Albion/' +
            'File_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            '.zip',
          description: 'Image',
        },
      };

      const response = await config(options).fetch('GET', image_URL);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Handle the error, e.g., show an alert to the user
    }
  };
  
  const propertyImages = {
    property_img_1: item?.property_img_1,
    property_img_2: item?.property_img_2,
    property_img_3: item?.property_img_3,
    property_img_4: item?.property_img_4,
    property_img_5: item?.property_img_5,
  };

  const propertyImagesArray = Object.entries(propertyImages)
    .filter(([key, value]) => value !== null)
    .map(([key, value]) => ({ index: key, image_url: value }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
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
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              {
                useNativeDriver: false,
              },
            )}>
            <View style={styles.header}>
              <View style={styles.header_row}>
                <TouchableOpacity
                  style={styles.backIcon}
                  onPress={() => navigation.goBack()}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: Color.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                    }}>
                    <Icon name="arrow-back" size={24} color={Color.black} />
                  </View>
                </TouchableOpacity>
                <View style={styles.iconView}>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: Color.white,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 100,
                      padding: 10,
                      marginRight: 10,
                    }}
                    onPress={() => {
                      onShare();
                    }}>
                    <Icon
                      name="share-outline"
                      size={20}
                      color={Color.black}
                    // style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      // flex: 1,
                      alignItems: 'center',
                      backgroundColor: Color.white,
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      justifyContent: 'center',
                      marginRight: 10,
                    }}
                    onPress={() => {
                      id == undefined ||
                        (Auction_userData?.length > 0 &&
                          Auction_userData == undefined)
                        ? setLoginEnable(true)
                        : check_interest
                          ? removeInterestfn()
                          : setInterestVisible(true);
                    }}>
                    <Icon
                      name={check_interest ? 'heart' : 'heart-outline'}
                      size={22}
                      color={check_interest ? Color.primary : Color.black}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                zIndex: 1,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              {propertyImagesArray?.length > 0 || loading ? (
                <ImageView images={propertyImagesArray} />
              ) : (
                <Image
                  source={{ uri: Media.noImage }}
                  style={{ width: '100%', height: 250, resizeMode: 'contain' }}
                />
              )}
              {/* <Image
                source={{uri: base_auction_image_url + item?.bank_logo}}
                style={{width: '100%', height: 250, resizeMode: 'contain'}}
              /> */}
            </View>
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  // alignItems: 'flex-start',
                }}>
                {item?.nit_document != null && (
                  <Button
                    title={'Download Document'}
                    titleStyle={{
                      fontFamily: Poppins.SemiBold,
                      fontSize: 12,
                      color: Color.white,
                    }}
                    buttonStyle={{
                      backgroundColor: check_interest
                        ? Color.cloudyGrey
                        : '#239D0F',
                    }}
                    containerStyle={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                    onPress={() => {
                      checkPermission();
                    }}
                  />
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 18,
                        marginVertical: 5,
                        color: Color.lightBlack,
                        fontFamily: Poppins.SemiBold,
                        marginHorizontal: 5,
                      }}
                      numberOfLines={2}>
                      {item?.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // marginHorizontal: 10,
                      }}>
                      <Icon
                        name={'location'}
                        size={18}
                        style={{ color: Color.primary }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          color: Color.cloudyGrey,
                          marginHorizontal: 5,
                        }}>
                        {`${item?.district} ,${item?.state}`}
                      </Text>
                    </View>
                  </View>
                  <Button
                    title={
                      check_interest ? 'Remove Interest' : 'I’m Interested'
                    }
                    titleStyle={{
                      fontFamily: Poppins.SemiBold,
                      fontSize: 12,
                      color: Color.white,
                    }}
                    buttonStyle={{
                      backgroundColor: check_interest
                        ? Color.cloudyGrey
                        : '#239D0F',
                    }}
                    onPress={() => {
                      id == undefined ||
                        (Auction_userData?.length > 0 &&
                          Auction_userData == undefined)
                        ? setLoginEnable(true)
                        : check_interest
                          ? removeInterestfn()
                          : setInterestVisible(true);
                    }}
                  />
                </View>
                <View
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    padding: 5,
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 8,
                    borderRadius: 10,
                    backgroundColor: Color.white,
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 20,
                      marginHorizontal: 20,
                    }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 20,
                          color: Color.primary,
                          fontFamily: Poppins.SemiBold,
                          textTransform: 'capitalize',
                        }}
                        numberOfLines={2}>
                        ₹
                        {item?.reserve_price?.length >= 5
                          ? common_fn.formatNumberWithSuffix(
                            item?.reserve_price,
                          )
                          : item?.reserve_price}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: Color.cloudyGrey,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        Reserve Price
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 40,
                        backgroundColor: Color.primary,
                        width: 2,
                        marginHorizontal: 10,
                      }}
                    />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Color.primary,
                          fontFamily: Poppins.SemiBold,
                        }}
                        numberOfLines={2}>
                        ₹{' '}
                        {common_fn.formatNumberIndianEnglishCommas(
                          item?.emd_amount,
                        )}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: Color.cloudyGrey,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        EMD Amount
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 40,
                        backgroundColor: Color.primary,
                        width: 2,
                        marginHorizontal: 10,
                      }}
                    />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: Color.primary,
                          fontFamily: Poppins.SemiBold,
                        }}
                        numberOfLines={2}>
                        {item?.area}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: Color.cloudyGrey,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        {item?.area_size}
                      </Text>
                    </View>
                  </View>

                  <Divider style={{ height: 1 }} />
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          flex: 1,
                          fontFamily: Poppins.Medium,
                          fontSize: 12,
                          color: Color.cloudyGrey,
                        }}>
                        {' '}
                        Auction ID :
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: Poppins.SemiBold,
                            fontSize: 14,
                            color: Color.black,
                          }}>
                          {' '}
                          {item?.id}
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: Poppins.Medium,
                          fontSize: 12,
                          color: Color.cloudyGrey,
                        }}>
                        Auction Date -
                        <Text
                          style={{
                            flex: 1,
                            fontFamily: Poppins.SemiBold,
                            fontSize: 14,
                            color: Color.black,
                          }}>
                          {' '}
                          {moment(item?.created_at).format('DD/MM/YYYY')}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-start', marginVertical: 10 }}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: Poppins.SemiBold,
                      fontSize: 16,
                    }}>
                    Property Description
                  </Text>
                  <Text
                    onTextLayout={onDescriptionTextLayout}
                    style={{
                      fontSize: 12,
                      color: Color.cloudyGrey,
                      textAlign: 'justify',
                      fontFamily: Poppins.Regular,
                      lineHeight: 24,
                      paddingHorizontal: 10,
                    }}
                    numberOfLines={numLines}>
                    {!discriptiontextShown
                      ? item?.property_description
                        .substring(0, 120)
                        .concat('...')
                      : item?.property_description}{' '}
                    {showMoreButton || numLines > 2 ? (
                      <Text
                        onPress={toggleTextShown}
                        style={{
                          color: Color.primary,
                          fontFamily: Poppins.SemiBold,
                          fontSize: 14,
                        }}>
                        {discriptiontextShown ? 'Read Less' : 'Read More'}
                      </Text>
                    ) : null}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <FIcon name="check" size={18} color={Color.primary} />
                    <Text
                      style={{
                        color: Color.lightBlack,
                        fontSize: 16,
                        marginHorizontal: 5,
                        fontFamily: Poppins.Medium,
                      }}>
                      {item?.property_category}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: Color.lightgrey,
                    alignItems: 'center',
                    marginHorizontal: 10,
                    padding: 10,
                    marginVertical: 10,
                    backgroundColor: '#F2F2F250',
                  }}>
                  <Image
                    source={{ uri: base_auction_image_url + item?.bank_logo }}
                    style={{ width: 50, height: 50, resizeMode: 'contain' }}
                  />
                  <View style={{ marginHorizontal: 10, flex: 1 }}>
                    <Text
                      style={{
                        color: Color.black,
                        fontSize: 16,
                        marginHorizontal: 5,
                        fontFamily: Poppins.SemiBold,
                      }}
                      numberOfLines={2}>
                      {item?.event_bank}
                    </Text>
                    <Text
                      style={{
                        color: Color.cloudyGrey,
                        fontSize: 12,
                        marginHorizontal: 5,
                        fontFamily: Poppins.Regular,
                      }}>
                      {'Event Bank'}
                    </Text>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    Borrower's Details
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={{ uri: Media.Userpng }}
                      style={{ width: 80, height: 80, resizeMode: 'contain' }}
                    />
                    <View style={{ marginHorizontal: 10 }}>
                      <Text
                        style={{
                          color: Color.black,
                          fontSize: 16,
                          fontFamily: Poppins.SemiBold,
                        }}>
                        {item?.borrowers_name}
                      </Text>
                      <Text
                        style={{
                          color: Color.grey,
                          fontSize: 12,
                          fontFamily: Poppins.Medium,
                        }}>
                        {item?.district}
                        {item?.state}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      color: Color.black,
                      fontSize: 16,
                      fontFamily: Poppins.SemiBold,
                      marginVertical: 10,
                    }}>
                    Auction Related Documents
                  </Text>
                  {aution_related_doc?.map((item, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          padding: 10,
                        }}
                        key={index}>
                        <FIcon name="check" size={16} color={Color.green} />
                        <View style={{ marginHorizontal: 10 }}>
                          <Text
                            style={{
                              color: Color.black,
                              fontSize: 14,
                              fontFamily: Poppins.SemiBold,
                            }}>
                            {item?.name}
                          </Text>
                          <Text
                            style={{
                              color: Color.cloudyGrey,
                              fontSize: 12,
                              fontFamily: Poppins.Regular,
                            }}>
                            {item?.description}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
            <SimilarAuction navigation={navigation} AuctionProperty={item} />
          </ScrollView>
          <Modal transparent visible={InterestVisible} animationType="slide">
            <Pressable
              style={{ flex: 1, backgroundColor: Color.transparantBlack }}
              onPress={() => {
                setInterestVisible(false);
              }}
            />
            <View
              style={{
                backgroundColor: Color.white,
                padding: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: cardHeight,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setInterestVisible(false);
                }}
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  backgroundColor: Color.primary,
                  borderRadius: 100,
                  padding: 10,
                  right: 10,
                  top: 10,
                  zIndex: 1,
                }}>
                <MIcon name="close" size={18} color={Color.white} />
              </TouchableOpacity>
              <Text
                style={{
                  color: Color.lightBlack,
                  fontFamily: Poppins.SemiBold,
                  fontSize: 18,
                }}>
                Interested Details
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Color.lightgrey,
                    borderRadius: 10,
                    padding: 10,
                  }}>
                  <Image
                    source={{
                      uri: base_auction_image_url + item?.bank_logo,
                    }}
                    style={{ width: 80, height: 80, resizeMode: 'contain' }}
                  />
                </View>
                <View style={{ marginHorizontal: 10, flex: 1 }}>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.Medium,
                      fontSize: 14,
                    }}>
                    Auction ID : {item?.id}
                  </Text>
                  <Text
                    style={{
                      color: Color.lightBlack,
                      fontFamily: Poppins.SemiBold,
                      fontSize: 18,
                    }}>
                    {item?.title}
                  </Text>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.Medium,
                      fontSize: 14,
                    }}>
                    {`${item?.district} ,${item?.state}`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.Medium,
                      fontSize: 12,
                    }}>
                    Area
                  </Text>
                  <Text
                    style={{
                      color: Color.lightBlack,
                      fontFamily: Poppins.SemiBold,
                      fontSize: 16,
                    }}>
                    {item?.area} {item?.area_size}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.Medium,
                      fontSize: 12,
                    }}>
                    Reserve Price
                  </Text>
                  <Text
                    style={{
                      color: Color.lightBlack,
                      fontFamily: Poppins.SemiBold,
                      fontSize: 16,
                    }}>
                    ₹ {item?.reserve_price}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.Medium,
                      fontSize: 12,
                    }}>
                    EMD Price
                  </Text>
                  <Text
                    style={{
                      color: Color.lightBlack,
                      fontFamily: Poppins.SemiBold,
                      fontSize: 16,
                    }}>
                    ₹ {item?.emd_amount}
                  </Text>
                </View>
              </View>
              {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.Medium,
                      fontSize: 14,
                    }}>
                    Reserve Price From :
                  </Text>
                  <TextInput
                    placeholder="₹ 00,00,000"
                    placeholderTextColor={Color.cloudyGrey}
                    value={ReservedPriceFrom}
                    onChangeText={value => {
                      setReservedPriceFrom(value);
                    }}
                    keyboardType="number-pad"
                    style={{
                      borderColor: Color.lightgrey,
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.Medium,
                      marginRight: 10,
                    }}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.Medium,
                      fontSize: 14,
                    }}>
                    Reserve Price To :
                  </Text>
                  <TextInput
                    placeholder="₹ 00,00,000"
                    placeholderTextColor={Color.cloudyGrey}
                    value={ReservedPriceTo}
                    onChangeText={value => {
                      setReservedPriceTo(value);
                    }}
                    keyboardType="number-pad"
                    style={{
                      borderColor: Color.lightgrey,
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingHorizontal: 10,
                      fontSize: 14,
                      color: Color.cloudyGrey,
                      fontFamily: Poppins.Medium,
                      marginRight: 10,
                    }}
                  />
                </View>
              </View> */}
              <Button
                title={'Submit'}
                titleStyle={{
                  fontSize: 16,
                  fontFamily: Poppins.SemiBold,
                  color: Color.white,
                }}
                buttonStyle={{
                  marginVertical: 20,
                  backgroundColor: Color.primary,
                }}
                onPress={() => {
                  interestfn();
                }}
              />
            </View>
          </Modal>
        </View>
      )}
      {loginEnable == true && (
        <AuctionBottomLogin login={loginEnable} setLogin={setLoginEnable} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: width,
    // height: height,
    backgroundColor: Color.white,
  },
  header: {
    position: 'absolute',
    top: 0,
    height: 50,
    width: '100%',
    zIndex: 3,
  },
  header_row: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIcon: {
    paddingHorizontal: 10,
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingEnd: 2,
    height: 30,
  },
  icon: {
    paddingEnd: 12,
  },
});

export default ActionSingleProperty;
