// Modules
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Redux Store
import { fetchTransactions } from './transactionsSlice';

function TransactionsFeed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div>
      <h1>test</h1>
    </div>
  );
}

export default TransactionsFeed;
