import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
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
    const { email, password } = state;

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

const SignInGoogleBase = props => {
  const [state, setState] = useState({ error: null });

  const onSubmit = event => {
    props
      .firebase
      .signInWithGoogle()
      .then(socialAuthUser => props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        }))
      .then(() => {
        setState({ error: null });
        props.history.push(ROUTES.HOME);
      })
      .catch(error => setState({ error }));

    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Google</button>
      {state.error && <p>{state.error.messsage}</p>}
    </form>
  );
};

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebookBase = props => {
  const [state, setState] = useState({ error: null });

  const onSubmit = event => {
    props.firebase
      .signInWithFacebook()
      .then(socialAuthUser => props.firebase
        .user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        }))
      .then(() => {
        setState({ error: null });
        props.history.push(ROUTES.HOME);
      })
      .catch(error => setState({ error }));

    event.preventDefault();
  };

  const { error } = state;

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In with Facebook</button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInTwitterBase = props => {
  const [state, setState] = useState({ error: null });

  const onSubmit = event => {
    props.firebase
      .signInWithTwitter()
      .then(socialAuthUser => props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email || 'test@test.com',
          roles: {},
        }))
      .then(() => {
        setState(state => ({ ...state, error: null }));
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        setState(state => ({ ...state, error }));
      });

    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Sign In With Twitter</button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  );
};

const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase);

SignInFormBase.propTypes = {
  firebase: PropTypes.shape({
    signInWithEmailAndPassword: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

SignInFormBase.defaultProps = {
  history: {},
};

SignInGoogleBase.propTypes = {
  firebase: PropTypes.shape({
    signInWithGoogle: PropTypes.func,
    user: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

SignInGoogleBase.defaultProps = {
  history: {},
};

SignInFacebookBase.propTypes = {
  firebase: PropTypes.shape({
    signInWithFacebook: PropTypes.func,
    user: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

SignInFacebookBase.defaultProps = {
  history: {},
};

SignInTwitterBase.propTypes = {
  firebase: PropTypes.shape({
    signInWithTwitter: PropTypes.func,
    user: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

SignInTwitterBase.defaultProps = {
  history: {},
};

export default SignInPage;

export {
  SignInForm,
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
};
