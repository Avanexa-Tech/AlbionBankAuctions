import React, { useState } from 'react';
import { FlatList, Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import { base_image_properties } from '../Config/base_url';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import FIcon from 'react-native-vector-icons/FontAwesome';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import OIcon from 'react-native-vector-icons/Octicons';
import Color from '../Config/Color';
import moment from 'moment';
import { useSelector } from 'react-redux';
import fetchData from '../Config/fetchData';
import { ActivityIndicator } from 'react-native';
import common_fn from '../Config/common_fn';
import { Poppins } from '../Global/FontFamily';

const ItemCard = props => {
  var { ItemData, navigation } = props;
  const [ProductLoad, setProductLoad] = useState(false);
  const [processingProducts, setProcessingProducts] = useState([]);

  const userData = useSelector(state => state.UserReducer.userData || {});
  var { user_id } = userData;

  const twentyFourHoursAgo = moment(new Date() - 24 * 60 * 60 * 1000).format(
    'YYYY-MM-DD',
  );
  const createdAt = moment(ItemData?.created_at).format('YYYY-MM-DD');
  const newItem = twentyFourHoursAgo > createdAt;
  let bedroomValue = '';
  if (ItemData && ItemData.features && Array.isArray(ItemData.features)) {
    ItemData.features.forEach(feature => {
      if (feature?.title?.toLowerCase() === 'bedroom') {
        bedroomValue = feature.value;
      }
    });
  }
  const handleWishlist = async (id, isWishList) => {
    setProcessingProducts([...processingProducts, id]);
    try {
      var data = {
        p_id: id,
        user_id: user_id,
      };
      if (isWishList) {
        const removeWishlist = await fetchData.remove_to_wishlist(data);
        if (removeWishlist?.message == 'Removed From WishList') {
          if (Platform.OS === 'android') {
            common_fn.showToast('Wishlist Removed Successfully');
          } else {
            alert("Wishlist Removed Successfully")
          }

          setProcessingProducts(
            processingProducts.filter(productId => productId !== id),
          );
        }
      } else {
        const addWishlist = await fetchData.add_to_wishlist(data);
        if (addWishlist?.message == 'Success') {
          if (Platform.OS === 'android') {
            common_fn.showToast('Wishlist Added Successfully');
          } else {
            alert("Wishlist Added Successfully")
          }

          setProcessingProducts(
            processingProducts.filter(productId => productId !== id),
          );
        }
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setProcessingProducts(
        processingProducts.filter(productId => productId !== id),
      );
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
      }}>
      <TouchableOpacity
        style={{
          borderRadius: 5,
          borderColor: Color.lightgrey,
          borderWidth: 1,
          backgroundColor: Color.white,
          marginVertical: 5,
          marginHorizontal: 5,
        }}
        onPress={() => {
          navigation.navigate('SingleProperty', { p_id: ItemData?.p_id });
        }}>
        <View>
          <Image
            source={{
              uri: ItemData?.images[0]?.image_url,
            }}
            style={{
              // width: 250,
              height: 150,
              resizeMode: 'cover',
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
          />
          <View
            style={{
              position: 'absolute',
              flexDirection: 'row',
              alignItems: 'flex-start',
              padding: 5,
            }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
              {!newItem ? (
                <View
                  style={{
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      padding: 5,
                      paddingHorizontal: 10,
                      marginStart: 5,
                      borderRadius: 5,
                      color: 'white',
                      fontStyle: 'normal',
                      fontFamily: Poppins.SemiBold,
                      backgroundColor: Color.green,
                    }}>
                    New
                  </Text>
                </View>
              ) : (
                <View style={{}} />
              )}
              {ItemData?.exclusive != 0 &&
                <View
                  style={{
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      padding: 5,
                      paddingHorizontal: 10,
                      marginStart: 5,
                      borderRadius: 5,
                      color: 'white',
                      fontStyle: 'normal',
                      fontFamily: Poppins.SemiBold,
                      backgroundColor: Color.primary,
                    }}>
                    Exclusive
                  </Text>
                </View>
              }
            </View>
            <View
              style={{
                alignItems: 'flex-end',
              }}>
              {/* <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  // backgroundColor: Color.white,
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  // opacity:0.75,
                  justifyContent: 'center',
                  borderColor: ItemData?.isWishListed
                    ? Color.primary
                    : Color.grey,
                  borderWidth: 1,
                }}
                onPress={() => {
                  handleWishlist(ItemData.p_id, ItemData?.isWishListed);
                }}>
                {processingProducts.includes(ItemData.p_id) ? (
                  <ActivityIndicator size="small" color={Color.primary} />
                ) : (
                  <Icon
                    name={ItemData?.isWishListed ? 'heart' : 'heart-outline'}
                    size={18}
                    color={ItemData?.isWishListed ? Color.primary : Color.grey}
                  />
                )}
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 14,
                color: '#666',
                fontWeight: 'bold',
              }}
              numberOfLines={1}>
              {ItemData?.property_type?.pt_name == 'Flat' ||
                ItemData?.property_type?.pt_name == 'Villa' ||
                ItemData?.property_type?.pt_name == 'House'
                ? `${bedroomValue} BHK, ${ItemData?.property_type?.pt_name}`
                : `${ItemData?.area?.super_area} ${ItemData?.area?.super_area_unit}, ${ItemData?.property_type?.pt_name}`}
            </Text>
            <F5Icon name="crown" size={18} color={Color.sunShade} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 17,
                color: Color.black,
                fontWeight: 'bold',
              }}
              numberOfLines={1}>
              {ItemData?.property_name}
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: Color.primary,
                fontWeight: 'bold',
              }}
              numberOfLines={1}>
              ₹{common_fn.formatNumberWithSuffix(
                ItemData?.expected_price,
              )}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <OIcon
                name={'location'}
                size={18}
                style={{ color: '#666' }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: '#333',
                  fontFamily: Poppins.Medium,
                  padding: 5,
                  textTransform: "capitalize"
                }}
                numberOfLines={1}>
                {ItemData.location}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;
