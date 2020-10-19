import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';

import DefaultLoginToggle from '../DefaultLoginToggle';
import SocialLoginToggle from '../SocialLoginToggle';

const SIGN_IN_METHODS = [
  {
    id: 'password',
    provider: null,
  },
  {
    id: 'google.com',
    provider: 'googleProvider',
  },
  {
    id: 'facebook.com',
    provider: 'facebookProvider',
  },
  {
    id: 'twitter.com',
    provider: 'twitterProvider',
  },
];

const LoginManagement = props => {
  const [state, setState] = useState({
    activeSignInMethods: [],
    error: null,
  });

  const fetchSignInMethods = () => {

  };

  useEffect(() => {
    props.firebase.auth
      .fetchSignInMethodsForEmail(props.authUser.email)
      .then(activeSignInMethods => setState({ ...state, activeSignInMethods, error: null }));
  }, []);

  const onSocialLoginLink = provider => {
    props.firebase.auth.currentUser
      .linkWithPopup(props.firebase[provider])
      .then(fetchSignInMethods)
      .catch(error => setState({ error }));
  };

  const onUnlink = providerId => {
    props.firebase.auth.currentUser
      .unlink(providerId)
      .then(fetchSignInMethods)
      .catch(error => setState({ error }));
  };

  const onDefaultLoginLink = password => {
    const credential = props.firebase.emailAuthProvider.credential(
      props.authUser.email,
      password,
    );

    props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(fetchSignInMethods)
      .catch(error => setState({ error }));
  };

  return (
    <>
      Sign In Methods:
      <ul>
        {SIGN_IN_METHODS.map(signInMethod => {
          const onlyOneLeft = state.activeSignInMethods.length === 1;
          const isEnabled = state.activeSignInMethods.includes(
            signInMethod.id,
          );

          return (
            <li key={signInMethod.id}>
              {signInMethod.id === 'password' ? (
                <DefaultLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onDefaultLoginLink}
                  onUnlink={onUnlink}
                />
              ) : (
                <SocialLoginToggle
                  onlyOneLeft={onlyOneLeft}
                  isEnabled={isEnabled}
                  signInMethod={signInMethod}
                  onLink={onSocialLoginLink}
                  onUnlink={onUnlink}
                />
              )}
            </li>
          );
        })}
      </ul>
      {state.error && state.error.message}
    </>
  );
};

LoginManagement.propTypes = {
  firebase: PropTypes.shape({
    auth: PropTypes.shape({
      fetchSignInMethodsForEmail: PropTypes.func,
      currentUser: PropTypes.shape({
        linkWithPopup: PropTypes.func,
        unlink: PropTypes.func,
        linkAndRetrieveDataWithCredential: PropTypes.func,
      }),
    }),
    emailAuthProvider: PropTypes.shape({
      credential: PropTypes.func,
    }),
  }).isRequired,
  authUser: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
};

export default withFirebase(LoginManagement);
