import app from 'firebase/app';
import 'firebase/auth';

import 'firebase/firestore';

const prodConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const devConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const Firebase = () => {
  app.initializeApp(config);

  const auth = app.auth();
  const db = app.firestore();

  let googleProvider = new app.auth.GoogleAuthProvider();
  let facebookProvider = new app.auth.FacebookAuthProvider();

  const createUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  const signInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const signOut = () =>
    auth.signOut();

  const resetPassword = email =>
    auth.sendPasswordResetEmail(email);

  const updatePassword = password =>
    auth.currentUser.updatePassword(password);

  const user = uid => db.collection('/user').doc(uid);

  const users = () => db.collection('/users');

  const signInWithGoogle = () =>
    auth.signInWithPopup(googleProvider);

  const signInWithFacebook = () =>
    auth.signInWithPopup(facebookProvider);

  return {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    resetPassword,
    updatePassword,
    user,
    users,
    signInWithGoogle,
    signInWithFacebook
  }
}

export default Firebase;