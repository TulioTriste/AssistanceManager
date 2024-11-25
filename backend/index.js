const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { subject, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: port,
        secure: false,
        service: 'gmail',
        auth: {
            user: 'registrappduocsb@gmail.com',
            pass: 'mguo oaeo wvgz rpis'
        }
    });

    const mailOptions = {
        from: 'registrappduocsb@gmail.com',
        to: email,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log (`Server is running on port ${port}`);
});