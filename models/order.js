const mongoose = require('mongoose');
const schema = mongoose.Schema ;
const orderShema = mongoose.Schema({
    user : {
        type  :schema.Types.ObjectId ,
        ref  :'User' ,
        required  : true ,
    },
    cart : {
        type : Object , 
        required:  true ,
    } ,
    name: {
        type : String , 
        required  :true

    } ,
    FamilyName :{
        type:  String , 
        required : true
    } ,
    adress  :{
        type : String , 
        required : true
    } ,
    TelephoneNumber: {
        type:  String , 
        required : true
    } ,
    /*
    creditCardName : {
        type : String , 
        required : true
    } ,
    creditCardNumber : {
        type:  String , 
        required : true
    } ,
    expirationMonth  :{
        type : String , 
        required : true
    } ,
    expirationYear :  {
        type:  String , 
        required : true
    } ,
    CVC : {
        type : String , 
        required  :true
    } , */
    orderPrice :{
        type : String ,
        required:  true , 
    }
})
module.exports = mongoose.model('order',  orderShema ); 