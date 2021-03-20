// Modules
import React from 'react';
import Ticker from 'react-ticker';

// Styles
import styles from './StockTicker.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

// sample data
const stocksArray = [
  {
    stockSymbol: 'GMSK',
    stockPrice: '$102.31',
    priceChange: '$-0.09',
    transactionMessage: 'Buy and hold',
    id: 'bd75dc21-bef6-4c90-ae3e-f1f9b26faff3',
  },
  {
    stockSymbol: 'MDPC',
    stockPrice: '$32.91',
    priceChange: '$0.06',
    transactionMessage: 'Sleeper',
    id: 'ee93ca35-25fd-438a-bfa3-3f83d4298018',
  },
  {
    stockSymbol: 'OTHR',
    stockPrice: '$12.45',
    priceChange: '$-0.20',
    transactionMessage: 'Never know',
    id: 'dbc3605c-d6d0-4138-8710-01f19eb1087d',
  },
  {
    stockSymbol: 'HYPE',
    stockPrice: '$112.05',
    priceChange: '$0.49',
    transactionMessage: 'Trending on Twitter',
    id: '85f0e98d-ec8c-4392-970d-6fe050003c83',
  },
  {
    stockSymbol: 'MEME',
    stockPrice: '$286.76',
    priceChange: '$0.98',
    transactionMessage: 'To the moon',
    id: '8a6f6bd1-ae10-4f58-81fd-55dad72d019e',
  },
];

export default function StockTicker() {
  return (
    <section className={styles.container}>
      <Ticker mode="await">
        {() => (
          <>
            {stocksArray.map((stock) => {
              return (
                <article className={styles.stock} key={stock.id}>
                  <h4>{stock.stockSymbol}</h4>

                  <p>{stock.stockPrice}</p>

                  {+stock.priceChange.replace('$', '') >= 0 ? (
                    <FontAwesomeIcon
                      icon={faSortUp}
                      className={styles.upIcon}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faSortDown}
                      className={styles.downIcon}
                    />
                  )}

                  <p>{stock.priceChange}</p>

                  <p>"{stock.transactionMessage}"</p>
                </article>
              );
            })}
          </>
        )}
      </Ticker>
    </section>
  );
}
