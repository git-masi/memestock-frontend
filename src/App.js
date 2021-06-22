// Modules
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Redux store
import { updateUserInfo } from './features/loginPage/userInfoSlice';

// Styles
import styles from './App.module.css';

// Components
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
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
              <LogOut />
            </Route>

            <Route exact path="/login">
              <LoginPage />
            </Route>

            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
          <StockTicker />
        </main>
      </Router>
    </>
  );
}

function LogOut() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(
      updateUserInfo({
        email: '',
        username: '',
        accessToken: '',
        idToken: '',
        refreshToken: '',
      })
    );
    history.push('/login');
  }, [dispatch, history]);

  return <h1>Testing 123 can anybody hear me?</h1>;
}
