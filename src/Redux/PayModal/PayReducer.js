import {
  SET_PAY_MODAL_CANCEL_VISIBLE,
  SET_PAY_MODAL_SUCCESS_VISIBLE,
} from './PayActionTypes';

const initialState = {
  PaySuccessVisible: false,
  PayCancelVisible: false,
};

const PayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAY_MODAL_SUCCESS_VISIBLE:
      return {
        ...state,
        PaySuccessVisible: action.payload,
      };
    case SET_PAY_MODAL_CANCEL_VISIBLE:
      return {
        ...state,
        PayCancelVisible: action.payload,
      };
    default:
      return state;
  }
};

export default PayReducer;
