// Modules
import React from 'react';

// Utils
import { getTotalString } from '../../utils/getTotalString';

// Styles
import styles from './Transaction.module.css';

function Transaction(props) {
  const {
    transaction: {
      message,
      buyer,
      seller,
      total,
      stock: { tickerSymbol },
    },
  } = props;
  return (
    <div className={styles.transaction}>
      <h3 className={styles.name}>{buyer.displayName}</h3>
      <p className={styles.total}>${getTotalString(total)}</p>
      <p className={styles.message}>&ldquo;{message}&rdquo;</p>
      <p className={styles.details}>
        Purchased {tickerSymbol} from {seller.displayName}
      </p>
    </div>
  );
}

export default Transaction;
