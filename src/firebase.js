import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDnXoLyT_qew2JdE2h8wPe3-_4L6HliU2E",
  authDomain: "fir-react-54b56.firebaseapp.com",
  databaseURL: "https://fir-react-54b56.firebaseio.com",
  projectId: "fir-react-54b56",
  storageBucket: "fir-react-54b56.appspot.com",
  messagingSenderId: "240384346009",
  appId: "1:240384346009:web:1aafb24499d8580436f508"
};
// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();

window.firebase = firebase;

export default firebase;

export const provider = new firebase.auth.GoogleAuthProvider;
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.collection('users').doc(uid).get();
    return {uid, ...userDocument.data()}
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};