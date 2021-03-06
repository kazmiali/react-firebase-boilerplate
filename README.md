# React Boiler Plate - React App w/ Redux, Firebase & Stripe.

## Features

-   Facebook Login
-   Google Login
-   Email Verification
-   Phone Number Verification
-   Nodejs server connected with a proxy
-   firebase-admin on backend server
-   Used React Hooks.
-   Used Redux with redux-saga for asynchronous code.
-   Stripe payments with backend server for making request to stripe API.
-   Clean and scalable code.
-   Best practices involved.
-   Performance optimazations made where required.

## Installation & Initial Setup

Please install [Git](https://git-scm.com/downloads) & [NodeJS](https://nodejs.org/en/download/) in your machine. Once done, open your terminal/command prompt & make sure you are at the root of this project. Then run the commands below:

### Clone the repo

```bash
git clone https://github.com/kazmiali/skybeat-clothing.git skybeat-clothing  # clone the repository

cd skybeat-clothing  # navigate to project folder
```

### Install dependencies

```bash
npm/yarn install # install nodejs server dependencies

cd client # cd into the client folder
npm/yarn install # install react app dependencies

cd .. # go back to project's root
```

## Note for stripe payments

In order to do stripe payments, create a account on stripe and copy the api key from there and add it to a .env file like this

```bash
STRIPE_SECRET_KEY=yourkey
```
## To use firebase on the front end

- Create a firebase.config.js file in the src/firebase, add the firebase config in the following way
```jsx
const firebaseConfig = {
    apiKey: 'AIzaSyCEk-Ww--141no1i2nii1--3rt2658',
    authDomain: 'react-boiler-plate.firebaseapp.com',
    databaseURL: 'https://react-boiler-plate.firebaseio.com',
    projectId: 'react-boiler-plate',
    storageBucket: 'react-boiler-plate.appspot.com',
    messagingSenderId: '151251352361',
    appId: '1:531502027435:web:512512123',
};

export default firebaseConfig;

```


## To use firebase on the nodjes server 

- Download the serviceAccount credentials from firebase console and add it in the root of the project and rename it to serviceAccountInfo.json
```jsx
```

## Running Nodejs server and React app together

Make sure you're at the project's root

```bash
npm/yarn run dev

# starts both the client (React) and server (NestJS) apps in watch mode
# the react app runs at port 3000 while the nestjs server runs at 5000
```

## Running NodeJS server only

```bash
npm/yarn run start
```

## Running React app only

```bash
cd client
npm/yarn run start
```
