// Modules
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import transactionsReducer from '../features/transactionsFeed/transactionsSlice';
import globalLoaderReducer from '../features/portal/globalLoaderSlice';

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
    showGlobalLoader: globalLoaderReducer,
  },
});
