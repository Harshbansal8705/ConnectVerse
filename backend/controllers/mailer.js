const { createTransport } = require('nodemailer');
require("dotenv").config()

const transporter = createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_KEY,
    },
});

exports.sendMailSignUp = async (to, token) => {
    const mailOptions = {
        from: `ConnectVerse <${process.env.MAIL_USER}>`,
        to: to,
        subject: "ConnectVerse Email Verification",
        text: `Click on this link to verify your email:\n\n${process.env.CLIENT_URL}/signup/verify?token=${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });
}

exports.sendMailResetPassword = async (to, token) => {
    const mailOptions = {
        from: `ConnectVerse <${process.env.MAIL_USER}>`,
        to: to,
        subject: "ConnectVerse Password Reset",
        text: `Click on this link to reset your password:\n\n${process.env.CLIENT_URL}/reset/password?token=${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });
}