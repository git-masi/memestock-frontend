
// imports
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';

// Styles
import styles from './NewOrder.module.css';

// sample data
const realMemeStocks = ['GMSK', 'HYPE', 'MEME', 'MDPC', 'OTHR'];
const ownedStocks = [
  {
    stockName: 'GMSK',
    stockShares: 7,
  },
  {
    stockName: 'HYPE',
    stockShares: 23,
  },
  {
    stockName: 'MEME',
    stockShares: 42,
  },
];

const totalCash = 5000.5;

export default function NewOrder() {
  // use state for showing buy or sell info

  const [showBuyForm, setShowBuyForm] = useState(true);

  const toggleShowBuyForm = () => setShowBuyForm((prev) => !prev);

  return (
    <div className={styles.formContainer}>
      <h1>New Order</h1>
      <div>
        <button
          className={styles.buybtn}
          disabled={showBuyForm}
          onClick={toggleShowBuyForm}
        >
          Buy
        </button>

        <button
          className={styles.sellbtn}
          disabled={!showBuyForm}
          onClick={toggleShowBuyForm}
        >
          Sell
        </button>
      </div>

      {showBuyForm ? <BuyForm /> : <SellForm />}
    </div>
  );
}

function BuyForm() {

  const { register, handleSubmit, watch, reset, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const sharePrice = useRef({});
  sharePrice.current = watch('price', '0.00');

  const quantity = useRef({});
  quantity.current = watch('quantity', '');

  const symbol = useRef({});
  symbol.current = watch('symbol', '');

  const totalPrice = sharePrice.current * quantity.current;

  const cashRemaining = totalCash - totalPrice;

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  console.log(errors);

// find search match for suggestion
  function searchResults() {

    // array of all matches
    const found = realMemeStocks.filter(element => element.includes(symbol.current.toUpperCase()))

    // clear out results
    document.getElementById('searchResults').innerHTML = "";
    
    if (symbol.current !== "") {

      // show results box
      document.getElementById('searchResults').style.display = "flex";
   
        if (found.length < 1) {

          const listItem = document.createElement('div');
          listItem.innerHTML = "No results";
          document.getElementById('searchResults').appendChild(listItem);
            
        } else {
            
            // display results
            for (let i = 0; i < found.length; i++) {
              const listItem = document.createElement('div');
              listItem.innerHTML = found[i];
              document.getElementById('searchResults').appendChild(listItem);
            }
        }
      
   } else {
    document.getElementById('searchResults').style.display = "none";
   }

  }

  // update input with selection
const showStockClick = event => {
  // make sure parent can't be selected- rarely occurs
  if (!event.target.innerHTML.includes('div')) {
  // update input
   document.getElementById('symbol').value = event.target.innerHTML;
   symbol.current = event.target.innerHTML;
  // clear error text
  document.getElementById('symbol').click();
  document.getElementById('symbol').blur();

   // remove suggestion
   document.getElementById('searchResults').style.display = "none";
  }
}


  return (
    <form className={styles.subFormContainer} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input name="type" ref={register} defaultValue="buy" hidden />

        {errors.symbol && errors.symbol.type === 'validate' && (
          <div className={styles.error}>Must match a 'real' memestock</div>
        )}
        {errors.symbol && errors.symbol.type === 'required' && (
          <div className={styles.error}>Ticker symbol must be entered</div>
        )}
        <label htmlFor="symbol">Stock Ticker Symbol</label>

        <input
          className={errors.symbol ? styles.inputError : styles.input}
          name="symbol"
          id="symbol"
          type="text"
          autoComplete="off"
          ref={register({
            required: true,
            validate: (value) => realMemeStocks.includes(value.toUpperCase())
          })}
          onKeyUp={searchResults}
        ></input>
        <div 
          className={styles.searchResults} 
          id="searchResults"
          onClick={showStockClick}
          > 
          </div>
      </div>

      <div>
        {errors.quantity && errors.quantity.type === 'required' && (
          <div className={styles.error}>Quantity must be selected</div>
        )}
        {errors.quantity && errors.quantity.type === 'validate' && (
          <div className={styles.error}>
            Cash remaining must be $0 or greater
          </div>
        )}
        <label htmlFor="quantity">Quantity</label>

        <input
          className={errors.quantity ? styles.inputError : styles.input}
          name="quantity"
          type="number"
          step="1"
          min="1"
          autoComplete="off"
          ref={register({
            required: true,
            validate: (value) => value * sharePrice.current < totalCash,
          })}
        ></input>
      </div>

      <div>
        {errors.price && errors.price.type === 'required' && (
          <div className={styles.error}>Price must be selected</div>
        )}
        <label htmlFor="price">Order Share Price</label>
        <input
          className={errors.price ? styles.inputError : styles.input}
          name="price"
          min="0.01"
          type="number"
          step="0.01"
          ref={register({ required: true })}
        ></input>
      </div>

      <hr className={styles.hr}></hr>

      <div>
        <div className={styles.tally}>
          Total Price: ${totalPrice.toFixed(2)}
        </div>
      </div>
      <div>
        {errors.cashRemaining && errors.cashRemaining.type === 'validate' && (
          <div className={styles.error}>
            You don't have enough cash remaining
          </div>
        )}
        <div className={styles.tally}>
          {' '}
          Cash Remaining: ${cashRemaining.toFixed(2)}
        </div>
      </div>

      <input type="submit" className={styles.submit} />
    </form>
  );
}

function SellForm() {
  // variables
  const { register, handleSubmit, watch, reset, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const onErrors = (errors) => console.error(errors);

  const stock = useRef({});
  stock.current = watch('stock');

  const sharePrice = useRef({});
  sharePrice.current = watch('price', '0.00');

  const quantity = useRef({});
  quantity.current = watch('quantity', '');

  const totalPrice = sharePrice.current * quantity.current;

  // map to populate owned stocks list
  const optionsArray = ownedStocks.map(x => <option>{x.stockName}</option>)

  // functions

  function quantityCheck() {
    for (var i = 0; i < ownedStocks.length; i++) {
      if (ownedStocks[i].stockName === stock.current) {
        return ownedStocks[i].stockShares;
      } else {
        return Infinity;
      }
    }
  }



  return (
    <form
      className={styles.subFormContainer}
      onSubmit={handleSubmit(onSubmit, onErrors)}
    >
      <div>
        <input name="type" ref={register} defaultValue="sell" hidden />
        {errors.stock && errors.stock.type === 'validate' && (
          <div className={styles.error}>Select a stock</div>
        )}
        <label htmlFor="stock">Stock To Sell: </label>
        <select
          name="stock"
          className={errors.stock ? styles.selectError : styles.select}
          ref={register({
            required: true,
            validate: (value) => value !== '-select-',
          })}
        >
          <option disabled selected>
            -select-
          </option>
          {optionsArray}
        </select>
        <div>
          {errors.quantity && errors.quantity.type === 'required' && (
            <div className={styles.error}>Quantity must be selected</div>
          )}
          {errors.quantity && errors.quantity.type === 'validate' && (
            <div className={styles.error}>
              You have exceeded your owned shares
            </div>
          )}
          <label htmlFor="quantity">Quantity: </label>

          <input
            className={errors.quantity ? styles.inputError : styles.input}
            name="quantity"
            min="1"
            type="number"
            step="1"
            ref={register({
              required: true,
              validate: (value) => value <= quantityCheck(),
            })}
          ></input>
        </div>
        <div>
          {errors.price && errors.price.type === 'required' && (
            <div className={styles.error}>Price must be selected</div>
          )}
          <label htmlFor="price">Sell Price Per Share: $</label>
          <input
            className={errors.price ? styles.inputError : styles.input}
            name="price"
            min="0.01"
            type="number"
            step="0.01"
            ref={register({ required: true })}
          ></input>
        </div>
        <hr className={styles.hr}></hr>
        <div>
          <div className={styles.tally}>
            {' '}
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        </div>
        ` ` <input type="submit" className={styles.submit} />
      </div>
    </form>
  );
}
