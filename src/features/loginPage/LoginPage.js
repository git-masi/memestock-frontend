//WORK ITEMS

// Drop down suggestions for stock symbol input.
// keep input value (watched) in state?
// show display if match

// imports
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";

// Styles
import styles from './LoginPage.module.css';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserPlus} from "@fortawesome/free-solid-svg-icons";

export function SignUpPage() {

  const { register, handleSubmit, watch, reset, errors } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSignUpSubmit = (data) => {
    console.log('onSignUpSubmit called', data);
  }

    return (
    <form className={styles.subFormContainer} onSubmit={handleSubmit(onSignUpSubmit)}>
      <input name="type" ref={register} defaultValue="wtf" hidden/>
      <div className={styles.formContainer}>
        <h3>Signing Up for MemeStock</h3>
        <div className={styles.login_message}>
          To signup, provide a username and password and you'll be good to go.
          If your username has already been used, then you'll have to pick another one.
        </div>
        <div id="loginDiv">
          {/*
          {errors.username && errors.username.type === 'validate' && (
            <div className={styles.error}>Enter your username</div>
          )}
*/}
          <label htmlFor="username">Username:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            name="username"
            className={errors.username ? styles.inputError : styles.input}
            ref={register({
              required: true,
              validate: (value) => value !== '-select-',
            })}
          />
        </div>
        <div id="passwordDiv">
          {/*
          {errors.username && errors.username.type === 'validate' && (
            <div className={styles.error}>Enter your password</div>
          )}
*/}
          <label htmlFor="username">Password:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input
            name="username"
            className={errors.username ? styles.inputError : styles.input}
            ref={register({
              required: true,
              validate: (value) => value !== '-select-',
            })}
          />
        </div>
        <div id="passwordDiv">
          {/*
          {errors.username && errors.username.type === 'validate' && (
            <div className={styles.error}>Enter your password</div>
          )}
*/}
          <label htmlFor="username">Re-enter your password:&nbsp;&nbsp;</label>
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
          <input type="submit"
                 disabled={Object.keys(errors).length > 0}
                 value="Sign Up Now"
                 className={styles.submit}
          />
        </div>
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
    axios.post('/user/login', {username:  userName, password: password})
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
      console.log('always)')
    });
    reset();
  };

  return (
    <form className={styles.subFormContainer} onSubmit={handleSubmit(onSubmit)}>
      <input name="type" ref={register} defaultValue="wtf" hidden/>
      <div className={styles.formContainer}>
        <h1>Sign In</h1>
        <div className={styles.login_message}>
          Please enter your username and password below.<br/>
          If you don't have one, then sign up for free!
        </div>
        <div id="loginDiv">

          {errors.username && errors.username.type === 'validate' && (
            <div className={styles.error}>Username's are required and must be 4 or more characters</div>
          )}

          <label htmlFor="username">Username: </label>
          <input
            name="username"
            className={errors.username ? styles.inputError : styles.input}
            ref={register({
              required: true,
              validate: (value) => (value !== '' && value.length > 3),
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
          <input type="submit"
                 disabled={Object.keys(errors).length > 0}
                 value="Sign In"
                 className={styles.submit}
          />
        </div>
        <div className={styles.signup_link}>
          <span>
            Don't have a login? &nbsp;&nbsp;
          </span>
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
