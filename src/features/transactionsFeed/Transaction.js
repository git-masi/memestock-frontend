// Modules
import React from 'react';

// Styles
import styles from './Transaction.module.css';

function Transaction(props) {
  const {
    transaction: {
      message,
      buyerName,
      sellerName,
      total,
      stock: { symbol },
    },
  } = props;
  return (
    <div className={styles.transaction}>
      <h3>{message}</h3>
      <p>
        {buyerName} purchased {symbol} from {sellerName} for ${total}
      </p>
    </div>
  );
}

export default Transaction;
