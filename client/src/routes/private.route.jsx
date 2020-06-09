import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
    component: Component,
    isAuthenticated,
    currentUser,
    isSignUpVerPage,
    ...rest
}) => {
    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    } else {
        if (isSignUpVerPage !== true) {
            if (currentUser.phoneNumberVerified === false) {
                return <Redirect to='/signup-verification' />;
            }
        }
    }

    return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PrivateRoute);
