import React, { useState, useEffect } from 'react';

import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';

const AdminPage = props => {
  const [state, setState] = useState({loading: false, users: []});

  useEffect(() => {
    setState(state => ({...state, loading: true}));

    const unsubscribe = props.firebase.users().onSnapshot(users => {
      let usersList = [];

      users
        .forEach(doc => {
          usersList.push({
            uid: doc.id,
            ...doc.data()
          });
        });

      setState(state => ({users: usersList, loading: false}));
    });

    return () =>
      unsubscribe();
  }, []);

  return (
    <div>
      <h1>Admin</h1>

      {state.loading && <div>Loading ...</div>}

      <UserList users={state.users} />
    </div>
  );
};

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>Email:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
)
const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default withFirebase(AdminPage);