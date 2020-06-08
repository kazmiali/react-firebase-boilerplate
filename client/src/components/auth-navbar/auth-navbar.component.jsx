import React from 'react';
import { Link } from 'react-router-dom';

import { FaReact, FaNodeJs, FaCss3Alt } from 'react-icons/fa';

const AuthNavbar = ({ path }) => {
    return (
        <div className='auth-navbar-container'>
            <div className='auth-navbar'>
                <Link className='auth-navbar-logo-container' to='/'>
                    {/* <img
                        alt='e time tracking website logo'
                        className='auth-navbar-logo'
                        src={require('../../assets/mainlogo.png')}
                    /> */}
                    <FaReact />
                    <FaNodeJs />
                    <FaCss3Alt />
                </Link>
                {path === '/login' ? (
                    <div className='auth-navbar-statement'>
                        Don't have an account? &nbsp;
                        <Link
                            className='auth-navbar-statement-link'
                            to='/signup'
                        >
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <div className='auth-navbar-statement'>
                        Already have an account? &nbsp;
                        <Link
                            className='auth-navbar-statement-link'
                            to='/login'
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthNavbar;
