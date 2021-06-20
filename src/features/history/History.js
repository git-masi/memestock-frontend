import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory, historySelector } from './historySlice';
import Transaction from 'features/global/Transaction';

export default function History() {
  const dispatch = useDispatch();
  const { hasError, data } = useSelector(historySelector);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <div style={{ paddingLeft: '10rem' }}>
      {data.length > 0 &&
        data.map((t) => <Transaction key={t.id} transaction={t} />)}

      {hasError && <p>Oops, something went wrong 😕</p>}
    </div>
  );
}
