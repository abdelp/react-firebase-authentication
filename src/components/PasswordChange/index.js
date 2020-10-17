import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  password: '',
  passwordConfirmation: '',
  error: null,
};

const PasswordChangeForm = props => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const onSubmit = event => {
    const { password } = state;

    props
      .firebase
      .updatePassword(password)
      .then(() => setState(() => ({ ...INITIAL_STATE })))
      .catch(error => setState(state => ({ ...state, error })));

    event.preventDefault();
  };

  const onChange = event => setState(state => ({
    ...state,
    [event.target.name]: event.target.value,
  }));

  const isInvalid = state.password !== state.passwordConfirmation
    || !state.password;

  return (
    <form onSubmit={onSubmit}>
      <input
        name="password"
        value={state.password}
        onChange={onChange}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordConfirmation"
        value={state.passwordConfirmation}
        onChange={onChange}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {state.error && <p>{state.error.message}</p>}
    </form>
  );
};

PasswordChangeForm.propTypes = {
  firebase: PropTypes.shape({
    updatePassword: PropTypes.func,
  }).isRequired,
};

export default withFirebase(PasswordChangeForm);
