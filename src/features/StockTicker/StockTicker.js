// Modules
import React from 'react';
import Ticker from 'react-ticker';

// Styles
import styles from './StockTicker.module.css';

// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

export default function StockTicker() {
  // sample data
  var stocksArray = [
    {
      stockSymbol: 'GMSK',
      stockPrice: '$102.31',
      latestMove: '$-0.09',
      transactionMessage: 'Buy and hold',
    },
    {
      stockSymbol: 'MDPC',
      stockPrice: '$32.91',
      latestMove: '$0.06',
      transactionMessage: 'Sleeper',
    },
    {
      stockSymbol: 'OTHR',
      stockPrice: '$12.45',
      latestMove: '$-0.20',
      transactionMessage: 'Never know',
    },
    {
      stockSymbol: 'HYPE',
      stockPrice: '$112.05',
      latestMove: '$0.49',
      transactionMessage: 'Trending on Twitter',
    },
    {
      stockSymbol: 'MEME',
      stockPrice: '$286.76',
      latestMove: '$0.98',
      transactionMessage: 'To the moon',
    },
  ];

  // build ticker object from data
  let tickerObject = [];

  for (var i = 0; i < stocksArray.length; i++) {
    let upDown;
    let removeDollarSign = stocksArray[i].latestMove.substring(1);
    if (parseFloat(removeDollarSign) > 0) {
      upDown = <FontAwesomeIcon icon={faSortUp} className={styles.upIcon} />;
    } else {
      upDown = (
        <FontAwesomeIcon icon={faSortDown} className={styles.downIcon} />
      );
    }

    tickerObject[i] = (
      <div>
        <div className={styles.stockTitle}>{stocksArray[i].stockSymbol}</div>
        <div>{stocksArray[i].stockPrice}</div>
        <div>
          {upDown}
          {stocksArray[i].latestMove}
        </div>
        <div>"{stocksArray[i].transactionMessage}"</div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Ticker>
        {({ index }) => (
          <>
            <div className={styles.tickerContainer}>{tickerObject}</div>
          </>
        )}
      </Ticker>
    </div>
  );
}
