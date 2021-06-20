// Imports
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

// Redux store
import { selectUserInfo, updateUserInfo } from './userInfoSlice';

// Styles
import styles from './LoginPage.module.css';

// Components
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const { REACT_APP_MEMESTOCK_API } = process.env;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const usernameRegex = /[^\s]/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function SignUpPage() {
  const { register, handleSubmit, errors, setError } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const userInfo = useSelector(selectUserInfo);
  const authorized = ['accessToken', 'refreshToken', 'idToken'].every(
    (key) => !!userInfo[key]
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUpSubmit = async (data) => {
    try {
      console.log('onSignUpSubmit called', data);
      const { username, email, password, passwordTwo } = data;
      if (password !== passwordTwo) {
        setError('passwordTwo', {
          type: 'manual',
          message: 'Passwords must match',
        });
        return;
      }
      // data:
      //   accountStatus: "FORCE_CHANGE_PASSWORD"
      //   email: "test123@test.com"
      const signupResponse = await axios.post(
        `${REACT_APP_MEMESTOCK_API}/users/signup`,
        { username, email }
      );

      console.log('signupResponse', signupResponse);
      const { accountStatus } = signupResponse.data;

      if (accountStatus === 'FORCE_CHANGE_PASSWORD') {
        // Finish creating user by setting the password
        const changePasswordResponse = await axios.post(
          `${REACT_APP_MEMESTOCK_API}/users/login`,
          { username: email, password: 'NewpasS!23', newPassword: password }
        );
        if (changePasswordResponse) {
          console.log(
            'Signup was successful.  changePasswordResponse=',
            changePasswordResponse
          );
          // TODO: Refactor JSON response to use camelCase (on backend then remove this)
          const {
            AccessToken: accessToken,
            IdToken: idToken,
            RefreshToken: refreshToken,
          } = changePasswordResponse.data;
          const payload = {
            accessToken,
            idToken,
            refreshToken,
            username,
            email,
          };
          dispatch(updateUserInfo(payload));
          // Store token in session so other parts of app can get it
          // data.AccessToken,
          // data:
          //   AccessToken: ""
          //   ExpiresIn: 3600
          //   IdToken: ""
          //   RefreshToken: ""
          //   TokenType: "Bearer"

          history.push('/feed');
        } else {
          console.log(
            'request failed... changePasswordResponse=',
            changePasswordResponse
          );
        }
      }
    } catch (error) {
      console.error('try/catch error', JSON.stringify(error, null, 4));
      if (error && error.message && error.message.includes('status code 409')) {
        setError('username', {
          type: 'manual',
          message: 'Username already exists.  Please pick a different name.',
        });
      } else {
        setError('username', {
          type: 'manual',
          message:
            'Unexpected error, please refresh the page and try again. [' +
            error +
            ']',
        });
      }
    }
  };

  return (
    <>
      {authorized ? (
        <Redirect
          to={{
            pathname: '/feed',
          }}
        />
      ) : (
        <form
          className={styles.subFormContainer}
          onSubmit={handleSubmit(onSignUpSubmit)}
        >
          <div className={styles.formContainer}>
            <h3>Signing Up for MemeStock</h3>

            <div className={styles.login_message}>
              To signup, provide a username and password and you'll be good to
              go. If your username has already been used, then you'll have to
              pick another one.
            </div>

            {errors.username && (
              <div className={styles.error}>{errors.username.message}</div>
            )}

            <label>
              Username:
              <input
                name="username"
                type="text"
                className={errors.username ? styles.inputError : styles.input}
                ref={register({
                  required: true,
                  minLength: 4,
                  pattern: usernameRegex,
                })}
              />
            </label>

            {errors.email && (
              <div className={styles.error}>
                Your password is missing or not formatted correctly.
              </div>
            )}

            <label>
              Email:
              <input
                name="email"
                type="email"
                className={errors.email ? styles.inputError : styles.input}
                ref={register({
                  required: true,
                  pattern: emailRegex,
                })}
              />
            </label>
            {errors.password && (
              <div className={styles.error}>
                Your password is missing or not complex enough. Must be 8
                characters, 1 or more Upper, 1 or more lowercase and one or more
                number.{' '}
              </div>
            )}
            <label>
              Password:
              <input
                name="password"
                type="password"
                className={errors.password ? styles.inputError : styles.input}
                ref={register({
                  required: true,
                  minLength: 8,
                  pattern: passwordRegex,
                })}
              />
            </label>

            {errors.passwordTwo && (
              <div className={styles.error}>{errors.passwordTwo.message}</div>
            )}
            <label>
              Re-enter your password:
              <input
                name="passwordTwo"
                type="password"
                className={
                  errors.passwordTwo ? styles.inputError : styles.input
                }
                ref={register({
                  required: true,
                })}
              />
            </label>

            <input
              type="submit"
              /*disabled={Object.keys(errors).length > 0}*/
              value="Sign Up Now"
              className={styles.submit}
            />
          </div>
        </form>
      )}
    </>
  );
}

export function LoginPage(args) {
  const { register, handleSubmit, reset, setError, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const userInfo = useSelector(selectUserInfo);
  const authorized = ['accessToken', 'refreshToken', 'idToken'].every(
    (key) => !!userInfo[key]
  );
  const dispatch = useDispatch();
  const history = useHistory();

  if (args.logOut) {
    dispatch(
      updateUserInfo({
        email: '',
        username: '',
        accessToken: '',
        idToken: '',
        refreshToken: '',
      })
    );
  }

  const onSubmitLogin = async (data) => {
    const { username, password } = data;

    console.log('onSubmitLogin called', data);

    try {
      const loginResponse = await axios.post(
        `${REACT_APP_MEMESTOCK_API}/users/login`,
        { username, password }
      );

      if (loginResponse) {
        console.log('loginResponse', loginResponse);
        // TODO: Refactor JSON response to use camelCase (on backend then remove this)
        const {
          AccessToken: accessToken,
          IdToken: idToken,
          RefreshToken: refreshToken,
        } = loginResponse.data;
        const payload = { accessToken, idToken, refreshToken, username };
        dispatch(updateUserInfo(payload));
        history.push('/feed');
      } else {
        reset();
      }
    } catch (error) {
      console.error('Error with login', error);
      setError('password', {
        type: 'manual',
        message: 'Username or Password is invalid (try again)',
      });
    }
  };

  return (
    <>
      {authorized ? (
        <Redirect
          to={{
            pathname: '/feed',
          }}
        />
      ) : (
        <form
          className={styles.subFormContainer}
          onSubmit={handleSubmit(onSubmitLogin)}
        >
          <div className={styles.formContainer}>
            <h1>Sign In</h1>
            <div className={styles.login_message}>
              Please enter your username and password below.
              <br />
              If you don't have one, then sign up for free!
            </div>
            {errors.username && (
              <div className={styles.error}>
                Username's are required and must be 4 or more characters
              </div>
            )}
            {errors.password && (
              <div className={styles.error}>
                Your username or password is not valid
              </div>
            )}
            {errors.password && errors.password.message && (
              <div className={styles.error}>{errors.password.message}</div>
            )}

            <label htmlFor="username">
              Username:
              <input
                name="username"
                className={errors.username ? styles.inputError : styles.input}
                ref={register({
                  required: true,
                  validate: (value) => value !== '' && value.length > 3,
                })}
              />
            </label>
            <label>
              Password:&nbsp;&nbsp;
              <input
                name="password"
                type="password"
                className={errors.password ? styles.inputError : styles.input}
                ref={register({
                  required: true,
                })}
              />
            </label>
            <div id="submit">
              <input type="submit" value="Sign In" className={styles.submit} />
            </div>
            <div className={styles.signup_link}>
              <span>Don't have a login? &nbsp;&nbsp;</span>
              <NavLink
                to="/sign-up"
                className={styles.link}
                activeClassName={styles.active}
              >
                <span>Click here to Sign Up</span>
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className={styles.icon}
                  size="1x"
                />
              </NavLink>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
