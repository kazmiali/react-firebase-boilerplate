import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header/header.component';
import Modal from './code-modal.component';

import {
    phoneVerificationRequestStart,
    phoneVerificationResultStart,
} from '../../redux/user/user.actions';

const SignUpVerification = ({
    phoneVerificationRequestStart,
    phoneVerificationResultStart,
}) => {
    const [phoneNum, setPhoneNum] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const clearState = () => {
        setPhoneNum('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleChange = (e) => {
        setPhoneNum(e.targetvalue);
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
                        <input
                            name='email'
                            type='email'
                            value={phoneNum}
                            className='auth-input mt-1'
                            placeholder='Enter Phone Number'
                            onChange={handleChange}
                        />

                        <input
                            type='submit'
                            className='btn btn-auth mt-1'
                            value='SEND CODE'
                        />
                    </form>
                </div>
            </div>
            <Modal open={open} handleClose={handleClose} />
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    phoneVerificationRequestStart: (payload) =>
        dispatch(phoneVerificationRequestStart(payload)),
    phoneVerificationResultStart: (payload) =>
        dispatch(phoneVerificationResultStart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpVerification);
