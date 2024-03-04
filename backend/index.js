const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const router = require('./router');
require("dotenv").config();

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE).then(() => console.log('Connected to MongoDB!'))
    .catch(err => {
        console.log(err);
    });

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))