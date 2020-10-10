const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    imgePath :{
        type : String ,
        required : true
    
    },
    productName : {
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
    },
    price :{
        type : Number,
        required : true ,
    
    },
});
module.exports = mongoose.model('product', productSchema);                   