import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory, historySelector } from './historySlice';
import styles from './History.module.css';
import { usd } from 'utils/money';

export default function History() {
  const dispatch = useDispatch();
  const { hasError, data } = useSelector(historySelector);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <div style={{ paddingLeft: '10rem' }}>
      <h1>Your Orders</h1>

      {data.length > 0 &&
        data.map((order) => <UserOrder key={order.sk} order={order} />)}

      {hasError && <p>Oops, something went wrong 😕</p>}
    </div>
  );
}

function UserOrder(props) {
  const { order } = props;

  return (
    <article className={styles.order}>
      <h3 className={styles.orderType}>Order Type: {order.orderType}</h3>
      <p>Status: {order.orderStatus}</p>
      <p>Stock: {order.tickerSymbol}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Total: {usd(+order.total)}</p>
      <p>Created: {new Date(order.created).toDateString()}</p>
    </article>
  );
}
