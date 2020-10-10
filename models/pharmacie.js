const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const schema = mongoose.Schema;
const passport = require('passport');

const pharmacieSchema = mongoose.Schema({
    /* product : {
         type : schema.Types.ObjectId , 
         ref : 'product',
         required:  true ,
     },*/
    imgePath: {
        type: String,
        default: "/images/ea393f271d_50148115_preparateur-en-pharmacie1.jpg"
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    numberf: {
        type: Number,
        required: true
    },
    wilaya: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    pharmaciename: {
        type: String,
        required: true
    },

})
pharmacieSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}
pharmacieSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('pharmacie', pharmacieSchema);