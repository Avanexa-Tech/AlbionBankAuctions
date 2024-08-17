import {
  SET_AUCTION_SORT,
  SET_PROPERTY_ASYNC_CART,
  SET_PROPERTY_DATA,
  SET_PROPERTY_LOCATION,
  SET_PROPERTY_SAVED_FILTER,
} from './propertyActionTypes';

export const setPostPropertyLocation = param => {
  return {
    type: SET_PROPERTY_LOCATION,
    payload: param,
  };
};

export const setPropertyData = param => {
  return {
    type: SET_PROPERTY_DATA,
    payload: param,
  };
};

export const setPropertySavedFilter = param => {
  return {
    type: SET_PROPERTY_SAVED_FILTER,
    payload: param,
  };
};

export const setPropertyAsync = param => {
  return {
    type: SET_PROPERTY_ASYNC_CART,
    payload: param,
  };
};

export const setAuctionSort = param => {
  return {
    type: SET_AUCTION_SORT,
    payload: param,
  };
};
