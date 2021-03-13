// Modules
import React from 'react';

// Components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error404 from './features/errorPage/Error404';
import TransactionsFeed from './features/transactionsFeed/TransactionsFeed';
import GlobalLoader from './features/portal/GlobalLoader';
import Sidebar from './features/sidebar/Sidebar';
import './features/sidebar/sidebar.css';

function App() {
  return (
    <>
      <GlobalLoader />
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/transactions/feed">
            <TransactionsFeed />
          </Route>
          <Route path="/">
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
