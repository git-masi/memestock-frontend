import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchPageForTransactionsHistory,
  fetchTransactionsHistory,
} from './historySlice';
import PaginationControls from 'features/global/PaginationControls';

export default function History() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactionsHistory());
  }, [dispatch]);

  return (
    <div style={{ paddingLeft: '10rem' }}>
      <PaginationControls
        changeDisplayPage={fetchPageForTransactionsHistory}
        paginationSelector={(state) => state.history}
      />
    </div>
  );
}
