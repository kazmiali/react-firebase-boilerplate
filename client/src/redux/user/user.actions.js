import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const facebookSignInStart = () => ({
    type: UserActionTypes.FACEBOOK_SIGN_IN_START,
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error,
});

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword,
});

export const checkUserSession = (payload) => ({
    type: UserActionTypes.CHECK_USER_SESSION,
    payload: payload,
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error,
});

export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error,
});

export const updateInvitations = (payload) => ({
    type: UserActionTypes.UPDATE_INVITATIONS,
    payload,
});

export const updateDPStart = (payload) => ({
    type: UserActionTypes.UPDATE_DP_START,
    payload,
});

export const updateDPSuccess = (payload) => ({
    type: UserActionTypes.UPDATE_DP_SUCCESS,
    payload,
});

export const updateDPFailure = () => ({
    type: UserActionTypes.UPDATE_DP_FAILURE,
});

export const requestPhoneVerificationStart = (payload) => ({
    type: UserActionTypes.REQUEST_PHONE_VERIFICATION_START,
    payload,
});

export const requestPhoneVerificationSuccess = (payload) => ({
    type: UserActionTypes.REQUEST_PHONE_VERIFICATION_SUCCESS,
    payload,
});

export const requestPhoneVerificationFailure = () => ({
    type: UserActionTypes.REQUEST_PHONE_VERIFICATION_FAILURE,
});

export const getResultPhoneVerificationStart = (payload) => ({
    type: UserActionTypes.GET_RESULT_PHONE_VERIFICATION_START,
    payload,
});

export const getResultPhoneVerificationSuccess = (payload) => ({
    type: UserActionTypes.GET_RESULT_PHONE_VERIFICATION_SUCCESS,
    payload,
});

export const getResultPhoneVerificationFailure = () => ({
    type: UserActionTypes.GET_RESULT_PHONE_VERIFICATION__FAILURE,
});

export const changeOtpCodeModal = (payload) => ({
    type: UserActionTypes.CHANGE_OTP_CODE_MODAL,
    payload,
});
