import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  const WithAuthorization = props => {
    useEffect(() => {
      const listener = props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) props.history.push(ROUTES.SIGN_IN);
        },
      );
      return () => listener();
    }, []);

    return (
      <AuthUserContext.Consumer>
        {authUser => (condition(authUser) ? <Component {...props} /> : null)}
      </AuthUserContext.Consumer>
    );
  };

  WithAuthorization.propTypes = {
    firebase: PropTypes.shape({
      auth: PropTypes.shape({
        onAuthStateChanged: PropTypes.func,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  WithAuthorization.defaultProps = {
    history: {},
  };

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
