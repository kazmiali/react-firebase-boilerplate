import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOutStart } from '../../redux/user/user.actions';
import { FiLogOut } from 'react-icons/fi';

import { FaReact, FaNodeJs, FaCss3Alt } from 'react-icons/fa';

const Header = ({ signOutStart, isAuthenticated }) => (
    <div className='header-container'>
        <Link className='logo-container' to='/'>
            {/* <img
                alt='e time tracking website logo'
                src={require('../../assets/mainlogo.png')}
                style={{ maxHeight: '100%' }}
            /> */}
            <FaReact />
            <FaNodeJs />
            <FaCss3Alt />
        </Link>
        <div className='options-container'>
            {isAuthenticated ? (
                <Fragment>
                    <Link
                        className='option-link'
                        to='/login'
                        onClick={signOutStart}
                    >
                        <span className='d-none-sm'>Logout</span>
                        <FiLogOut className='d-sm' />
                    </Link>
                </Fragment>
            ) : (
                <Fragment>
                    <Link className='option-link' to='/login'>
                        Login
                    </Link>
                    <Link
                        onClick={signOutStart}
                        className='option-link option-link-blue'
                        to='/signup'
                    >
                        Sign Up
                    </Link>
                </Fragment>
            )}
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
