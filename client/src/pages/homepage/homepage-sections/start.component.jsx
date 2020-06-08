import React from 'react';

import { ReactComponent as HTML } from '../../../assets/icons/icon-html.svg';
import { ReactComponent as CSS } from '../../../assets/icons/icon-css.svg';
import { ReactComponent as JS } from '../../../assets/icons/icon-js.svg';
import { ReactComponent as ReactLogo } from '../../../assets/icons/icon-react.svg';
import { ReactComponent as Redux } from '../../../assets/icons/icon-redux.svg';
import { ReactComponent as ReduxSaga } from '../../../assets/icons/icon-redux-saga.svg';
import { ReactComponent as NodeJS } from '../../../assets/icons/icon-nodejs.svg';
import { ReactComponent as Express } from '../../../assets/icons/icon-express.svg';
import { ReactComponent as Firebase } from '../../../assets/icons/icon-firebase.svg';
import { ReactComponent as Twilio } from '../../../assets/icons/twilio-icon.svg';
import { ReactComponent as Stripe } from '../../../assets/icons/icon-stripe.svg';
import { ReactComponent as Heroku } from '../../../assets/icons/icon-heroku.svg';
import { ReactComponent as Eslint } from '../../../assets/icons/icon-eslint.svg';

const Start = () => {
    return (
        <section className='start-section'>
            <div className='d-flex-column container'>
                <h1 className='home-h1'>The only effective boiler plate</h1>
                <p className='home-lead bold'>
                    Its a firebase with react boiler plate with google and
                    facebook login and email verifictaion also there is phone
                    number verification with twilio so its simply a complete
                    package.
                </p>

                <div className='technologies'>
                    <HTML />
                    <CSS />
                    <JS />
                    <ReactLogo />
                    <Redux />
                    <ReduxSaga />
                    <NodeJS />
                    <Express />
                    <Firebase />
                    <Twilio />
                    <Stripe />
                    <Heroku />
                    <Eslint />
                </div>
            </div>
        </section>
    );
};

export default Start;
