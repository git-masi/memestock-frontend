import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_TRANSACTION_SERVICE_URL } = process.env;

const initialState = {
  transactionsPerPage: 10,
  pages: {
    1: [],
  },
  displayPage: 1,
  numPages: 0,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    init: (state, action) => {
      const { payload } = action;
      const { numPages, data } = payload;
      const pages = createPages(numPages);
      pages['1'] = data;
      state.pages = pages;
      state.displayPage = 1;
      state.numPages = numPages;
    },
    addPage: (state, action) => {
      const { payload } = action;
      const { pageNumber, data } = payload;
      state.pages[pageNumber] = data;
      state.displayPage = +pageNumber;
    },
    changePage: (state, action) => {
      const { payload: pageNumber } = action;
      state.displayPage = +pageNumber;
    },
  },
});

export const { init, addPage, changePage } = historySlice.actions;

export const pagesSelector = (state) => state.history.pages;
export const historySelector = (state) => state.history;
export const currentPageSelector = (state) =>
  state.history.pages[state.history.displayPage];

export default historySlice.reducer;

export function fetchTransactionsHistory() {
  return async (dispatch, getState) => {
    try {
      const {
        history: { transactionsPerPage },
      } = getState();

      const {
        data: { count },
      } = await axios.get(
        `${REACT_APP_TRANSACTION_SERVICE_URL}/transaction/count`
      );

      const numPages = count / transactionsPerPage;

      const { data } = await axios.get(
        `${REACT_APP_TRANSACTION_SERVICE_URL}/transaction/many?orderAsc=false&limit=${transactionsPerPage}`
      );

      dispatch(init({ numPages, data }));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchPageForTransactionsHistory(pageNumber) {
  return async (dispatch, getState) => {
    try {
      const {
        history: { transactionsPerPage, pages },
      } = getState();

      if (pages[pageNumber].length === transactionsPerPage) {
        return dispatch(changePage(pageNumber));
      }

      const { id, created } = getOldestTransactionFromPages(pages);

      const queryParams = `?orderAsc=false&limit=${transactionsPerPage}&exclusiveStartKey=${id}&compareTime=${encodeURIComponent(
        created
      )}`;

      const { data } = await axios.get(
        `${REACT_APP_TRANSACTION_SERVICE_URL}/transaction/many${queryParams}`
      );

      dispatch(addPage({ pageNumber, data }));
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

function getOldestTransactionFromPages(pages) {
  const transactions = Object.values(pages).reduce((concatPages, page) => [
    ...concatPages,
    ...page,
  ]);
  return transactions[transactions.length - 1];
}
