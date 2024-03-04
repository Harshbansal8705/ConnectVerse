const express = require("express");
const { signupVerify, signup } = require("./controllers/signup");
const { login } = require("./controllers/login");
const { resetMail, resetPassword } = require("./controllers/resetPassword");

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).send("HelloWorld!");
})
router.get("/signup/verify", signupVerify);
router.post("/signup", signup);
router.post("/login", login);
router.post("/reset/mail", resetMail);
router.post("/reset/password", resetPassword)

module.exports = router;