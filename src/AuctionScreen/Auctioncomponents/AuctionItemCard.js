import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { Media } from '../../Global/Media';
import Color from '../../Config/Color';
import { Poppins } from '../../Global/FontFamily';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import {
  base_albionbankauctions_url,
  base_auctionUrl,
  base_auction_image_url,
} from '../../Config/base_url';
import common_fn from '../../Config/common_fn';

const { width, height } = Dimensions.get('window');
const AuctionItemCard = props => {
  var { navigation, item, index } = props;
  // console.log("Auction item  =================== : ", moment(item?.auction_start_date_and_time).format('DD-MM-YYYY'));

  return (
    <TouchableOpacity
      key={index}
      onPress={() => {
        navigation.push('ActionSingleProperty', {
          item: item,
        });
      }}
      style={{
        // flex: 1,
        // backgroundColor: 'white',
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        padding: 5,
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        // elevation: 8,
        borderWidth: 1,
        borderColor: '#a5a5a5',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={
            // item?.property_img_1 != null
            //   ? {uri: base_albionbankauctions_url + item.property_img_1}
            //   : Media.noImage
            {
              uri: base_auction_image_url + item?.bank_logo,
            }
          }
          style={{
            width: 90,
            height: 100,
            borderRadius: 10,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center', paddingHorizontal: 5
        }}>
        <View style={{ padding: 5 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 11,
                  color: Color.lightBlack,
                  fontFamily: Poppins.Medium,
                }}
                numberOfLines={1}>
                Id:
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Color.black,
                  fontFamily: Poppins.Bold,
                }}
                numberOfLines={1}>
                {" "}{item?.id}
              </Text></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 11,
                  color: Color.lightBlack,
                  fontFamily: Poppins.Medium,
                }}
                numberOfLines={1}>
                Auction Date:
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: Color.lightBlack,
                  fontFamily: Poppins.Bold,
                }}
                numberOfLines={1}>{' '} {moment(item?.created_at).format('DD-MM-YYYY')} </Text></View>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: Color.black,
              fontFamily: Poppins.SemiBold,
              paddingTop: 5,
            }}
            numberOfLines={2}>
            {item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5
            }}>
            <OIcon
              name={'location'}
              size={18}
              style={{ color: Color.lightgrey }}
            />
            <Text
              style={{
                fontSize: 12,
                color: Color.cloudyGrey,
                fontFamily: Poppins.Medium,
                marginHorizontal: 5
              }}
              numberOfLines={1}>
              {`${item?.district} ,${item?.state}`}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginVertical: 5,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <F6Icon
                name={'object-ungroup'}
                size={20}
                style={{ color: Color.sunShade }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: Color.cloudyGrey,
                  fontFamily: Poppins.Medium,
                  paddingHorizontal: 5,
                }}>
                {item?.area} {item?.area_size}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: "flex-start",
              justifyContent: 'flex-end',
              marginVertical: 5,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 15,
                color: Color.red,
                fontFamily: Poppins.SemiBold,
              }}>
              ₹ {common_fn.formatNumberIndianEnglishCommas(item?.reserve_price)}
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 13,
                color: Color.primary,
                fontFamily: Poppins.SemiBold,
                textAlign: "right"
              }} numberOfLines={2}>
              {item.event_bank}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AuctionItemCard;

const styles = StyleSheet.create({
  ItemCardContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginHorizontal: 5,
    // backgroundColor: Color.white,
    elevation: 3,
  },
  ItemCardView: { flex: 1 },
  ProductText: {
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
    color: Color.black,
  },
  colorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  colorHeaderText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Poppins.Medium,
    color: Color.black,
  },
  colorValueContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    // marginHorizontal: 20,
  },
  colorBackground: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: Color.black,
    borderWidth: 1,
  },
  colorValueText: {
    marginStart: 5,
    fontSize: 14,
    fontFamily: Poppins.Medium,
    color: Color.black,
    textTransform: 'capitalize',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  priceHeaderText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Poppins.Medium,
    color: Color.black,
  },
  priceValueText: {
    fontSize: 14,
    fontFamily: Poppins.Medium,
    marginLeft: 20,
    color: Color.red,
    marginHorizontal: 20,
  },
  CategoryContainer: {
    flexDirection: 'row',
    marginTop: 10,
    // alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryHeaderText: {
    flex: 1,
    fontSize: 14,
    fontFamily: Poppins.Medium,
    color: Color.black,
  },
  CategoryText: {
    fontSize: 14,
    fontFamily: Poppins.Medium,
    marginLeft: 20,
    color: Color.black,
    marginHorizontal: 20,
  },
  emptyContainer: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  ItemCardImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  ModalContainer: { flex: 1, backgroundColor: Color.ModalBackground },
  ModalView: { flex: 1, justifyContent: 'center' },
  ModalCloseView: {
    position: 'absolute',
    top: 5,
    right: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  closeText: {
    opacity: 1,
    color: Color.white,
  },
  ViewButtonTitleText: {
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
  },
  ViewButtonStyles: {
    width: 80,
    marginTop: 10,
  },
  InCartContainer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InCartText: {
    fontSize: 16,
    fontFamily: Poppins.Medium,
    color: Color.black,
    marginStart: 5,
  },
});
