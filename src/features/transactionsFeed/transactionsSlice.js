// Modules
import { createSlice } from '@reduxjs/toolkit';

// Utils
import { createFakeTransactions } from '../../utils/createFakeTransactions';
import { mockApiResponse } from '../../utils/mockApiResponse';
import { showLoader, hideLoader } from '../portal/globalLoaderSlice';

const initialState = {
  loading: false,
  hasError: false,
  data: [],
};

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    startFetchingTransactions: (state) => {
      state.loading = true;
      state.hasError = false;
    },
    errorFetchingTransactions: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    addTransactions: (state, action) => {
      const { payload } = action;
      return {
        loading: false,
        hasError: false,
        data: payload.concat(state.data),
      };
    },
  },
});

export const {
  addTransactions,
  startFetchingTransactions,
  errorFetchingTransactions,
} = transactionsSlice.actions;

export const selectAllTransactions = (state) => state.transactions;

export default transactionsSlice.reducer;

// Thunks
export function fetchTransactions() {
  return async (dispatch, getState) => {
    try {
      // Think of transactions like a cache
      // This is guard to prevent re-fetching transactions if we already have some
      const currState = getState();
      const {
        transactions: { data },
      } = currState;
      if (data.length > 0) return;

      dispatch(startFetchingTransactions());
      dispatch(showLoader());

      // todo: fetch real data
      const dummyData = createFakeTransactions();
      const orders = await mockApiResponse(dummyData);

      dispatch(addTransactions(orders));
    } catch (error) {
      console.log(error);
      dispatch(errorFetchingTransactions());
    } finally {
      dispatch(hideLoader());
    }
  };
}
