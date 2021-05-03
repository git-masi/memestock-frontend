import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_TRANSACTION_SERVICE_URL } = process.env;

const initialState = {
  tranactionsPerPage: 10,
  pages: {
    1: [],
  },
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    init: (state, action) => {
      const { payload } = action;
      console.log(payload);
      state.pages = payload;
    },
  },
});

export const { init } = historySlice.actions;

export const pagesSelector = (state) => state.history.pages;

export default historySlice.reducer;

export function fetchTransactionsHistory() {
  return async (dispatch, getState) => {
    try {
      const {
        history: { tranactionsPerPage },
      } = getState();

      const {
        data: { count },
      } = await axios.get(
        `${REACT_APP_TRANSACTION_SERVICE_URL}/transaction/count`
      );

      const numPages = count / tranactionsPerPage;

      const pages = createPages(numPages);

      const { data } = await axios.get(
        `${REACT_APP_TRANSACTION_SERVICE_URL}/transaction/many?orderAsc=false&limit=${tranactionsPerPage}`
      );

      pages['1'] = data;

      dispatch(init(pages));
    } catch (error) {
      console.log(error);
    }
  };
}

function createPages(numPages) {
  const pages = {};
  for (let i = 1; i <= numPages; i++) pages[i] = [];
  return pages;
}
