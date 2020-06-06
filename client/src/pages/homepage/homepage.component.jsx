import React, { Fragment } from 'react';

import Header from '../../components/header/header.component';

import Start from './homepage-sections/start.component';

const HomePage = () => (
    <Fragment>
        <Header />
        <div className='homepage'>
            <Start />
        </div>
    </Fragment>
);

export default HomePage;
