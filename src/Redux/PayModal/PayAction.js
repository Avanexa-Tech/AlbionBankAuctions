import {
  SET_PAY_MODAL_CANCEL_VISIBLE,
  SET_PAY_MODAL_SUCCESS_VISIBLE,
} from './PayActionTypes';

export const setPaySuccessVisible = param => {
  return {
    type: SET_PAY_MODAL_SUCCESS_VISIBLE,
    payload: param,
  };
};
export const setPayCancelVisible = param => {
  return {
    type: SET_PAY_MODAL_CANCEL_VISIBLE,
    payload: param,
  };
};
