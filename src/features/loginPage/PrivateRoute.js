import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { selectUserInfo } from './userInfoSlice';

export default function PrivateRoute({ children, ...rest }) {
  const auth = useSelector(selectUserInfo);
  const authorized = ['accessToken', 'refreshToken', 'idToken'].every(
    (key) => !!auth[key]
  );

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
