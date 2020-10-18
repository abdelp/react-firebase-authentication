import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withFirebase } from '../Firebase';

import AuthUserContext from './context';

const needsEmailVerification = authUser => authUser
  && !authUser.emailVerified
  && authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  const WithEmailVerification = props => {
    const [state, setState] = useState({ isSent: false });

    const onSendEmailVerification = () => {
      props.firebase
        .sendEmailVerification()
        .then(() => setState({ ...state, isSent: true }));
    };

    return (
      <AuthUserContext.Consumer>
        {authUser => (needsEmailVerification(authUser) ? (
          <div>
            <p>
              E-Mail confirmation sent: Check you E-Mails (Spam
              folder included) for a confirmation E-Mail.
              Refresh this page once you confirmed your E-Mail.
            </p>

            <button
              type="button"
              onClick={onSendEmailVerification}
            >
              Send confirmation E-mail
            </button>
          </div>
        ) : (
          <Component {...props} />
        ))}
      </AuthUserContext.Consumer>
    );
  };

  WithEmailVerification.propTypes = {
    firebase: PropTypes.shape({
      sendEmailVerification: PropTypes.func
    }).isRequired
  };

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
