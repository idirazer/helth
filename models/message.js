const mongoose = require('mongoose');
const schema = mongoose.Schema ;
const messageShema = mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
       type:String,
       required:true
    },
    city:{
        type:String,
        required:true
    },
    adress:{
        type:String,
        required:true
    },
    /*datem:{
        type:Date.now,
        required:true
    },*/
    wilaya:{
        type:String,
        required:true
    },
    imagepath :{
        type:  String , 
        default:"/image/-طبية-9999x9999-c.jpg"
    } ,
    messmessage :{
        type : String ,
        required:  true , 
    }
})
module.exports = mongoose.model('message',  messageShema ); 