// imports
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { centsToDollars } from 'utils/money';

// Redux store
import { selectUserInfo } from '../loginPage/userInfoSlice';

// Styles
import styles from './NewOrder.module.css';

const { REACT_APP_MEMESTOCK_API } = process.env;

export default function NewOrder() {
  const [showBuyForm, setShowBuyForm] = useState(true);
  const [user, setUser] = useState({});
  const [companies, setCompanies] = useState({});
  const { accessToken } = useSelector(selectUserInfo);

  const toggleShowBuyForm = () => setShowBuyForm((prev) => !prev);

  useEffect(() => {
    (async () => {
      const { data: userData } = await axios({
        method: 'GET',
        url: `${REACT_APP_MEMESTOCK_API}/users`,
        headers: {
          Authorization: accessToken,
        },
      });

      const { data: companyData } = await axios({
        method: 'GET',
        url: `${REACT_APP_MEMESTOCK_API}/companies`,
        // headers: {
        //   Authorization: accessToken,
        // },
      });

      setUser(userData);
      setCompanies(companyData);
    })();
  }, [accessToken]);

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

      {showBuyForm ? (
        <BuyForm {...{ user, companies }} />
      ) : (
        <SellForm {...{ user, companies }} />
      )}
    </div>
  );
}

function BuyForm(props) {
  const { user, companies } = props;
  const [stocksFound, setStocksFound] = useState([]);
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const tickerSymbol = watch('tickerSymbol', '');
  const quantity = watch('quantity', '0');
  const price = watch('price', '0');
  const total = (quantity * price).toFixed(2);
  const cashOnHand = centsToDollars(user.cashOnHand);
  const cashRemaining = cashOnHand - total;
  const optionSelected = useRef(false);

  console.log(tickerSymbol, quantity, price);

  const onSubmit = (data) => console.log(data);

  const handleStockInputKeyDown = (e) => {
    console.log('key press');
    optionSelected.current = false;
  };

  const handleStockSuggestionClick = (e, value) => {
    e.preventDefault();
    optionSelected.current = true;
    setValue('stock', value);
    setStocksFound([]);
  };

  useEffect(() => {
    if (!optionSelected.current)
      setStocksFound(
        tickerSymbol === ''
          ? []
          : companies
              .map((c) => c.tickerSymbol)
              .filter((s) => s.startsWith(tickerSymbol.toUpperCase()))
      );
  }, [tickerSymbol]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="type" ref={register} defaultValue="buy" hidden />

      <label>
        Stock
        <input
          name="tickerSymbol"
          ref={register}
          onKeyDown={handleStockInputKeyDown}
        />
        <div>
          {stocksFound.map((s) => (
            <button key={s} onClick={(e) => handleStockSuggestionClick(e, s)}>
              {s}
            </button>
          ))}
        </div>
      </label>

      <label>
        Quantity
        <input
          // className={errors.quantity ? styles.inputError : styles.input}
          name="quantity"
          type="number"
          step="1"
          min="1"
          autoComplete="off"
          ref={register({
            required: true,
          })}
        ></input>
      </label>

      <label>
        Price Per Share
        <input
          // className={errors.price ? styles.inputError : styles.input}
          name="price"
          min="0.01"
          type="number"
          step="0.01"
          autoComplete="off"
          ref={register({ required: true })}
        ></input>
      </label>

      <h3>Total: ${total}</h3>
      <p>Available cash: ${cashOnHand}</p>
      <p>Cash remaining: ${cashRemaining}</p>

      <button type="submit">Submit</button>
    </form>
  );
}

function SellForm(props) {
  const { user, companies } = props;
  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="type" ref={register} defaultValue="sell" hidden />

      <label>
        Stock:
        <select name="stock" ref={register}>
          {companies.map(({ tickerSymbol }) => (
            <option key={tickerSymbol} value={tickerSymbol}>
              {tickerSymbol}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
