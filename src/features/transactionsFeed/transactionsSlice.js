import { createSlice } from '@reduxjs/toolkit';
import { mockApiResponse } from '../../utils/mockApiResponse';

const initialState = [];

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransactions: (state, action) => {
      const { payload } = action;
      return payload.concat(state);
    },
  },
});

export const { addTransactions } = transactionsSlice.actions;

export const selectAllTransactions = (state) => state.transactions;

export default transactionsSlice.reducer;

// Thunks
export function fetchTransactions() {
  return async (dispatch, getState) => {
    // Think of transactions like a cache
    // This is guard to prevent re-fetching transactions if we already have some
    const currState = getState();
    const { transactions } = currState;
    if (transactions.length > 0) return;

    // todo: fetch real data
    const dummyData = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const orders = await mockApiResponse(dummyData);

    dispatch(addTransactions(orders));
  };
}
