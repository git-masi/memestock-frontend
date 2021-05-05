// Modules
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import transactionsReducer from '../features/transactionsFeed/transactionsSlice';
import globalLoaderReducer from '../features/portal/globalLoaderSlice';
import history from '../features/history/historySlice';
import userInfo from '../features/loginPage/userInfoSlice';

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
    showGlobalLoader: globalLoaderReducer,
    history,
    userInfo
  },
});
