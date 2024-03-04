const { Schema, models, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendMailSignUp } = require("../controllers/mailer");

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        max: 255,
        min: 3
    },
    email: {
        type: String, required: [true, 'email is required'],
        unique: true,
        validate: {
            validator: function (v) {
                // Regular expression for email validation
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        max: 1024,
        min: [6, 'password must be at least 6 characters long'],
        select: false
    },
    country: {
        type: String,
        max: 255,
        min: 3
    },
    emailVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    virtuals: {
        id: {
            get: function () {
                return this._id;
            }
        }
    },
    toJSON: {
        versionKey: false,
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            return ret;
        }
    },
    toObject: {
        versionKey: false,
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            return ret;
        }
    }
});

// userSchema.plugin(uniqueValidator);

userSchema.pre("save", function (next) {
    this.email = this.email.toLowerCase();
    if (this.isModified("password")) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

userSchema.post("save", async function () {
    try {
        if (this.emailVerified) {
            return;
        }
        const token = jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        await sendMailSignUp(this.email, token);
    } catch (e) {
        console.log("Error sending mail");
        console.log(e);
    }
})

exports.User = models.User || model('User', userSchema);