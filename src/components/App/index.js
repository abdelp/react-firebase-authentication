import React, { Component, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { defaultProps } from 'recompose';
import { withFirebase } from '../Firebase';
import { auth } from 'firebase';

const App = (props) => {
  const [state, setState] = useState({authUser: null});
  const [listener, setListener] = useState();

  useEffect(() => {
    const authListener = props.firebase.auth.onAuthStateChanged(
      authUser =>
        setState(state => ({...state, authUser}))
    );
    return () => authListener();
  }, []);

  return (
    <Router>
      <div>
        <Navigation authUser={state.authUser} />
        <hr />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
    </Router>
  );
}
 
export default withFirebase(App);