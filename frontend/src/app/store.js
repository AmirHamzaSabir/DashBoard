import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './RootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
export const store = configureStore({
  reducer: rootReducer,
  // middleware:[thunk,logger]
});
