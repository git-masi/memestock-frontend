//WORK ITEMS

// Drop down suggestions for stock symbol input.
// keep input value (watched) in state?
// show display if match

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
  // const [showSearchSuggestions, setSearchSuggestions] = useState("true");

  const { register, handleSubmit, watch, reset, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const sharePrice = useRef({});
  sharePrice.current = watch('price', '0.00');

  const quantity = useRef({});
  quantity.current = watch('quantity', '');

  let totalPrice = sharePrice.current * quantity.current;

  let cashRemaining = totalCash - totalPrice;

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  console.log(errors);

  function findMatch(value) {
    for (var i = 0; i < realMemeStocks.length; i++) {
      if (realMemeStocks[i] === value) {
        i = realMemeStocks.length;
        return value;
      }
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
          type="text"
          ref={register({
            required: true,
            validate: (value) => value === findMatch(value),
          })}
        ></input>
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

  let totalPrice = sharePrice.current * quantity.current;

  // functions
  let optionsArray = [];
  function options() {
    for (var i = 0; i < ownedStocks.length; i++) {
      optionsArray[i] = <option>{ownedStocks[i].stockName}</option>;
    }
  }
  options();

  function quantityCheck() {
    for (var i = 0; i < ownedStocks.length; i++) {
      if (ownedStocks[i].stockName === stock.current) {
        return ownedStocks[i].stockShares;
      } else {
        return 999999;
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
        {errors.username && errors.username.type === 'validate' && (
          <div className={styles.error}>Enter your username</div>
        )}
        <label htmlFor="username">Stock To Sell: </label>
        <select
          name="username"
          className={errors.username ? styles.usernameError : styles.select}
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
