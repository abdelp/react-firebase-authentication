import React, { useState } from 'react';

const DefaultLoginToggle = props => {
  const [state, setState] = useState({
    password: '',
    passwordConfirmation: '',
  });

  const onSubmit = event => {
    event.preventDefault();

    props.onLink(state.password);
    setState(state => ({
      ...state,
      password: '',
      passwordConfirmation: '',
    }));
  };

  const onChange = event => {
    event.persist();
    setState(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const {
    onlyOneLeft,
    isEnabled,
    signInMethod,
    onUnlink,
  } = props;

  const { password, passwordConfirmation } = state;

  const isInvalid = password !== passwordConfirmation || passwordConfirmation === '';

  return (
    <>
      { isEnabled ? (
        <button
          type="button"
          onClick={() => onUnlink(signInMethod.id)}
          disabled={onlyOneLeft}
        >
          Deactivate
          {' '}
          {signInMethod.id}
        </button>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            name="password"
            value={password}
            onChange={onChange}
            type="password"
            placeholder="New Password"
          />
          <input
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={onChange}
            type="password"
            placeholder="Confirm New Password"
          />

          <button
            disabled={isInvalid}
            type="submit"
          >
            Link
            {' '}
            {signInMethod.id}
          </button>
        </form>
      )}
    </>
  );
};

export default DefaultLoginToggle;
