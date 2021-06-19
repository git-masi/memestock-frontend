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
import History from 'features/history/History';
import { LoginPage, SignUpPage } from './features/loginPage/LoginPage';
import PrivateRoute from 'features/loginPage/PrivateRoute';

export default function App() {
  return (
    <>
      <GlobalLoader />
      <Router>
        <main className={styles.main}>
          <Sidebar />
          <Switch>
            <PrivateRoute exact path="/feed">
              <TransactionsFeed />
            </PrivateRoute>

            <PrivateRoute exact path="/new-order">
              <NewOrder />
            </PrivateRoute>

            <PrivateRoute exact path="/history">
              <History />
            </PrivateRoute>

            <Route exact path="/sign-up">
              <SignUpPage />
            </Route>

            <Route exact path="/log-out">
              <LoginPage logOut={true} />
            </Route>

            <Route exact path="/login">
              <LoginPage />
            </Route>

            <Route path="/">
              <Error404 />
            </Route>
          </Switch>
          <StockTicker />
        </main>
      </Router>
    </>
  );
}
