const mongoose=require('mongoose');

let sectionSchema=new mongoose.Schema({

    sectionName:{
        type:String,
    },
    subSection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection",
    }],

})

module.exports=mongoose.model("Section", sectionSchema);