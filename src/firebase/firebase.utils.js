import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyA1T4l4PvXpV12py-Wt6h8jEZ1QvT1dS2I",
    authDomain: "crwn-db-b5502.firebaseapp.com",
    projectId: "crwn-db-b5502",
    storageBucket: "crwn-db-b5502.appspot.com",
    messagingSenderId: "529493478269",
    appId: "1:529493478269:web:dd428ac09cd781da1cda14"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInUpWithGoogle = ()=> auth.signInWithPopup(provider);

export default firebase;