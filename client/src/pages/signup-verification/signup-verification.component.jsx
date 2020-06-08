import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import AuthNavbar from '../../components/auth-navbar/auth-navbar.component';
import Header from '../../components/header/header.component';

import {
    googleSignInStart,
    emailSignInStart,
    facebookSignInStart,
} from '../../redux/user/user.actions';

const SignUpVerification = ({ match: { path } }) => {
    const [phoneNum, setPhoneNum] = useState('');

    const clearState = () => {
        setPhoneNum('');
    };

    const handleSubmit = async (event) => {};

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
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    facebookSignInStart: () => dispatch(facebookSignInStart()),
    emailSignInStart: (email, password) =>
        dispatch(emailSignInStart({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpVerification);
