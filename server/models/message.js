const mongoose=require('mongoose');

const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:String,
        required:true,
    },
    messageContent:{
        type:String,
        required:true,
    },
})

module.exports=mongoose.model("Message", messageSchema);