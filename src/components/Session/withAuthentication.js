import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const [state, setState] = useState({
      authUser: JSON.parse(localStorage.getItem('authUser')),
    });

    useEffect(() => {
      const authListener = props.firebase.onAuthUserListener(
        authUser => setState(state => ({ ...state, authUser })),
        () => {
          localStorage.removeItem('authUser');
          setState({ authUser: null });
        },
      );
      return () => authListener();
    }, []);

    return (
      <AuthUserContext.Provider value={state.authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  WithAuthentication.propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.shape({
        onAuthStateChanged: PropTypes.func,
      }),
      onAuthUserListener: PropTypes.func,
    }).isRequired,
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
