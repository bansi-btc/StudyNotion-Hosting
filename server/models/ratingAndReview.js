const mongoose=require('mongoose');

let ratingAndReviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    rating:{
        type:Number,
    },
    review:{
        type:String,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }

})

module.exports=mongoose.model("RatingAndReview", ratingAndReviewSchema);