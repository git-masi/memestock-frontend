import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const { REACT_APP_TRANSACTION_SERVICE_URL } = process.env;
const tempToken =
  'eyJraWQiOiIzeHhsNnRreU1KeHVCT3V0OStLdHFzOG9KYzVZbncyZUUyZTlcLzVVakg5RT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1MGNiNGQxMC04ZTI1LTRmMTUtYjU0MS1jMmY1Y2U3ZTQ0YTgiLCJldmVudF9pZCI6IjAxYWIxMmY1LTczOGQtNDExMC05NGJkLTc1YWU0Mjc2NWFiZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MjAwOTIyNjAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3RWN2pSYVZ0VCIsImV4cCI6MTYyMDA5NTg2MCwiaWF0IjoxNjIwMDkyMjYwLCJqdGkiOiI4MmE2YmY1MS01N2JlLTQ2MWMtYWM1NS0wMTAyMGVhNmZlYmMiLCJjbGllbnRfaWQiOiJuYXByZWtzMDJhbWIybmFpMTgwMXNuOXY0IiwidXNlcm5hbWUiOiI1ODcwYTdjZC05YzAxLTQ5NjktYmQzYS1hMDQ5NzZhYzk0MjUifQ.G8ZtWpZNfbGoqo7Y5CbreYCWCc1KUtOExoB87Wm_3hY-8rqDel_rstqTWPI95GZhe31SbDLbu-OXaTAJAB3pGeVUSRHcCMDNnsK0IxJqX0A2TKh31BmWO8jrBvyfHvtWfhy1Nf8PxENuELmFrGqfRcSdXjmm5YX1vI2I59S4qUCC0eO_CZ1rmxRP-zXjjsEivCM6lIUuBTBh2RNgAIc6NyKkK6qmnOlnzrg_KKqPL6aNhirjjwAqOCq1X4fOEdiSoYfwkzhKfK6TRKoCWpKQUL7O5doW58_OkpVqxNLeyVam4tci2QC21cd4giLijKSMfcGRFvPXir_qDQthEFEtOA';

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
      } = await axios.create({
        baseUrl: `${REACT_APP_TRANSACTION_SERVICE_URL}/transaction/count`,
        method: 'GET',
        headers: { Authorizer: tempToken },
      })();

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
