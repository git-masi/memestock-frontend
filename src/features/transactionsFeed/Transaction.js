import React from 'react';

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
    <div>
      <p>{message}</p>
      <p>
        {buyerName} purchased {symbol} from {sellerName} for ${total}
      </p>
    </div>
  );
}

export default Transaction;
