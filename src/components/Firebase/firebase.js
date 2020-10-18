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

  const emailAuthProvider = app.auth.EmailAuthProvider;
  const auth = app.auth();
  const db = app.firestore();

  const googleProvider = new app.auth.GoogleAuthProvider();
  const facebookProvider = new app.auth.FacebookAuthProvider();
  const twitterProvider = new app.auth.TwitterAuthProvider();

  const createUserWithEmailAndPassword = (email, password) => auth
    .createUserWithEmailAndPassword(email, password);

  const sendEmailVerification = () => auth
    .currentUser.sendEmailVerification({
      url: 'http://localhost:3000',
    });

  const signInWithEmailAndPassword = (email, password) => auth
    .signInWithEmailAndPassword(email, password);

  const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

  const signInWithTwitter = () => auth.signInWithPopup(twitterProvider);

  const signOut = () => auth.signOut();

  const resetPassword = email => auth.sendPasswordResetEmail(email);

  const updatePassword = password => auth.currentUser.updatePassword(password);

  const user = uid => db.collection('/users').doc(uid);

  const users = () => db.collection('/users');

  const onAuthUserListener = (next, fallback) => auth
    .onAuthStateChanged(async authUser => {
      if (authUser) {
        const doc = await user(authUser.uid).get();
        let dbUser = {};

        if (doc.exists) {
          dbUser = doc.data();
        }

        dbUser.roles = dbUser.roles || {};
        next({ ...authUser, ...dbUser });
      } else {
        fallback();
      }
    });

  return {
    auth,
    db,
    emailAuthProvider,
    googleProvider,
    facebookProvider,
    twitterProvider,
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
    sendEmailVerification,
    onAuthUserListener,
  };
};

export default Firebase;
