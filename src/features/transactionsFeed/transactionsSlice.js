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
        data: state.data.concat(payload),
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
      const currState = getState();
      const {
        transactions: { data },
      } = currState;

      dispatch(startFetchingTransactions());

      dispatch(showLoader());

      let url = `${REACT_APP_MEMESTOCK_API}/orders/feed?limit=${10}&asc=false&orderStatus=fulfilled`;

      if (data.length > 0) {
        const lastOrder = data[data.length - 1];
        url = url + `&startSk=${lastOrder.sk}`;
      }

      const { data: orders } = await axios.get(url);

      if (orders?.length ?? -1 > 0) dispatch(addTransactions(orders));
    } catch (error) {
      console.log(error);
      dispatch(errorFetchingTransactions());
    } finally {
      dispatch(hideLoader());
    }
  };
}
