import React, { useEffect, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from './firebase/firebase.utils';

import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import NotFound from './components/not-found/not-found.component';

// import PrivateRoute from './routes/private.route';

import { checkUserSession } from './redux/user/user.actions';

import './App.scss';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const SignUp = lazy(() => import('./pages/signup/signup.component'));
const Login = lazy(() => import('./pages/login/login.component'));

const App = ({ checkUserSession, currentUser }) => {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
            checkUserSession({ userAuth });
            console.log('THIS IS REALTIME LISTENER', userAuth);
        });

        return function cleanup() {
            unsubscribe();
        };
    }, [checkUserSession]);

    return (
        <div>
            <Switch>
                <ErrorBoundary>
                    <Suspense fallback={<Spinner />}>
                        <Switch>
                            <Route
                                exact
                                path='/'
                                render={(props) => (
                                    <HomePage
                                        {...props}
                                        currentUser={currentUser}
                                    />
                                )}
                            />
                            <Route path='/signup' component={SignUp} />
                            <Route path='/login' component={Login} />

                            <Route path='*' component={NotFound} />
                        </Switch>
                    </Suspense>
                </ErrorBoundary>
            </Switch>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: (payload) => dispatch(checkUserSession(payload)),
});

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
