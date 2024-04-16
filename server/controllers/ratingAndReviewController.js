const RatingAndReview=require('../models/ratingAndReview');
const Course=require('../models/course');
const User=require('../models/user');

exports.createRatingAndReview=async(req, res)=>{
    try{
        const {courseId, rating, review}=req.body;

        const userId=req.user.id;

        if(!courseId || !rating || !review || !userId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        //user enrolled or not

        const courseDetails=await Course.findOne({_id:courseId});

        const studentsEnrolled=courseDetails.studentsEnrolled;
        if(studentsEnrolled.includes(userId)){
            return res.status(400).json({
                success:false,
                message:"User is enrolled in the course",
            })
        }

        const alreadyReviewed=await RatingAndReview.findOne({user:userId, course:courseId});
        

        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"User already reviewed the course"
            })
        }

        

        // const userDetails=await User.findOne({_id:userId});
        const newRating=await RatingAndReview.create({user:userId, rating, review, course:courseId});

        const updatedCourse=await Course.findByIdAndUpdate({_id:courseId},
            {$push:{ratingAndReviews:newRating._id}}, {new:true});

        
        res.status(200).json({
            success:true,
            newRating, updatedCourse,
        })

        
    }
    catch(err){
         res.status(400).json({
            success:false,
            message:err.message,
         })
    }
}

exports.getAverageRating=async(req, res)=>{
    try{
        const {courseId}=req.body;

        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const courseDetails=await Course.findOne({_id:courseId}).populate("ratingAndReviews");

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Invalid courseid",
            })
        }

        let totalSum=0, cnt=0;

        for(let val of courseDetails.ratingAndReviews){
            totalSum+=val.rating;
            cnt++;
        }

        const averageRating=totalSum/cnt;

        res.status(200).json({
            success:true,
            averageRating,
        })


    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.getAllRating=async(req, res)=>{
    try{
       

        const allRating=await RatingAndReview.find({}).populate(
            {
                path:"user",
                select:"firstName lastName email image"
            }
        ).exec();

        res.status(200).json({
            success:true,
            allRating,
        })

    }

    catch(err){
        return res.status(200).json({
            success:false,
            message:err.message,
        })
    }
}
exports.getAllRatingCourse=async(req, res)=>{
    try{
       
        const {courseId}=req.body;

        const allRating=await RatingAndReview.find({course:courseId});

        res.status(200).json({
            success:true,
            allRating,
        })

    }

    catch(err){
        return res.status(200).json({
            success:false,
            message:err.message,
        })
    }
}
