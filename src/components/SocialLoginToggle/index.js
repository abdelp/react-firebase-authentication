import React from 'react';
import PropTypes from 'prop-types';

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  signInMethod,
  onLink,
  onUnlink,
}) => (isEnabled ? (
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
  <button
    type="button"
    onClick={() => onLink(signInMethod.provider)}
  >
    Link
    {signInMethod.id}
  </button>
));

SocialLoginToggle.propTypes = {
  onlyOneLeft: PropTypes.bool,
  isEnabled: PropTypes.bool,
  signInMethod: PropTypes.shape({
    id: PropTypes.string,
    provider: PropTypes.string,
  }).isRequired,
  onLink: PropTypes.func.isRequired,
  onUnlink: PropTypes.func.isRequired,
};

SocialLoginToggle.defaultProps = {
  onlyOneLeft: false,
  isEnabled: false,
};

export default SocialLoginToggle;
