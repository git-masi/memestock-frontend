import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTransactionsHistory } from './historySlice';

export default function History() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactionsHistory());
  }, [dispatch]);

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}
