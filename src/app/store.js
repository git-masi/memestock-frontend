// Modules
import { configureStore } from '@reduxjs/toolkit';

// Reducers
import transactionsReducer from '../features/transactionsFeed/transactionsSlice';

export default configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});
