import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: `${process.env.REACT_APP_API}`,
    authDomain: "fir-react-294db.firebaseapp.com",
    projectId: "fir-react-294db",
    storageBucket: "fir-react-294db.appspot.com",
    messagingSenderId: "885010198071",
    appId: `${process.env.REACT_APP_APIID}`,
    measurementId: "G-441WXJDFXJ"
  };

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
  
    const userRef=(firestore.doc(`users/${userAuth.uid}`));
    const snapShot = await userRef.get();
    console.log(snapShot);

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          });
        } catch (error) {
          console.log('error creating user', error.message);
        }
      }
    
      return userRef;
  
   
  };



export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;


