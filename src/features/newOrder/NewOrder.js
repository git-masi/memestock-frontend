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
  const tickerSymbolInput = useRef(null);
  const tickerSymbolBlurTimeout = useRef(null);

  register(tickerSymbolInput.current, { required: true });

  const onSubmit = (data) => console.log(data);

  const handleStockInputKeyDown = (e) => {
    optionSelected.current = false;
  };

  const handleStockSuggestionClick = (e, value) => {
    e.preventDefault();
    e.stopPropagation();
    clearTimeout(tickerSymbolBlurTimeout.current);
    tickerSymbolInput.current.focus();
    optionSelected.current = true;
    setValue('tickerSymbol', value);
    setStocksFound([]);
  };

  const handleTickerSymbolBlur = () => {
    // Calling setStocksFound([]) essentially dismisses the suggestions
    // But the blur event is called before the suggestion button click event
    // so by using a timeout we can dismiss the blur
    // However, this is not the most riliable solution if the call stack
    // has a lot going on
    tickerSymbolBlurTimeout.current = setTimeout(() => {
      setStocksFound([]);
      optionSelected.current = false;
    }, 50);
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
  }, [tickerSymbol, companies]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="type" ref={register} defaultValue="buy" hidden />

      <div className={styles.stockWrapper}>
        <label>
          Stock Ticker
          <input
            autoComplete="off"
            name="tickerSymbol"
            ref={tickerSymbolInput}
            onKeyDown={handleStockInputKeyDown}
            onBlur={handleTickerSymbolBlur}
          />
        </label>

        <div
          className={[
            styles.suggestionContainer,
            stocksFound.length < 1 ? styles.hide : '',
          ].join(' ')}
        >
          {stocksFound.map((s) => (
            <button
              key={s}
              value={s}
              onClick={(e) => {
                handleStockSuggestionClick(e, s);
              }}
              onFocus={() => clearTimeout(tickerSymbolBlurTimeout.current)}
              onBlur={handleTickerSymbolBlur}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <label>
        Quantity
        <input
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

      <button
        type="submit"
        className={styles.submit}
        disabled={+cashRemaining < 0}
      >
        Submit
      </button>
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
