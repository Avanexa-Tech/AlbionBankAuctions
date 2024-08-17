import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import PayReducer from './PayModal/PayReducer';
import PropertyReducer from './property/propertyReducer';
import UserReducer from './user/UserReducer';

const rootReducer = combineReducers({
  UserReducer: UserReducer,
  PropertyReducer: PropertyReducer,
  PayReducer: PayReducer,
});

export default configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
