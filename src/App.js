// Modules
import React from 'react';

// Components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error404 from './features/errorPage/Error404';
import TransactionsFeed from './features/transactionsFeed/TransactionsFeed';
import GlobalLoader from './features/portal/GlobalLoader';

function App() {
  return (
    <>
      <GlobalLoader />
      <Router>
        <Switch>
          <Route path="/transactions/feed">
            <TransactionsFeed />
          </Route>
          <Route path="/test">
            <h1>TEST!</h1>
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
