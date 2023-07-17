import createSagaMiddleware from '@redux-saga/core';
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {rootReducer} from './root.reducer';
import {rootSaga} from './root.saga';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {getDefaultMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';

const storage = new MMKVLoader().initialize();
const sagaMiddleWare = createSagaMiddleware();
const middleware = [
  sagaMiddleWare,
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'imageToUpload'],
  blacklist: [],
  debug: true,
  devTools: process.env.NODE_ENV !== 'production',
};

if (__DEV__) {
  middleware.push(logger);
}
// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   middleware.push(createDebugger());
// }

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

const persistor = persistStore(store);

export {store, persistor};
