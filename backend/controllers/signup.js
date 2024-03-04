const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        return res.status(201).json({
            success: true
        })
    } catch (err) {
        console.log(err)
        if (err.name == "ValidationError") {
            const e = {};
            Object.keys(err.errors).forEach(key => {
                e[key] = {
                    kind: err.errors[key].kind,
                    message: err.errors[key].message
                }
            })
            return res.status(400).json({ success: false, code: -1, errors: e });
        } else if (err.code == 11000) {
            return res.status(400).json({ success: false, code: -1, errors: { email: { kind: "unique", message: "Email already exists" }, message: "ValidationError" } });
        }
        return res.status(500).json({ success: false, code: -3, errors: { message: "An error occurred", error: e } });
    }
}

exports.signupVerify = async (req, res) => {
    try {
        const { id } = jwt.verify(req.query.token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ success: false, code: -2, errors: { message: "User not found" } });
        }
        user.emailVerified = true;
        await user.save();
        res.cookie("token", req.token, { httpOnly: true, sameSite: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        return res.status(200).json({ success: true, user, token: req.token, message: "Email verified" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, code: -3, errors: { message: "An error occurred", error: e } });
    }
}
