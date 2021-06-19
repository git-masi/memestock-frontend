// Modules
import React from 'react';
import { format } from 'date-fns';

// Utils
import { centsToDollars } from 'utils/money';

// Styles
import styles from './Transaction.module.css';

export default function Transaction(props) {
  const {
    transaction: { message = '', buyer, seller, total, created, tickerSymbol },
  } = props;
  return (
    <div className={styles.transaction}>
      <h3 className={styles.name}>{buyer}</h3>
      <p className={styles.total}>${centsToDollars(total)}</p>
      <p className={styles.message}>&ldquo;{message}&rdquo;</p>
      <p className={styles.details}>
        Purchased {tickerSymbol} from {seller}
      </p>
      <p className={styles.date}>
        {format(new Date(created), 'MMM d, y h:mm a')}
      </p>
    </div>
  );
}
