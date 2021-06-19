// Modules
import { configureStore } from '@reduxjs/toolkit';
import isEmpty from 'lodash.isempty';

// Reducers
import transactionsReducer from '../features/transactionsFeed/transactionsSlice';
import globalLoaderReducer from '../features/portal/globalLoaderSlice';
import history from '../features/history/historySlice';
import userInfo from '../features/loginPage/userInfoSlice';

const config = {
  reducer: {
    transactions: transactionsReducer,
    showGlobalLoader: globalLoaderReducer,
    history,
    userInfo,
  },
};
const prevSession = {};
const prevUserInfo = localStorage.getItem('userInfo') ?? '';

if (prevUserInfo) {
  prevSession.userInfo = JSON.parse(prevUserInfo);
}

if (!isEmpty(prevSession)) {
  config.preloadedState = prevSession;
}

export default configureStore(config);
