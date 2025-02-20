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
  Share, BackHandler,
  Platform,
  ActivityIndicator,
  LogBox, FlatList
} from 'react-native';
import { Media } from '../../Global/Media';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import { Poppins } from '../../Global/FontFamily';
import { useSelector } from 'react-redux';
import common_fn from '../../Config/common_fn';
import SimilarAuction from './SimilarAuction';
import moment from 'moment';
import {
  base_albionbankauctions_url,
  base_auction_image_url,
  baseUrl,
} from '../../Config/base_url';
import fetchData from '../../Config/fetchData';
import RNFetchBlob from 'rn-fetch-blob';
import ImageView from '../Auctioncomponents/imageView';
import { useRoute } from '@react-navigation/native';
import AuctionBottomLogin from '../Auctioncomponents/AuctionBottomLogin';
import { Iconviewcomponent } from '../../Components/Icontag';
import RNFS from 'react-native-fs';
import { scr_width } from '../../Utils/Dimensions';
import AuctionHistory from './AuctionHistory';

export const downloadFile = async (url, path) => {
  const download = RNFS.downloadFile({
    fromUrl: url.image_url,
    toFile: path,
  });

  const result = await download.promise;
  if (result.statusCode !== 200) {
    throw new Error(`Failed to download image: ${url}`);
  }
  return result;
};

var { width, height } = Dimensions.get('screen');

LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

const ActionSingleProperty = ({ navigation, route }) => {
  console.log(route.params,"<----------------fr");
  
  const routeName = useRoute();
  const [item,setitem] = useState(null);
  const result_sub_category = item?.property_sub_category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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

  const [HomeLoanVisible, setHomeLoanVisible] = useState(false);
  const [requestModal, setRequestModal] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const data = useSelector(
    state => state.UserReducer.auctionUserData,
  );

  const starImageCorner = Media.starOutline;
  const [defaultRating, setDefaultRating] = useState(null);
  const starImageFilled = Media.star;

  const [updateLoader, setUpdateLoader] = useState(false);
  const [comments, setComments] = useState('');
  const [compareDate, setCompareDate] = useState('');
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
  const [expireDate, setExpireDate] = useState('')
  const [planStatus, setPlanStatus] = useState('')
  const [expireStatus, setExpiredStatus] = useState('')
  const [Usermail, setUsermail] = useState("");
  const [emailValidError, setEmailValidError] = useState('');

  const getSingleApi = async () => {
    try {
      setLoading(true)
      const payload = route.params?.history ? `repost_id=${route?.params?.item?.id}` :`id=${route?.params?.item?.id}`
      const getSingleData = await fetchData?.fetchAuction(payload);
      console.log("<----------------Api",getSingleData);
      
      if (getSingleData) {
        setitem(getSingleData)
      }
    } catch (error) {
      console.log("error", error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  // async function getPropertyDetail(){
  //   try {
  //     const response = await fetchData.fetchAuction(item.id)
  //     console.log(response,"><<<<<");

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   (
  //     async () => {
  //       getPropertyDetail()
  //     }
  //   )()
  // }, [])

  useEffect(() => {
    (
      async () => {
        getSingleApi();
        plan_CheckData()
      }
    )()
  }, [])
  

  useEffect(() => {
    if (data?.id && item?.file_id) {
      setLoading(true);
      check_interestfn();
      const interval = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data?.id, item?.file_id]);

  useEffect(() => {
    setNumLines(discriptiontextShown ? undefined : 3);
    setdiscNumLines(disclaimertextShown ? undefined : 3);
  }, [discriptiontextShown, disclaimertextShown]);

  const plan_CheckData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("accept", "*/*");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      // fetch(`http://192.168.29.204:5000/api/plan/user?user_id=${data?.id}`, requestOptions)
      fetch(`${baseUrl}api/plan/user?user_id=${data?.id}&status=activated`, requestOptions)
        // fetch(`https://api.albionbankauctions.com/api/plan/user?user_id=${data?.id}&status=activated`, requestOptions)
        .then((response) => response.json())
        .then((result) => {

          if (result?.status == true) {
            setExpireDate(moment(result?.data[0]?.expires_at).format('DD-MM-YYYY'));
            setPlanStatus(result?.data[0]?.plan_id)
            setExpiredStatus(result?.data[0]?.status)
          }
        }
        )
        .catch((error) => console.error(error));

    } catch (error) {
      console.log("catch in plan_CheckData_Home : ", error);
    }
  }

  const handleRatingPress = item => {
    if (defaultRating === item) {
      setDefaultRating(null);
    } else {
      setDefaultRating(item);
    }
  };


  console.log(userHaveActivePlan,expireStatus,expireStatus !== 'expired' && planStatus > 1,planStatus,"<<<<<<<userHaveActivePlan");
  

  const toggleTextShown = () => {
    if (userHaveActivePlan) {
      setDiscriptiontextShown(!discriptiontextShown);
    }
    else {
      navigation.navigate("AuctionPrime");
    }
  };

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
      var interestdata = {
        user_id: data?.id,
        auction_id: item?.file_id,
        from_interest_reserve_price: 0,
        to_interest_reserve_price_max: 0,
      };
      const interest = await fetchData.Auction_add_interest(interestdata);

      if (interest?.message) {
        if (Platform.OS === 'android') {
          common_fn.showToast(interest?.message);
        } else {
          alert(interest?.message);
        }
        check_interestfn();
        setInterestVisible(false);
        setHomeLoanVisible(true);
      } else {
        setHomeLoanVisible(false);
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
      var removedata = {
        user_id: data?.id,
        auction_id: item?.file_id,
      };
      const removeinterest = await fetchData.Auction_remove_interest(removedata);
      if (removeinterest) {
        check_interestfn();
        setDefaultRating(null);
        setComments('');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const check_interestfn = async () => {
    try {
      const checkdata = `user_id=${data?.id}&auction_id=${item?.file_id}`;
      const check_interestData = await fetchData.Auction_check_interest(checkdata);
      if (check_interestData?.interested == true) {
        setCheck_interest(check_interestData.interested);
      } else {
        setCheck_interest("");
      }



      // if (check_interestData?.interested == true) {
      //   console.log('check_interestData?.interested =================:', check_interestData.interested);
      //   setCheck_interest(check_interestData.interested);
      // } else {
      //   console.warn('No interest data found. Response:', check_interestData);
      //   setCheck_interest(null); // Or set to a default value
      // }
    } catch (error) {
      setCheck_interest(null); // Handle error by setting a fallback value
      console.log('catch in check_interestfn_API :', error);
    }
  };




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
        downloadImage();
      } catch (err) {
        console.warn('Permission error:', err);
      }
    }
  };

  const downloadImage = async () => {
    try {
      let date = new Date();
      let image_URL = base_albionbankauctions_url + item?.nit_document;
      const { config, fs } = RNFetchBlob;
      let DownloadDir = fs.dirs.DownloadDir;
      console.log("DownloadDir", DownloadDir);
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
      console.log("rrrrrrrr", options);


      const response = await config(options).fetch('GET', image_URL)
        .progress((received, total) => {
          console.log('Download Progress:', (received / total) * 100, '%');
        });


      if (response) {
        common_fn.showToast("Document downloaded successfully!");
        // common_fn.showToast("File downloaded to :", JSON.stringify(response));
      } else {
        common_fn.showToast("Failed to download documents, Try after some times");
      }
    } catch (error) {
      console.log('Error downloading image:', error?.message);
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
    // .map(([key, value]) => `https://albionbankauctions.com/${value}`)
    .map(([key, value]) => ({ index: key, image_url: value }))



  const feedbackSubmitClick = async () => {
    try {
      setUpdateLoader(true);
      if (defaultRating != null && comments != '') {
        var feedbackdata = {
          user_id: data?.id,
          rating: defaultRating,
          feedback: comments
        };
        // console.log("feedbackdata ------------- :", feedbackdata);
        const feedbackresponse = await fetchData.Auction_feedbackData(feedbackdata);
        // console.log("SUCCESS ------------- :", feedbackresponse);

        if (feedbackresponse?.status == true) {
          common_fn.showToast(feedbackresponse?.message);
          setHomeLoanVisible(false);
          // navigation.navigate("ActionHome");
          setUpdateLoader(false);
        } else {
          common_fn.showToast(feedbackresponse?.message);
          setHomeLoanVisible(false);
          // navigation.navigate("ActionHome");
          setUpdateLoader(false);
        }
      } else {
        common_fn.showToast("Please select your rating and enter your comments");
        setUpdateLoader(false);
      }

    } catch (error) {
      console.log("catch in feedbackSubmit_Click : ", error);
    }
  }

  useEffect(() => {
    try {
      const auctionStartDateTime = new Date(item?.auction_start_date_and_time); // Parse the auction date
      const currentDateTime = new Date(); // Get the current date and time
      if (auctionStartDateTime > currentDateTime) {
        setCompareDate("Greater")
      } else if (auctionStartDateTime < currentDateTime) {
        setCompareDate("Lessthan")
      } else {
        setCompareDate("Current Date")
      }
    } catch (error) {
      console.log("catch in  useEffect================= :", error);
    }
  }, [])

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (val.length === 0) {
      setEmailValidError('Enter email address');
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  const requestSubmitClick = async () => {
    try {
      setUpdateLoader(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "file_id": item?.file_id,
        "email": data?.email
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(`${baseUrl}api/auction/request-property`, requestOptions)
        // fetch("https://api.albionbankauctions.com/api/auction/request-property", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log("Request Prop resp ============== :", result);
          if (result?.status == true) {
            common_fn.showToast("Property Requested Successfully, Thank You!");
            setRequestModal(false);
            setUpdateLoader(false);
          } else {
            common_fn.showToast(result?.message);
            setUpdateLoader(false);
            setRequestModal(false);
          }
        })
        .catch((error) => console.error("catch in requestSubmitClick_api:", error));

    } catch (error) {
      setRequestModal(false);
    }
  }

  const downloadPropertyImages = async () => {
    try {
      let imageArray = propertyImagesArray.map(item => `https://albionbankauctions.com/${item.image_url}`)
      let date = new Date();
      const { dirs } = RNFetchBlob.fs;
      const DownloadDir = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;;
      const zipFilePath = `${DownloadDir}/Albion/Images_${Math.floor(date.getTime() + date.getSeconds() / 2)}.zip`;
      const imagePaths = [];
      for (let i = 0; i < imageArray.length; i++) {
        let imageURL = imageArray[i];
        const imageFilePath = `${DownloadDir}/Albion/Image_${i + 1}.jpg`;
        const options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: imageFilePath,
            description: `Downloading Image ${i + 1}`,
          },
        };
        const response = await RNFetchBlob.config(options).fetch('GET', imageURL);
        if (response) {
          imagePaths.push(imageFilePath);
        } else {
          console.error(`Failed to download image ${i + 1}`);
          common_fn.showToast("Failed to download some images");
        }
      }
      if (imagePaths.length === imageArray.length) {
        common_fn.showToast(`Images Downloaded Successfully`);
      }
    } catch (error) {
      console.error("Error in download and zip process:", error);
      // common_fn.showToast("An error occurred while downloading images");
    }
  };

  let userHaveActivePlan = expireStatus !== 'expired' && planStatus > 1

  return (
    loading ? <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
      }}>
      <Image
        source={{ uri: Media.loader }}
        style={{ width: 80, height: 80, resizeMode: 'contain' }}
      />
    </View> :
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
              )}
            >
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
                        if (data?.id == undefined) {
                          // navigation.navigate("ActionLogin");
                          navigation.navigate("LoginWithEmail");
                        } else {
                          onShare();
                        }
                      }}>
                      <Icon
                        name="share-outline"
                        size={20}
                        color={Color.black}
                      />
                    </TouchableOpacity>

                    {compareDate == "Lessthan" ?
                      null
                      :
                      <TouchableOpacity
                        style={{
                          alignItems: 'center',
                          backgroundColor: Color.white,
                          width: 40,
                          height: 40,
                          borderRadius: 100,
                          justifyContent: 'center',
                          marginRight: 10,
                        }}
                        onPress={() => {
                          data?.id == undefined
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
                      </TouchableOpacity>}
                  </View>
                </View>
              </View>
              <View
                style={{
                  zIndex: 1,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
              >
                {loading || (propertyImagesArray?.length > 0) ? (
                  <ImageView images={propertyImagesArray} id={data?.id} navigation={navigation} />
                )
                  : (
                    <Image
                      source={{ uri: Media.noImage }}
                      style={{ width: '100%', height: 250, resizeMode: 'contain' }}
                    />
                  )}
              </View>
              <View style={{ padding: 10 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>

                  <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                    <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 16,
                          color: Color.black,
                          fontFamily: Poppins.Bold,
                          marginHorizontal: 5,
                        }}
                        numberOfLines={2}>
                        {item?.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center', paddingVertical: 0
                        }}>
                        <Icon
                          name={'location'}
                          size={18}
                          style={{ color: Color.primary }}
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: Color.black, fontFamily: Poppins.SemiBold,
                            marginHorizontal: 5,
                          }}>
                          {`${item?.district}, ${item?.state}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "flex-end", width: scr_width - 20, marginTop: 5 }}>
                    {/* <TouchableOpacity onPress={userHaveActivePlan ? propertyImagesArray?.some(item => item != null) ? () => downloadPropertyImages() : () => common_fn.showToast('No Images For This Property') : () => navigation.navigate("AuctionPrime")} style={{ padding: 7, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 5, width: '40%' }}>
                    <Text style={{ fontSize: 12, color: Color.white, fontFamily: Poppins.Medium }}>Download Images</Text>
                  </TouchableOpacity> */}
                    <View style={{ alignItems: "center", justifyContent: "center", borderColor: Color.primary, borderWidth: 1, borderRadius: 5, width: '60%', padding: 5 }}>
                      {compareDate == "Lessthan" ?
                        (<TouchableOpacity onPress={() => setRequestModal(true)} style={{ padding: 7, paddingHorizontal: 15, backgroundColor: Color.white, borderRadius: 5 }}>
                          <Text style={{ fontSize: 12, color: Color.primary, fontFamily: Poppins.Medium }}>Request this Property</Text>
                        </TouchableOpacity>) :
                        <Button
                          title={
                            check_interest ? 'Remove Interest' : 'I’m Interested'
                          }
                          titleStyle={{
                            fontFamily: Poppins.SemiBold,
                            fontSize: 12,
                            color: Color.primary,
                          }}
                          buttonStyle={{
                            backgroundColor
                              : Color?.white, padding: 7, paddingHorizontal: 15
                          }}
                          onPress={() => {
                            if (data?.id == undefined) {
                              navigation.navigate("ActionLogin");
                            } else {
                              check_interest
                                ? removeInterestfn()
                                : setInterestVisible(true);
                            }
                          }}
                        />
                      }
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 5, backgroundColor: '#f7f6f7', marginVertical: 20 }}></View>
                  <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Iconviewcomponent
                        Icontag={'MaterialCommunityIcons'}
                        iconname={"calendar-today"}
                        icon_size={24}
                        icon_color={Color.primary}
                      />
                      <Text style={{ color: Color.primary, fontFamily: Poppins.SemiBold, fontSize: 16, paddingHorizontal: 10 }}>Event Details</Text>
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', marginVertical: 5, marginTop: 10 }}>
                      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e0e0e0' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0' }}>
                          <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.SemiBold, paddingHorizontal: 10, paddingVertical: 15 }}>Event Bank </Text>
                        </View>
                        <View style={{ flex: 2, width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: 10, backgroundColor: '#fff' }}>
                          <View style={{ width: 35, height: 35, borderRadius: 50, backgroundColor: '#f7f6f7', padding: 2 }}>
                            <Image
                              source={{ uri: base_auction_image_url + item?.bank_logo }}
                              style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 50, }}
                            />
                          </View>
                          <Text
                            style={{
                              flex: 1, // Ensures Text takes up remaining space
                              textAlign: 'left',
                              color: Color.black,
                              fontSize: 14,
                              marginHorizontal: 10,
                              fontFamily: Poppins.SemiBold,
                              flexShrink: 1, // Prevents overflow by shrinking
                            }}
                            numberOfLines={2}
                            ellipsizeMode="tail">
                            {item?.event_bank}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{ width: '100%', height: 5, backgroundColor: '#f7f6f7', marginVertical: 20 }}></View>

                    <View style={{ gap: 10 }}>
                      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                        <Iconviewcomponent
                          Icontag={'FontAwesome'}
                          iconname={"building-o"}
                          icon_size={24}
                          icon_color={Color.primary}
                        />

                        <Text style={{ color: Color.primary, fontFamily: Poppins.SemiBold, fontSize: 16, paddingHorizontal: 10 }}>Property Details</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Category</Text>
                        <View style={{ width: "55%" }}>
                          <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.Bold, textAlign: 'left' }}>{item?.property_category}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Sub Category</Text>
                        <View style={{ width: "55%", }}>

                          <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.Bold, textAlign: 'left' }}>{result_sub_category}</Text>
                        </View>
                      </View>
                      {
                        userHaveActivePlan ?
                          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Borrower's Name</Text>
                            <View style={{ width: "55%", }}>
                              <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.Bold, textAlign: 'left' }}>{item?.borrowers_name ?? '-'}</Text>
                            </View>
                          </View> : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                            <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Borrower's Name</Text>
                            <View style={{ width: "55%", }}>
                              <Text style={{ fontSize: 14, color: Color.primary, fontFamily: Poppins.Bold }}
                                onPress={() => {
                                  navigation.navigate("AuctionPrime");
                                }}
                              >Upgrade Plan</Text>
                            </View>
                          </View>
                      }
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Area</Text>
                        <View style={{ width: "55%", flexDirection: 'row', gap: 5 }}>

                          <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.Bold, textAlign: 'left' }}>{item?.area}</Text>
                          <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.Bold, textAlign: 'left' }}>{item?.area_size === "Sq Feet" ? "sq.ft" : item?.area_size}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Country</Text>
                        <View style={{ width: "55%", }}>
                          <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.Bold, textAlign: 'left' }}>{item?.country}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>State </Text>
                        <View style={{ width: "55%", }}>
                          <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.Bold, textAlign: 'left' }}>{item?.state}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>District </Text>
                        <View style={{ width: "55%", }}>
                          <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.Bold, textAlign: 'left' }}>{item?.district}</Text>
                        </View>
                      </View>
                      <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 5 }}>
                        <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                          <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Property Description </Text>
                        </View>
                        <View style={{ backgroundColor: Color.white }}>
                          <Text
                            onTextLayout={onDescriptionTextLayout}
                            style={{
                              fontSize: 13,
                              color: Color.black,
                              fontFamily: Poppins.Bold,
                              textAlign: 'left',
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            {item?.property_description.length > 45 && !discriptiontextShown
                              ?
                              item?.property_description.substring(0, 45)
                                .concat('...')
                              : item?.property_description}
                            <Text style={{ color: Color?.primary, fontSize: 12, fontFamily: Poppins?.Medium }} onPress={toggleTextShown}>
                              {item?.property_description?.length > 38 && !discriptiontextShown ? '  Read More' : '  Read Less'}
                            </Text>
                            {/* {!userHaveActivePlan && <Iconviewcomponent
                                Icontag={'MaterialCommunityIcons'}
                                iconname={"shield-crown"}
                                icon_size={20}
                                icon_color={"#F6C324"}
                              />} */}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 5, backgroundColor: '#f7f6f7', marginVertical: 20 }}></View>
                  <View style={{ width: '100%', }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                      <Iconviewcomponent
                        Icontag={'FontAwesome'}
                        iconname={"gavel"}
                        icon_size={24}
                        icon_color={Color.primary}
                      />
                      <Text style={{ color: Color.primary, fontFamily: Poppins.Bold, fontSize: 16, paddingHorizontal: 10 }}>Auction Details</Text>
                    </View>
                    <View style={{ backgroundColor: Color.white, }}>
                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 5 }}>
                        <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                          <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Reserve Price</Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: Color.white }}>
                          <Text style={{ fontSize: 14, color: Color.primary, fontFamily: Poppins.Bold, textTransform: 'capitalize', }} numberOfLines={1}>₹
                            {item?.reserve_price?.length >= 5
                              ? common_fn.formatNumberWithSuffix(
                                item?.reserve_price,
                              )
                              : item?.reserve_price}</Text>
                        </View>
                      </View>
                      {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 5 }}>
                      <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Area</Text>
                      </View>
                      <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: Color.white }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.primary,
                              fontFamily: Poppins.Bold,
                              textTransform: 'capitalize'
                            }} numberOfLines={1}>
                            {item?.area}
                          </Text>
                          <Text style={{ fontSize: 13, color: Color.primary, fontFamily: Poppins.SemiBold, paddingHorizontal: 5 }}>{item?.area_size === "Sq Feet" ? "sq.ft" : item?.area_size}</Text>
                        </View>
                      </View>
                    </View> */}
                      {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, marginTop: 15 }}>
                      <Text style={{ color: Color.primary, fontFamily: Poppins.SemiBold, fontSize: 14 }}>EMD Details</Text>
                    </View> */}
                      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                          <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>EMD Amount</Text>
                        </View>
                        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: Color.white }}>
                          <Text style={{ fontSize: 14, color: Color.primary, fontFamily: Poppins.Bold }}>
                            ₹{' '}
                            {common_fn.formatNumberIndianEnglishCommas(
                              item?.emd_amount,
                            )}</Text>
                        </View>
                      </View>
                      <View style={{ width: '100%', height: 5, backgroundColor: '#f7f6f7', marginVertical: 20 }}></View>
                      <View style={{ width: '100%', marginHorizontal: 5, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, }}>
                          <Iconviewcomponent
                            Icontag={'MaterialIcons'}
                            iconname={"date-range"}
                            icon_size={24}
                            icon_color={Color.primary}
                          />
                          <Text style={{ color: Color.primary, fontFamily: Poppins.SemiBold, fontSize: 16, paddingHorizontal: 10 }}>Important Dates</Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                          <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                            <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Auction Date</Text>
                          </View>
                          <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: Color.white }}>
                            <Text style={{ fontSize: 14, color: Color.primary, fontFamily: Poppins.Bold }}>
                              {moment(item?.auction_start_date_and_time).format('DD/MM/YYYY')}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 5, backgroundColor: '#f7f6f7', marginVertical: 20 }}></View>
                  <View style={{ marginVertical: 0 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Iconviewcomponent
                        Icontag={'MaterialIcons'}
                        iconname={"my-library-books"}
                        icon_size={24}
                        icon_color={Color.primary}
                      />
                      <Text style={{ color: Color.primary, fontFamily: Poppins.SemiBold, fontSize: 16, paddingHorizontal: 10 }}>Auction Related Documents</Text>
                    </View>
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
                    {item?.nit_document != null && (
                      <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 15, marginTop: 10 }}>
                        {/* <Button
                        title={'Download Document'}
                        titleStyle={{
                          fontFamily: Poppins.SemiBold,
                          fontSize: 12,
                          color: Color.white,
                        }}
                        buttonStyle={{
                          backgroundColor: check_interest
                            ? Color.cloudyGrey
                            : Color?.primary,
                        }}
                        containerStyle={{
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        }}
                        onPress={() => {
                          console.log("userHaveActivePlan",userHaveActivePlan);
                          
                          if(userHaveActivePlan)
                          {
                            checkPermission();
                          }else{
                            navigation.navigate("AuctionPrime");
                          }
                        }}
                      /> */}
                        {
                          userHaveActivePlan ?
                            (
                              <TouchableOpacity style={{ padding: 10, backgroundColor: Color?.primary, borderRadius: 5 }}
                                onPress={() => {
                                  checkPermission();
                                }}
                              >
                                <Text style={{ color: Color?.white, fontFamily: Poppins?.Regular, fontSize: 14 }}>Download Document</Text>
                              </TouchableOpacity>
                            )
                            : (
                              <TouchableOpacity style={{ padding: 10, backgroundColor: Color?.primary, borderRadius: 5, flexDirection: 'row', alignItems: 'center', gap: 5 }}
                                onPress={() => navigation.navigate("AuctionPrime")}
                              >
                                <Iconviewcomponent
                                  Icontag={'MaterialCommunityIcons'}
                                  iconname={"shield-crown"}
                                  icon_size={20}
                                  icon_color={"#F6C324"}
                                />
                                <Text style={{ color: Color?.white, fontFamily: Poppins?.Regular, fontSize: 14 }}>Download Document</Text>
                              </TouchableOpacity>
                            )
                        }
                      </View>
                    )}
                  </View>
                  <View style={{ width: '100%', height: 5, backgroundColor: '#f7f6f7', marginVertical: 20 }}></View>
                </View>
              </View>
              {
                item?.RepostAuctions?.length > 0 &&
                <View style={{ padding: 10, gap: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
                    <Iconviewcomponent
                      Icontag={'FontAwesome'}
                      iconname={"history"}
                      icon_size={24}
                      icon_color={Color.primary}
                    />
                    <Text style={{ color: Color.primary, fontFamily: Poppins.SemiBold, fontSize: 16, paddingHorizontal: 10 }}>Auction History</Text>
                  </View>
                  <View style={{ padding: 10 }}>
                    <FlatList
                      data={item?.RepostAuctions}
                      horizontal
                      keyExtractor={(item, index) => item + index}
                      showsHorizontalScrollIndicator={true}
                      renderItem={({ item, index }) => {
                        return (
                          <AuctionHistory item={item} navigation={navigation} />
                        );
                      }}
                    />
                  </View>
                  <View style={{ width: '100%', height: 5, backgroundColor: '#f7f6f7', marginVertical: 20 }}></View>
                </View>

              }
              <View style={{ padding: 10 }}>
                <View style={{ width: '100%', marginHorizontal: 5, }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, }}>
                    <Iconviewcomponent
                      Icontag={'MaterialIcons'}
                      iconname={"date-range"}
                      icon_size={24}
                      icon_color={Color.primary}
                    />
                    <Text style={{ color: Color.primary, fontFamily: Poppins.SemiBold, fontSize: 16, paddingHorizontal: 10 }}>Important Dates</Text>
                  </View>
                  <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                    <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                      <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium }}>Auction Date</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: Color.white }}>
                      <Text style={{ fontSize: 14, color: Color.primary, fontFamily: Poppins.Bold }}>
                        {moment(item?.auction_start_date_and_time).format('DD/MM/YYYY')}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: '100%', height: 5, backgroundColor: '#f7f6f7', marginVertical: 20 }}></View>
              </View>
              {
                item &&
                <SimilarAuction navigation={navigation} AuctionProperty={item} />
              }
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
                      {item?.area} {item?.area_size === 'Sq Feet' ? 'sq.ft' : item?.area_size}
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
                      ₹ {parseInt(item?.reserve_price)?.toLocaleString('en-IN')}
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
                      ₹ {parseInt(item?.emd_amount)?.toLocaleString('en-IN')}
                    </Text>
                  </View>
                </View>

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
        <Modal visible={HomeLoanVisible} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              backgroundColor: Color.transparantBlack,
              justifyContent: 'center',
              padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 1,
                borderRadius: 10,
              }}>

              <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3EAE4', margin: 0, borderTopRightRadius: 10, borderTopLeftRadius: 10, paddingVertical: 20 }}>
                  <Image
                    source={require('../../assets/image/feedback.png')}
                    style={{ width: '100%', height: 100, resizeMode: 'contain', padding: 2, }}
                  />
                  <View style={{ position: 'absolute', right: 10, top: 10 }}>
                    <TouchableOpacity onPress={() => setHomeLoanVisible(false)}>
                      <Iconviewcomponent
                        Icontag={'AntDesign'}
                        iconname={"closecircle"}
                        icon_size={30}
                        icon_color={Color.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ width: '100%', marginHorizontal: 10, marginTop: 10 }}>
                  <Text style={{ width: '100%', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, paddingHorizontal: 20 }}>Rate Your Experience ?</Text>
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
                              fontSize: 12,
                              color: Color.cloudyGrey,
                              marginVertical: 5,
                              fontFamily: Poppins.SemiBold,
                            }}>
                            {item.experience}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <View style={{ width: '95%', height: 1, backgroundColor: '#EAEAEF', borderRadius: 30, marginVertical: 5 }}></View>
                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 5 }}>
                  <Text style={{ width: '100%', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, paddingHorizontal: 20 }}>Share your experience</Text>

                  <View style={{ width: '95%', backgroundColor: Color.white, borderWidth: 1, borderColor: Color.lightgrey, borderRadius: 5, marginTop: 10 }}>
                    <TextInput
                      placeholder="Enter your comments here ..."
                      placeholderTextColor={Color.cloudyGrey}
                      value={comments}
                      multiline={true}
                      onChangeText={text => {
                        setComments(text);
                      }}
                      keyboardType="name-phone-pad"
                      returnKeyType='go'
                      style={styles.phoneTextInput}
                    />
                  </View>
                </View>
                <TouchableOpacity onPress={() => feedbackSubmitClick()}
                  style={{ width: '95%', height: 50, backgroundColor: Color.primary, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                  {updateLoader ? (
                    <ActivityIndicator color={Color.white} />
                  ) : (
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 14,
                        color: Color.white,
                        fontFamily: Poppins.Medium,
                      }}>
                      Submit
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={requestModal} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              backgroundColor: Color.transparantBlack,
              justifyContent: 'center',
              padding: 15, backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 10,
              }}>

              <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingRight: 20 }}>
                  <Text style={{ width: '100%', fontSize: 18, color: Color.black, fontFamily: Poppins.SemiBold, paddingHorizontal: 20, paddingVertical: 10 }}>Request Property</Text>
                  <TouchableOpacity onPress={() => {
                    setRequestModal(!requestModal)
                  }}>

                    <Iconviewcomponent
                      Icontag={'AntDesign'}
                      iconname={"closecircleo"}
                      icon_size={24}
                      icon_color={Color.primary}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', marginVertical: 30 }}>
                  <Image
                    source={require('../../assets/image/guide.png')}
                    style={{ width: '80%', height: 60, resizeMode: 'contain', padding: 2, }}
                  />
                </View>

                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
                  <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.SemiBold, lineHeight: 22 }}>Thank you for your patience. We will notify you with the details shortly. Your understanding is greatly appreciated</Text>
                </View>

                <TouchableOpacity onPress={() => requestSubmitClick()}
                  style={{ width: '95%', height: 45, backgroundColor: Color.primary, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
                  {updateLoader ? (
                    <ActivityIndicator color={Color.white} />
                  ) : (
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 13,
                        color: Color.white,
                        fontFamily: Poppins.Medium,
                      }}>
                      Submit
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>);
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
    color: Color.black,
    textAlignVertical: 'top',
    maxHeight: 200
  },
});

export default ActionSingleProperty;




{/* <Text
  onTextLayout={onDescriptionTextLayout}
  style={{
    fontSize: 14,
    color: Color.black,
    textAlign: 'justify',
    fontFamily: Poppins.Bold,
    lineHeight: 20,
    letterSpacing: 0.5,
  }}
  numberOfLines={numLines}>
  {!discriptiontextShown
    ? item?.property_description
      .substring(0, 78)
      .concat('...')
    : item?.property_description}{' '}
  {showMoreButton || numLines > 2 ? (
    discriptiontextShown ?
      (<Text
        onPress={toggleTextShown}
        style={{
          color: Color.primary,
          fontFamily: Poppins.SemiBold,
          fontSize: 14, lineHeight: 22,
        }}>Read Less
      </Text>) :
      <TouchableOpacity onPress={toggleTextShown} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
        <Text
          onPress={toggleTextShown}
          style={{
            color: Color.primary,
            fontFamily: Poppins.SemiBold,
            fontSize: 14, lineHeight: 22,
          }}>Read More
        </Text>
        <Image
          source={require('../../assets/image/crown.png')}
          style={{ width: 20, height: 20, resizeMode: 'contain', marginLeft: 5, }}
        />
      </TouchableOpacity>
  ) : null}
</Text> */}