// Modules
import React from 'react';

// Components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error404 from './features/errorPage/Error404';
import Transactions from './features/transactionsFeed/Transactions';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/transactions/feed">
          <Transactions />
        </Route>
        <Route path="/">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
