// Modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux Store
import { fetchTransactions, selectAllTransactions } from './transactionsSlice';

// Styles
import styles from './TransactionsFeed.module.css';

// Components
import Transaction from './Transaction';

function TransactionsFeed() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {transactions.length > 0 &&
        transactions.map((t) => <Transaction key={t.id} transaction={t} />)}
    </div>
  );
}

export default TransactionsFeed;
