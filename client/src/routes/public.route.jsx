import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({
    component: Component,
    isAuthenticated,
    currentUser,
    isAuthPage,
    ...rest
}) => {
    if (isAuthenticated) {
        if (currentUser && currentUser.phoneNumberVerified === false) {
            return <Redirect to='/signup-verification' />;
        }

        if (isAuthPage) {
            return <Redirect to='/' />;
        }
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PublicRoute);
