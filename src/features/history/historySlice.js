// Modules
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Utils
import { showLoader, hideLoader } from '../portal/globalLoaderSlice';

const { REACT_APP_MEMESTOCK_API } = process.env;

const initialState = {
  loading: false,
  hasError: false,
  data: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    startFetchingOrderHistory: (state) => {
      state.loading = true;
      state.hasError = false;
    },
    errorFetchingOrderHistory: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    addOrdersToHistory: (state, action) => {
      const { payload } = action;
      return {
        loading: false,
        hasError: false,
        data: payload,
      };
    },
    addMoreOrdersToHistory: (state, action) => {
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
  startFetchingOrderHistory,
  errorFetchingOrderHistory,
  addOrdersToHistory,
  addMoreOrdersToHistory,
} = historySlice.actions;

export const historySelector = (state) => state.history;

export default historySlice.reducer;

export function fetchOrderHistory() {
  return async (dispatch, getState) => {
    try {
      const currState = getState();
      const {
        // history: { data },
        userInfo: { accessToken },
      } = currState;

      dispatch(startFetchingOrderHistory());

      dispatch(showLoader());

      let url = `${REACT_APP_MEMESTOCK_API}/orders/history`;

      // Something like this is useful if fetching more orders on scroll
      // if (data.length > 0) {
      //   const lastOrder = data[data.length - 1];
      //   url = url + `?startSk=${lastOrder.sk}`;
      // }

      const { data: orders } = await axios({
        method: 'GET',
        url,
        headers: { Authorization: accessToken },
      });

      if (orders?.length ?? -1 > 0) dispatch(addOrdersToHistory(orders));
    } catch (error) {
      console.log(error);
      dispatch(errorFetchingOrderHistory());
    } finally {
      dispatch(hideLoader());
    }
  };
}
