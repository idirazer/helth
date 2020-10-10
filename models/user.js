const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const passport = require('passport');

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
    },
    familyname: {
        type: String,
    },
    telphon: {
        type: Number,
    },
    adress: {
        type: String,
    },
    image: {
        type: String,
        default: "/upload/ava.jpg"
    }
})
userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('user', userSchema);