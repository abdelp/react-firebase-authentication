import React from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.signOut}>
    Sign Out
  </button>
);

SignOutButton.propTypes = {
  firebase: PropTypes.shape({
    signOut: PropTypes.func,
  }).isRequired,
};

export default withFirebase(SignOutButton);
