// Modules
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import transactions from '../features/transactionsFeed/transactionsSlice';
import showGlobalLoader from '../features/portal/globalLoaderSlice';
import userInfo from '../features/loginPage/userInfoSlice';

export default configureStore({
  reducer: {
    transactions,
    showGlobalLoader,
    userInfo,
  },
});
