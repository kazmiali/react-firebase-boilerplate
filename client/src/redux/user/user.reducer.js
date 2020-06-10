import UserActionTypes from './user.types';
import Swal from 'sweetalert2';

const INITIAL_STATE = {
    isAuthenticated: null,
    currentUser: null,
    otpCodeModal: false,
    error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
                error: null,
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                isAuthenticated: null,
                error: null,
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text:
                    action.payload.message ===
                    'The password is invalid or the user does not have a password.'
                        ? 'The password is invalid or the user is signed in with Google.'
                        : action.payload.message,
            });
            return {
                ...state,
                error: action.payload,
            };
        case UserActionTypes.UPDATE_INVITATIONS:
            return {
                ...state,
                invitations: action.payload,
            };

        case UserActionTypes.UPDATE_DP_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    photoURL: action.payload,
                },
            };
        case UserActionTypes.CHANGE_OTP_CODE_MODAL:
            return {
                ...state,
                otpCodeModal: action.payload,
            };
        case UserActionTypes.GET_RESULT_PHONE_VERIFICATION_SUCCESS:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    phoneNumber: action.payload.phoneNumber,
                    phoneNumberVerified: true,
                },
            };
        default:
            return state;
    }
};

export default userReducer;
