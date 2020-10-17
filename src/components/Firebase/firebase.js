import app from 'firebase/app';
import 'firebase/auth';

import 'firebase/firestore';

const prodConfig = {
  apiKey: 'AIzaSyCjyX0zYlrsNTaKrn1UhJEi7ec9DJzKc1g',
  authDomain: 'javascript-capstone.firebaseapp.com',
  databaseURL: 'https://javascript-capstone.firebaseio.com',
  projectId: 'javascript-capstone',
  storageBucket: 'javascript-capstone.appspot.com',
  messagingSenderId: '18817737455',
  appId: '1:18817737455:web:d609927741e48198ee311a',
};

const devConfig = {
  apiKey: 'AIzaSyCjyX0zYlrsNTaKrn1UhJEi7ec9DJzKc1g',
  authDomain: 'javascript-capstone.firebaseapp.com',
  databaseURL: 'https://javascript-capstone.firebaseio.com',
  projectId: 'javascript-capstone',
  storageBucket: 'javascript-capstone.appspot.com',
  messagingSenderId: '18817737455',
  appId: '1:18817737455:web:d609927741e48198ee311a',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

const Firebase = () => {
  app.initializeApp(config);

  const auth = app.auth();
  const db = app.firestore();

  const googleProvider = new app.auth.GoogleAuthProvider();
  const facebookProvider = new app.auth.FacebookAuthProvider();
  const twitterProvider = new app.auth.TwitterAuthProvider();

  const createUserWithEmailAndPassword = (email, password) => auth
    .createUserWithEmailAndPassword(email, password);

  const signInWithEmailAndPassword = (email, password) => auth
    .signInWithEmailAndPassword(email, password);

  const signOut = () => auth.signOut();

  const resetPassword = email => auth.sendPasswordResetEmail(email);

  const updatePassword = password => auth.currentUser.updatePassword(password);

  const user = uid => db.collection('/user').doc(uid);

  const users = () => db.collection('/users');

  const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

  const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);

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
    signInWithFacebook,
    signInWithTwitter,
  };
};

export default Firebase;
