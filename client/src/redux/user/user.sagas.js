import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import UserActionTypes from './user.types';

import {
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure,
    updateDPFailure,
    updateDPSuccess,
    signOutStart,
    requestPhoneVerificationFailure,
    requestPhoneVerificationSuccess,
    getResultPhoneVerificationFailure,
    changeOtpCodeModal,
    getResultPhoneVerificationSuccess,
} from './user.actions';

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUserData,
    firestore,
    facebookProvider,
} from '../../firebase/firebase.utils';
import uploadImageToStorage from '../../utils/uploadImageToStorage';
import { linearAlertBottom } from '../../utils/swalMixins';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(
            createUserProfileDocument,
            userAuth,
            additionalData,
        );
        const userSnapshot = yield userRef.get();
        const userData = userSnapshot.data();

        yield put(signInSuccess(userData));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithFacebook() {
    try {
        const { user } = yield auth.signInWithPopup(facebookProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated({ payload: { userAuth } }) {
    try {
        if (!userAuth) {
            yield put(signOutStart());
            return;
        }

        const userData = yield call(getCurrentUserData, userAuth);

        yield put(signInSuccess(userData));
    } catch (error) {
        console.log(error);
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password,
        );

        const curUser = auth.currentUser;

        const res = yield curUser.sendEmailVerification();

        console.log('email sent, res is', res);

        yield put(signUpSuccess({ user, additionalData: { displayName } }));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromUserAuth(user, additionalData);
}

export function* updateDP({ payload }) {
    try {
        const { image, userId } = payload;
        const imageURL = yield uploadImageToStorage(image, '/userImage');

        const userRef = firestore.collection('users').doc(userId);
        userRef.update({
            photoURL: imageURL,
        });

        yield put(updateDPSuccess(imageURL));

        yield linearAlertBottom.fire({
            icon: 'success',
            title: 'Display picture updated',
        });
    } catch (error) {
        console.log(error);
        yield put(updateDPFailure());
    }
}

export function* requestPhoneVerification({ payload: { phoneNumber } }) {
    try {
        const resp = yield axios.post('/phone-verify-request', {
            phoneNumber: phoneNumber,
        });
        console.log(resp);

        yield put(changeOtpCodeModal(true));
        yield put(requestPhoneVerificationSuccess());
    } catch (error) {
        console.log(error);
        yield put(requestPhoneVerificationFailure());
    }
}

export function* getResultPhoneVerification({
    payload: { phoneNumber, code, userId },
}) {
    try {
        const resp = yield axios.post('/phone-verify-result', {
            phoneNumber,
            code,
        });
        console.log(resp);

        const userRef = firestore.doc(`users/${userId}`);
        yield userRef.update({
            phoneNumber,
            phoneNumberVerified: true,
        });

        yield put(changeOtpCodeModal(false));

        yield put(getResultPhoneVerificationSuccess({ phoneNumber }));
    } catch (error) {
        console.log(error);
        yield put(getResultPhoneVerificationFailure());
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onFacebookSignInStart() {
    yield takeLatest(
        UserActionTypes.FACEBOOK_SIGN_IN_START,
        signInWithFacebook,
    );
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onUpdateDPStart() {
    yield takeLatest(UserActionTypes.UPDATE_DP_START, updateDP);
}

export function* onRequestPhoneVerificationStart() {
    yield takeLatest(
        UserActionTypes.REQUEST_PHONE_VERIFICATION_START,
        requestPhoneVerification,
    );
}

export function* onGetResultPhoneVerificationStart() {
    yield takeLatest(
        UserActionTypes.GET_RESULT_PHONE_VERIFICATION_START,
        getResultPhoneVerification,
    );
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onFacebookSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onUpdateDPStart),
        call(onRequestPhoneVerificationStart),
        call(onGetResultPhoneVerificationStart),
    ]);
}
