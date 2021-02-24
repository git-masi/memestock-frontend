// Modules
import React from 'react';

// Components
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Error404 from './features/errorPage/Error404';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Error404 />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
