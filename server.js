const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');
const admin = require('firebase-admin');

require('dotenv').config({ path: './.env' });
const {
    NODE_ENV,
    STRIPE_SECRET_KEY,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    VERIFICATION_SID,
    PORT,
} = process.env;

// Twilio Integration

const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Firebase Service Account Info
const ServiceAccount = require('./serviceAccountInfo.json');

if (NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const app = express();
const port = PORT || 5000;

// app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccount),
});

// const firestore = admin.firestore();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, (error) => {
    if (error) throw error;
    console.log('Server running on port ' + port);
});

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

app.post('/payment', (req, res) => {
    // console.log('payment route called ', req);
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd',
    };

    stripe.charges.create(body, async (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes, userRes: currentUser });
        }
    });
});

app.post('/phone-verify-request', async (req, res) => {
    const channel = 'sms';
    const { phoneNumber } = req.body;
    let verificationRequest;

    try {
        verificationRequest = await twilio.verify
            .services(VERIFICATION_SID)
            .verifications.create({ to: phoneNumber, channel });
        res.status(200).json({ verificationRequest });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'ERROR', desc: e });
    }
});

app.post('/phone-verify-result', async (req, res) => {
    const { code, phoneNumber } = req.body;
    let verificationResult;

    try {
        verificationResult = await twilio.verify
            .services(VERIFICATION_SID)
            .verificationChecks.create({ code, to: phoneNumber });
        res.status(200).json({ verificationResult });
    } catch (e) {
        logger.error(e);
        return res.status(500).send(e);
    }

    console.log(verificationResult);

    if (verificationResult.status === 'approved') {
        return res.status(200).json({ success: true });
    } else {
        return res.status(500).send('already verified');
    }
});
