// Modules
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Utils
import { showLoader, hideLoader } from '../portal/globalLoaderSlice';

// Env vars
const { REACT_APP_MEMESTOCK_API } = process.env;

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

      const { data: orders } = await axios.get(
        `${REACT_APP_MEMESTOCK_API}/orders/feed?limit=${10}&asc=false&orderStatus=fulfilled`
      );

      console.log(orders);

      dispatch(addTransactions(orders));
    } catch (error) {
      console.log(error);
      dispatch(errorFetchingTransactions());
    } finally {
      dispatch(hideLoader());
    }
  };
}
