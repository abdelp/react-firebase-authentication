import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  error: null,
};

const SignUpFormBase = props => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = event => {
    const { username, email, password } = state;

    props.firebase
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => props
        .firebase
        .user(authUser.user.uid)
        .set({
          username,
          email,
        }))
      .then(() => props.firebase.sendEmailVerification())
      .then(() => {
        setState({ ...INITIAL_STATE });
        props.history.push(ROUTES.HOME);
      })
      .catch(error => setState(
        state => ({ ...state, error }),
      ));

    event.preventDefault();
  };

  const onChange = e => {
    e.persist();
    setState(
      state => ({ ...state, [e.target.name]: e.target.value }),
    );
  };

  const isInvalid = state.password !== state.passwordConfirmation
    || !state.password
    || !state.email
    || !state.username;

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={state.username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
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
      <input
        name="passwordConfirmation"
        value={state.passwordConfirmation}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit" disabled={isInvalid}>Sign Up</button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  );
};

const SignUpLink = () => (
  <p>
    Don&apos;t have an account?
    {' '}
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

SignUpFormBase.propTypes = {
  firebase: PropTypes.shape({
    createUserWithEmailAndPassword: PropTypes.func,
    sendEmailVerification: PropTypes.func,
    user: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

SignUpFormBase.defaultProps = {
  history: {},
};

export default SignUpPage;

export { SignUpForm, SignUpLink };
