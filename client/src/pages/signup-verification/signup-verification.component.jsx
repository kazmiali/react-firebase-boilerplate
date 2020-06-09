import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/header/header.component';
import Modal from './code-modal.component';

import {
    requestPhoneVerificationStart,
    getResultPhoneVerificationStart,
} from '../../redux/user/user.actions';

const SignUpVerification = ({
    requestPhoneVerificationStart,
    getResultPhoneVerificationStart,
}) => {
    const [phoneNum, setPhoneNum] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        requestPhoneVerificationStart({
            phoneNum: '',
        });

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
            <Modal
                open={open}
                handleClose={handleClose}
                getResultPhoneVerificationStart={
                    getResultPhoneVerificationStart
                }
            />
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    getResultPhoneVerificationStart: (payload) =>
        dispatch(getResultPhoneVerificationStart(payload)),
    requestPhoneVerificationStart: (payload) =>
        dispatch(requestPhoneVerificationStart(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpVerification);
