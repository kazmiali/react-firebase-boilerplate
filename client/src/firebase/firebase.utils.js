import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import generateUid from '../utils/generateUid';
import firebaseConfig from './firebase.config.js';

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email, photoURL } = userAuth;
        let name = displayName ? displayName : additionalData.displayName;
        const createdAt = new Date();

        const id = generateUid();
        try {
            await userRef.set({
                userId: userAuth.uid,
                displayName: name,
                email,
                createdAt,
                photoURL: photoURL ? photoURL : null,
                isOnTrial: true,
                ...additionalData,
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    });
};

export const checkUserRole = async (userData1) => {
    let userData = userData1;

    return {
        newUserData: userData,
    };
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
