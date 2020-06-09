import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import generateUid from '../utils/generateUid';
import firebaseConfig from './firebase.config.js';

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    console.log('this is the user object', userAuth);
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, emailVerified, photoURL } = userAuth;
        let name = displayName ? displayName : additionalData.displayName;
        const createdAt = new Date();

        const id = generateUid();
        try {
            await userRef.set({
                userId: userAuth.uid,
                displayName: name,
                email,
                emailVerified,
                createdAt,
                photoURL: photoURL ? photoURL : null,
                phoneNumber: null,
                phoneNumberVerified: false,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const getCurrentUserData = async (userAuth) => {
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const userSnapShot = await userRef.get();

    const userData = userSnapShot.data();

    return userData;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({
    display: 'popup',
});
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

export default firebase;
