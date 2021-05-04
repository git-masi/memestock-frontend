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

function App() {
  return (
    <>
      <GlobalLoader />
      <Router>
        <main className={styles.main}>
          <Sidebar />
          <Switch>
            <Route exact path="/feed">
              <TransactionsFeed />
            </Route>

            <Route exact path="/new-order">
              <NewOrder />
            </Route>

            <Route exact path="/history">
              <History />
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

export default App;
