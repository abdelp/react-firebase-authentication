import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

function Firebase() {
  app.initializeApp(config);
  let auth = app.auth();
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

  const signInWithGoogle = () =>
    auth.signInWithPopup(googleProvider);

  const signInWithFacebook = () =>
    auth.signInWithPopup(facebookProvider);

  return {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    resetPassword,
    updatePassword,
    signInWithGoogle
  }
}

export default Firebase;