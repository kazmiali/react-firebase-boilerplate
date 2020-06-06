import React from 'react';
import { Link } from 'react-router-dom';
import { MdPeople } from 'react-icons/md';

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

                <img
                    src={require('../../../assets/images/start-people.png')}
                    alt='illustration of people'
                    className='people-image'
                />
            </div>
        </section>
    );
};

export default Start;
