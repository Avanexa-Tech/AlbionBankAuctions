import {
  SET_ASYNC_CART,
  SET_AUCTION_USER_DATA,
  SET_AUTO_FILTER,
  SET_EDIT_VISIBLE,
  SET_FILTER_LOCATION,
  SET_FILTER_REMOVE_ITEM,
  SET_LOGIN_TYPE,
  SET_USER_DATA,
} from './UserActionTypes';

export const setUserData = param => {
  return {
    type: SET_USER_DATA,
    payload: param,
  };
};

export const setFilterLocation = param => {
  return {
    type: SET_FILTER_LOCATION,
    payload: param,
  };
};

export const setFilterLocationRemove = param => {
  return {
    type: SET_FILTER_REMOVE_ITEM,
    payload: param,
  };
};

export const setAutoFilterLocation = param => {
  return {
    type: SET_AUTO_FILTER,
    payload: param,
  };
};

export const setAsync = param => {
  return {
    type: SET_ASYNC_CART,
    payload: param,
  };
};


export const setEditVisible = param => {
  return {
    type: SET_EDIT_VISIBLE,
    payload: param,
  };
};
export const setActionUserData = param => {
  return {
    type: SET_AUCTION_USER_DATA,
    payload: param,
  };
};
export const setLoginType = param => {
  return {
    type: SET_LOGIN_TYPE,
    payload: param,
  };
};