// Modules
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux Store
import { fetchTransactions, selectAllTransactions } from './transactionsSlice';

// Styles
import styles from './TransactionsFeed.module.css';

// Components
import Transaction from '../global/Transaction';

export default function TransactionsFeed() {
  const dispatch = useDispatch();
  const { data, hasError } = useSelector(selectAllTransactions);
  const bottomEl = useRef(null);

  useEffect(() => {
    const observedEl = bottomEl.current;
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) dispatch(fetchTransactions());
    }, options);

    if (observedEl) observer.observe(observedEl);

    return () => {
      if (observedEl) observer.unobserve(observedEl);
    };
  }, [bottomEl]);

  return (
    <div className={styles.container}>
      {data.length > 0 &&
        data.map((t) => <Transaction key={t.sk} transaction={t} />)}

      {hasError && <p>Oh no! Something went wrong 😟</p>}

      <div ref={bottomEl}></div>
    </div>
  );
}
