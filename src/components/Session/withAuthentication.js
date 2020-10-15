import React, { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const [state, setState] = useState({ authUser: null });
    const [listener, setListener] = useState();

    useEffect(() => {
      const authListener = props.firebase.auth.onAuthStateChanged(
        authUser => setState(state => ({ ...state, authUser })),
      );
      return () => authListener();
    }, []);

    return (
      <AuthUserContext.Provider value={state.authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
