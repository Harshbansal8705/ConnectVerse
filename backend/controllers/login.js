const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({ success: false, code: -1, errors: { email: { kind: "required", message: "Email is required" }, message: "ValidationError" } });
        } else if (!req.body.password) {
            return res.status(400).json({ success: false, code: -1, errors: { password: { kind: "required", message: "Password is required" }, message: "ValidationError" } });
        }
        const user = await User.findOne({ email: req.body.email }).select("+password").exec();
        if (!user) {
            return res.status(400).json({ success: false, code: 1, errors: { message: "User not found" } });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json({ success: false, code: 1, errors: { message: "Invalid password" } });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        res.cookie("token", token, { httpOnly: true, sameSite: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({ success: true, user });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, code: 2, errors: { message: "An error occurred", error: e } });
    }
}