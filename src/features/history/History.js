import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPageForTransactionsHistory,
  fetchTransactionsHistory,
  historySelector,
  currentPageSelector,
} from './historySlice';
import PaginationControls from 'features/global/PaginationControls';

export default function History() {
  const dispatch = useDispatch();
  const transactions = useSelector(currentPageSelector);

  useEffect(() => {
    dispatch(fetchTransactionsHistory(historySelector));
  }, [dispatch]);

  return (
    <div style={{ paddingLeft: '10rem' }}>
      {transactions.length > 0 &&
        transactions.map((t) => <p key={t.id}>{t.id}</p>)}

      <PaginationControls
        changeDisplayPage={fetchPageForTransactionsHistory}
        paginationSelector={historySelector}
      />
    </div>
  );
}
