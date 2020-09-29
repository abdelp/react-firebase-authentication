import React from 'react';
import { withAuthorization } from '../Session';

const HomePage = () => (
  <div>
    <h1>The Home Page is accessible by every signed in user.</h1>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);