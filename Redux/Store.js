import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from './Reducers';
import {combineReducers} from 'redux';

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({thunk: false})],
});

export default store;
