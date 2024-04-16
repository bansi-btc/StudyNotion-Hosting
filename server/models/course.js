const mongoose=require('mongoose');

let courseSchema=new mongoose.Schema({

    courseName:{
        type:String,
        required:true,
    },
    courseDescription:{
        type:String,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWillLearn:{
        type:String,
        required:true,
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }], 
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
    }],
    price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    tags:[{
        type:String,
    }],
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
    }], 
    published:{
        type:Boolean,
    }
})

module.exports=mongoose.model("Course", courseSchema);