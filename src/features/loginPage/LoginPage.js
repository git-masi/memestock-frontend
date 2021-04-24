//WORK ITEMS

// Drop down suggestions for stock symbol input.
// keep input value (watched) in state?
// show display if match

// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

// Redux store
import { updateUserInfo } from './userInfoSlice';

// Styles
import styles from './LoginPage.module.css';

// Components
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

const { REACT_APP_USER_SERVICE_URL } = process.env;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const usernameRegex = /[^\s]/;
const emailRegex = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function SignUpPage() {
  const { register, handleSubmit, watch, reset, errors, setError } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const dispatch = useDispatch();

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
        `${REACT_APP_USER_SERVICE_URL}/user/signup`,
        { username, email }
      );

      console.log(signupResponse);
      const { accountStatus } = signupResponse.data;

      if (accountStatus === 'FORCE_CHANGE_PASSWORD') {
        // Finish creating user by setting the password
        const changePasswordResponse = await axios.post(
          `${REACT_APP_USER_SERVICE_URL}/user/login`,
          { username: email, password: 'NewpasS!23', newPassword: password }
        );
        console.log(changePasswordResponse);
        const {
          AccessToken: accessToken,
          IdToken: idToken,
          RefreshToken: refreshToken,
        } = changePasswordResponse.data;
        const payload = { accessToken, idToken, refreshToken, username, email };
        dispatch(updateUserInfo(payload));
        // Store token in session so other parts of app can get it
        // data.AccessToken,
        // data:
        //   AccessToken: ""
        //   ExpiresIn: 3600
        //   IdToken: ""
        //   RefreshToken: ""
        //   TokenType: "Bearer"
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={styles.subFormContainer}
      onSubmit={handleSubmit(onSignUpSubmit)}
    >
      <div className={styles.formContainer}>
        <h3>Signing Up for MemeStock</h3>

        <div className={styles.login_message}>
          To signup, provide a username and password and you'll be good to go.
          If your username has already been used, then you'll have to pick
          another one.
        </div>

        {/*
          {errors.username && errors.username.type === 'validate' && (
            <div className={styles.error}>Enter your username</div>
          )}
        */}

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

        {/*
          {errors.username && errors.username.type === 'validate' && (
            <div className={styles.error}>Enter your password</div>
          )}
          */}
        <label>
          Password:
          <input
            name="password"
            className={errors.password ? styles.inputError : styles.input}
            ref={register({
              required: true,
              minLength: 8,
              pattern: passwordRegex,
            })}
          />
        </label>

        {/*
          {errors.username && errors.username.type === 'validate' && (
            <div className={styles.error}>Enter your password</div>
          )}
          */}
        <label>
          Re-enter your password:
          <input
            name="passwordTwo"
            className={errors.passwordTwo ? styles.inputError : styles.input}
            ref={register({
              required: true,
              pattern: passwordRegex,
            })}
          />
        </label>

        <input
          type="submit"
          disabled={Object.keys(errors).length > 0}
          value="Sign Up Now"
          className={styles.submit}
        />
      </div>
    </form>
  );
}

export function LoginPage() {
  const { register, handleSubmit, watch, reset, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const [userName, setUserName] = useState(''); // '' is the initial state value
  const [password, setPassword] = useState(''); // '' is the initial state value

  const onSubmit = (data) => {
    console.log('onSubmit called');
    axios
      .post('/user/login', { username: userName, password: password })
      .then(function (response) {
        // handle success
        // goto the "main page"
        console.log('success', response);
      })
      .catch(function (error) {
        // handle error
        console.error('error', error);
      })
      .then(function () {
        // always executed
        console.log('always)');
      });
    reset();
  };

  return (
    <form className={styles.subFormContainer} onSubmit={handleSubmit(onSubmit)}>
      <input name="type" ref={register} defaultValue="wtf" hidden />
      <div className={styles.formContainer}>
        <h1>Sign In</h1>
        <div className={styles.login_message}>
          Please enter your username and password below.
          <br />
          If you don't have one, then sign up for free!
        </div>
        <div id="loginDiv">
          {errors.username && errors.username.type === 'validate' && (
            <div className={styles.error}>
              Username's are required and must be 4 or more characters
            </div>
          )}

          <label htmlFor="username">Username: </label>
          <input
            name="username"
            className={errors.username ? styles.inputError : styles.input}
            ref={register({
              required: true,
              validate: (value) => value !== '' && value.length > 3,
            })}
          />
        </div>
        <div id="passwordDiv">
          {/*
          {errors.username && errors.username.type === 'validate' && (
            <div className={styles.error}>Enter your password</div>
          )}
*/}
          <label htmlFor="username">Password:&nbsp;&nbsp;</label>
          <input
            name="username"
            className={errors.username ? styles.inputError : styles.input}
            ref={register({
              required: true,
              validate: (value) => value !== '-select-',
            })}
          />
        </div>
        <div id="submit">
          <input
            type="submit"
            disabled={Object.keys(errors).length > 0}
            value="Sign In"
            className={styles.submit}
          />
        </div>
        <div className={styles.signup_link}>
          <span>Don't have a login? &nbsp;&nbsp;</span>
          <NavLink
            to="/sign-up"
            className={styles.link}
            activeClassName={styles.active}
          >
            <span>Sign Up</span>
            <FontAwesomeIcon
              icon={faUserPlus}
              className={styles.icon}
              size="1x"
            />
          </NavLink>
        </div>
      </div>
    </form>
  );
}
