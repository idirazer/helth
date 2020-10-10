const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id :{
        required : true ,
        type : String ,
    } ,
    totalquantity :{
        required : true ,
        type : Number ,
    } ,
    totalprice : {
        required : true ,
        type : Number ,
    } , 
    selectedProduct : {
        required : true ,
        type : Array ,
    },
     createAt :{
        type : Date ,
        index : {expires : '10m'}
    }

})


module.exports = mongoose.model('cart', cartSchema); 