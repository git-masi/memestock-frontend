// Modules
import React from 'react';
import { format } from 'date-fns';

// Utils
import { getTotalString } from '../../utils/getTotalString';

// Styles
import styles from './Transaction.module.css';

export default function Transaction(props) {
  const {
    transaction: {
      message,
      buyer,
      seller,
      total,
      created,
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
      <p className={styles.date}>
        {format(new Date(created), 'MMM d, y h:mm a')}
      </p>
    </div>
  );
}
