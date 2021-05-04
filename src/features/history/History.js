import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPageForTransactionsHistory,
  fetchTransactionsHistory,
  historySelector,
  currentPageSelector,
} from './historySlice';
import PaginationControls from 'features/global/PaginationControls';
import Transaction from 'features/global/Transaction';

export default function History() {
  const dispatch = useDispatch();
  const transactions = useSelector(currentPageSelector);

  useEffect(() => {
    dispatch(fetchTransactionsHistory(historySelector));
  }, [dispatch]);

  return (
    <div style={{ paddingLeft: '10rem' }}>
      <PaginationControls
        changeDisplayPage={fetchPageForTransactionsHistory}
        paginationSelector={historySelector}
      />

      {transactions.length > 0 &&
        transactions.map((t) => <Transaction key={t.id} transaction={t} />)}
    </div>
  );
}
