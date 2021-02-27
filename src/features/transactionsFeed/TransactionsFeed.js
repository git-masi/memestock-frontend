// Modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux Store
import { fetchTransactions, selectAllTransactions } from './transactionsSlice';

function TransactionsFeed() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div>
      {transactions.length > 0 &&
        transactions.map((t) => <p key={t.id}>{t.message}</p>)}
    </div>
  );
}

export default TransactionsFeed;
