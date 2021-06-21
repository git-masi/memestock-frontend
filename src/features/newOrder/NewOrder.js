// imports
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

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
    mode: "onBlur",
    reValidateMode: "onBlur"
  });
  const optionSelected = useRef(false);

  const stockInput = watch("stock", "");

  console.log(stockInput);

  const onSubmit = (data) => console.log(data);

  const handleStockInputKeyDown = (e) => {
    console.log("key press");
    optionSelected.current = false;
  };

  const handleStockSuggestionClick = (e, value) => {
    e.preventDefault();
    optionSelected.current = true;
    setValue("stock", value);
    setStocksFound([]);
  };

  useEffect(() => {
    if (!optionSelected.current)
      setStocksFound(
        stockInput === ""
          ? []
          : companies.map(c => c.tickerSymbol).filter((s) => s.startsWith(stockInput.toUpperCase()))
      );
  }, [stockInput]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="type" ref={register} defaultValue="buy" hidden />

      <label>
        Stock:
        <input
          name="stock"
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

      <button type="submit">Submit</button>
    </form>
  );
}

function SellForm(props) {
  const { user, companies } = props;
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur"
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="type" ref={register} defaultValue="sell" hidden />

      <label>
        Stock:
        <select name="stock" ref={register}>
        {companies.map(({tickerSymbol}) => (<option key={tickerSymbol} value={tickerSymbol}>{tickerSymbol}</option>))}
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
