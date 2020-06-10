import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PhoneInput from 'react-phone-number-input';

import Header from '../../components/header/header.component';
import Modal from './code-modal.component';

import {
    requestPhoneVerificationStart,
    getResultPhoneVerificationStart,
    changeOtpCodeModal,
} from '../../redux/user/user.actions';

import './signup-verification.styles.scss';
import 'react-phone-number-input/style.css';

const SignUpVerification = ({
    requestPhoneVerificationStart,
    getResultPhoneVerificationStart,
    currentUser,
    changeOtpCodeModal,
    otpCodeModal,
}) => {
    const [value, setValue] = useState();

    if (currentUser.phoneNumberVerified === true) {
        return <Redirect to='/' />;
    }

    const handleClose = () => {
        changeOtpCodeModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!value || value.length < 8) {
            return;
        }

        requestPhoneVerificationStart({
            phoneNumber: value,
        });
    };

    return (
        <Fragment>
            <Header />
            <div className='auth-page'>
                <div className='auth-box'>
                    <div>
                        <div className='auth-heading'>
                            Phone number verification
                        </div>
                    </div>
                    <form className='auth-form' onSubmit={handleSubmit}>
                        <PhoneInput
                            placeholder='Enter phone number'
                            value={value}
                            onChange={setValue}
                            className='phone-ver-input mt-1'
                        />
                        <input
                            type='submit'
                            className='btn btn-auth mt-1'
                            value='SEND CODE'
                        />
                    </form>
                </div>
            </div>
            <Modal
                open={otpCodeModal}
                handleClose={handleClose}
                getResultPhoneVerificationStart={
                    getResultPhoneVerificationStart
                }
                phoneNumber={value}
                userId={currentUser.userId}
            />
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    currentUser: state.user.currentUser,
    otpCodeModal: state.user.otpCodeModal,
});

const mapDispatchToProps = (dispatch) => ({
    getResultPhoneVerificationStart: (payload) =>
        dispatch(getResultPhoneVerificationStart(payload)),
    requestPhoneVerificationStart: (payload) =>
        dispatch(requestPhoneVerificationStart(payload)),
    changeOtpCodeModal: (payload) => dispatch(changeOtpCodeModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpVerification);
