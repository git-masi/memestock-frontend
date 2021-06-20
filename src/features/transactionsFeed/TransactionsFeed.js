// Modules
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux Store
import { fetchTransactions, selectAllTransactions } from './transactionsSlice';

// Styles
import styles from './TransactionsFeed.module.css';

// Components
import Transaction from '../global/Transaction';

function TransactionsFeed() {
  const dispatch = useDispatch();
  const { data, hasError } = useSelector(selectAllTransactions);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {data.length > 0 &&
        data.map((t) => <Transaction key={t.sk} transaction={t} />)}

      {hasError && <p>Oh no! Something went wrong 😟</p>}
    </div>
  );
}

export default TransactionsFeed;
