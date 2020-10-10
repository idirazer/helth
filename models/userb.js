const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const passport = require('passport');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true

    },

    adress: {
        type: String,
        required: true
    },
    TelephoneNumber: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,

    },
    /*
    utilisation : {
        type : String ,
        required : true,
     
    },
    
    Quantum : {
        type : String ,
        required : true,
     
    },
    
    information :{
        required : true ,
        type : {
                         utilisation : String ,
                         Quantum : Number ,
                         quantite : String ,
                         consigne : String ,
                         
        }
        
    },*/
    /*
    price :{
        type : Number,
        required : true ,
    
    },
    */

    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },

    /* image :{
         type : String ,
         default : "/upload/ava.jpg"
     }
     */
})
userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
module.exports = mongoose.model('Userb', userSchema);