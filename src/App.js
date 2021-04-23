// Modules
import React from 'react';

// Styles
import styles from './App.module.css';

// Components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error404 from './features/errorPage/Error404';
import TransactionsFeed from './features/transactionsFeed/TransactionsFeed';
import GlobalLoader from './features/portal/GlobalLoader';
import Sidebar from './features/sidebar/Sidebar';
import NewOrder from './features/newOrder/NewOrder';
import StockTicker from './features/stockTicker/StockTicker';
import { LoginPage, SignUpPage } from "./features/loginPage/LoginPage";

function App() {
  return (
    <>
      <GlobalLoader />
      <Router>
        <main className={styles.main}>
          <Sidebar />
          <Switch>
            <Route path="/feed">
              <TransactionsFeed />
            </Route>

            <Route path="/new-order">
              <NewOrder />
            </Route>

            <Route path="/sign-in">
              <LoginPage />
            </Route>
            <Route path="/sign-up">
              <SignUpPage />
            </Route>

            <Route path="/">
              <LoginPage />
            </Route>
          </Switch>
          <StockTicker />
        </main>
      </Router>
    </>
  );
}

export default App;
