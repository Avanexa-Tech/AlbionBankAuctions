import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SET_AUCTION_SORT,
  SET_PROPERTY_ASYNC_CART,
  SET_PROPERTY_DATA,
  SET_PROPERTY_LOCATION,
  SET_PROPERTY_SAVED_FILTER,
} from './propertyActionTypes';

const initialState = {
  AuctionSort: {},
  propertyData: [],
  filterSaved: {
    buySaved: { AddFilter: {}, filterBuyData: {}, filterBoolean: false },
    rentSaved: { AddFilter: {}, filterBuyData: {}, filterBoolean: false },
  },
  propertyLocation: {
    city: '',
    landmark: '',
  },
};

const storeCartData = async PropertyState => {
  try {
    const jsonValue = JSON.stringify(PropertyState);
    await AsyncStorage.setItem('PropertyState', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const PropertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROPERTY_LOCATION:
      // storeCartData({
      //   ...state,
      //   propertyLocation: {
      //     city: action.payload.city,
      //     landmark: action.payload.landmark,
      //   },
      // });
      return {
        ...state,
        propertyLocation: {
          city: action.payload.city,
          landmark: action.payload.landmark,
        },
      };
    case SET_PROPERTY_DATA:
      storeCartData({
        ...state,
        propertyData: action.payload,
      });
      return {
        ...state,
        propertyData: action.payload,
      };
    case SET_AUCTION_SORT:
      return {
        ...state,
        AuctionSort: action.payload,
      };
    case SET_PROPERTY_SAVED_FILTER:
      storeCartData({
        ...state,
        filterSaved: {
          buySaved: action.payload.buySaved,
          rentSaved: action.payload.rentSaved,
        },
      });
      return {
        ...state,
        filterSaved: {
          buySaved: action.payload.buySaved,
          rentSaved: action.payload.rentSaved,
        },
      };
    case SET_PROPERTY_ASYNC_CART:
      var {propertyData, filterSaved } = action.payload;
      return {
        ...state,
        propertyData,
        filterSaved,
      };
    default:
      return state;
  }
};

export default PropertyReducer;
