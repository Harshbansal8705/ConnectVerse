const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendMailResetPassword } = require("./mailer")

exports.resetMail = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ success: false, code: -1, errors: { email: { kind: "required", message: "Email is required" }, message: "ValidationError" } });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, code: 1, errors: { message: "User not found" } });
        }
        const token = jwt.sign({ id: user.id, email: user.email, resetPassword: true }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        await sendMailResetPassword(user.email, token);
        return res.status(200).json({ success: true, message: "Email sent" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, code: 2, errors: { message: "An error occurred", error: e } });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        if (!req.body.password) {
            return res.status(400).json({ success: false, code: -1, errors: { password: { kind: "required", message: "Password is required" }, message: "ValidationError" } });
        }
        const token = req.query.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.resetPassword) {
            return res.status(400).json({ success: false, code: 1, errors: { message: "Invalid token" } });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ success: false, code: 2, errors: { message: "User not found" } });
        }
        user.password = req.body.password;
        await user.save();
        return res.status(200).json({ success: true, message: "Password reset" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, code: 3, errors: { message: "An error occurred", error: e } });
    }
}