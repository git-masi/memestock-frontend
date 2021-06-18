import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_TRANSACTION_SERVICE_URL } = process.env;
const tempToken =
  'eyJraWQiOiIzeHhsNnRreU1KeHVCT3V0OStLdHFzOG9KYzVZbncyZUUyZTlcLzVVakg5RT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1MGNiNGQxMC04ZTI1LTRmMTUtYjU0MS1jMmY1Y2U3ZTQ0YTgiLCJldmVudF9pZCI6ImVjYjgwZjZjLTc1MzMtNDRiMy1iM2M2LWEyMDA1ZjZkNmU1NiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MjAxNDE1NTksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3RWN2pSYVZ0VCIsImV4cCI6MTYyMDE0NTE1OSwiaWF0IjoxNjIwMTQxNTU5LCJqdGkiOiIxNDVkZjkyZC1kYmNmLTQzOTUtODY4Ni04ZjI1MGYzYmVhZGQiLCJjbGllbnRfaWQiOiJuYXByZWtzMDJhbWIybmFpMTgwMXNuOXY0IiwidXNlcm5hbWUiOiI1ODcwYTdjZC05YzAxLTQ5NjktYmQzYS1hMDQ5NzZhYzk0MjUifQ.Ih53Y_X4F1BX8pB29umHnDDhr-E5kKa5Tn4swncB7wT4VxJfW1AKhftUy9J9d19sKA5K2ibh5gLxosXBUFak1tjGkZkOBnJeJjnkYaSYbeuHyiXfx1wxygwyYYk0UkR8IV_dwzRpNR0pB6ANz-1SRuVsGikM-DlBBFKyiBPHxwRvAQaS0LMMnMvI4F1F2kGRrO7lPK34tsmBAyKRBXX9RvvUMvg8zsiwK4_adj2GRpVnuxSKNCYiyvXG-QPj2L5W-vgsU0N59_MMCOW7Gp151RrIw3PJ3QxPB04fewwmEQsvD-2zdMBqbKAoQt9EeX4o5DHrGBgrYU8Twx_2xJYhPw';

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
      } = await axios.get(`${REACT_APP_MEMESTOCK_API}/orders/count/fulfilled`, {
        headers: { Authorization: tempToken },
      });

      const numPages = count / transactionsPerPage;

      const { data } = await axios.get(
        `${REACT_APP_MEMESTOCK_API}/orders?orderStatus=fulfilled&asc=false&limit=${transactionsPerPage}`
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
