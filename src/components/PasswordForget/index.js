import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

const PasswordForgetFormBase = props => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = event => {
    const { email } = state;

    console.log(props.firebase);

    props
      .firebase
      .resetPassword(email)
      .then(() => setState({ ...INITIAL_STATE }))
      .catch(error => setState(state => ({ ...state, error })));

    event.preventDefault();
  };

  const onChange = event => setState(state => ({ ...state, [event.target.name]: event.target.value }));

  const isInvalid = state.email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={state.email}
        onChange={onChange}
        type="text"
        placeholder="example@example.com"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>
      {state.error && <p>{state.error.message}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
