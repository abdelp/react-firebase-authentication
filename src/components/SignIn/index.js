import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const SignInFormBase = props => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = event => {
    const { username, email, password } = state;

    props
      .firebase
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setState(state => ({ ...state, ...INITIAL_STATE }));
        props.history.push(ROUTES.HOME);
      })
      .catch(error => setState(state => ({ ...state, error })));

    event.preventDefault();
  };

  const onChange = e => {
    e.persist();
    setState(
      state => ({ ...state, [e.target.name]: e.target.value }),
    );
  };

  const isInvalid = !state.password
    || !state.email;

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={state.email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={state.password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {state.error && <p>{state.error.message}</p>}
    </form>
  );
};

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
