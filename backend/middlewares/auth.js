const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, code: 1, errors: { message: "Unauthorized" }});
        }
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).json({ success: false, code: 2, errors: { message: "An error occurred", error: e }});
    }
}