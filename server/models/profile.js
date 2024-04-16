const mongoose=require('mongoose');

let profileSchema=new mongoose.Schema({
    gender:{
        type:String,
        enum:["male", "female", "other"],
    },
    dateOfBirth:{
        type:String,
         
    },
    about:{
        type:String,
    },
    contactNumber:{
        type:Number,
    }
})

module.exports=mongoose.model("Profile", profileSchema);