// Modules
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Styles
import styles from './StockTicker.module.css';

// Components
import Ticker from 'react-ticker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { centsToDollars } from 'utils/money';

const { REACT_APP_MEMESTOCK_API } = process.env;

export default function StockTicker() {
  const [stocksArray, setStocksArray] = useState([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data } = await axios({
        method: 'GET',
        url: `${REACT_APP_MEMESTOCK_API}/companies/stock-price`,
      });

      if (!cancelled) setStocksArray(data);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={styles.container}>
      {stocksArray.length > 0 && (
        <Ticker mode='await'>
          {() => (
            <>
              {stocksArray.map((stock) => {
                const priceChange =
                  stock.currentPricePerShare - stock.previousPricePerShare;

                return (
                  <article className={styles.stock} key={stock.sk}>
                    <h4>{stock.tickerSymbol}</h4>

                    <p>${centsToDollars(stock.currentPricePerShare)}</p>

                    {priceChange >= 0 ? (
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

                    <p>${centsToDollars(priceChange)}</p>

                    <p>"{stock.fulfillmentMessage}"</p>
                  </article>
                );
              })}
            </>
          )}
        </Ticker>
      )}
    </section>
  );
}
