const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { validateEmail } = require("../utils/validators")
const { UserRegisterType } = require("../utils/constants")
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    uid:{
        type: String,
        trim: true,
        ref: 'Development',
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email`
        },
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
    },
    number: {
        type: Number,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
        validate: {
            validator: function (role) {
                return UserRegisterType.has(role)
            },
            message: props => `${props.value} is not a valid role`
        },
        required: true
    },
}, { timestamps: true })

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(+process.env.SALT_WORK_FACTOR, function (err, salt) {
        //console.log('thik ace to vai')
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})

module.exports = {
    UserModel: mongoose.model('User', UserSchema),
}