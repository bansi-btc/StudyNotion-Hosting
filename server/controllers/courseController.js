const Course=require('../models/course');
const User=require('../models/user');
const Category=require('../models/category');
const {uploadImageToCloudinary}=require('../utils/imageUploader');
const cloudinary=require('cloudinary').v2;

exports.createCourse=async(req, res)=>{
    try{
        // console.log("IN COurseRoutes");
        // console.log(req.body);
        // console.log(req.files.file);
        // console.log("Bansi");
        // console.log(req.files.file);
        // return res.status(200).json({});
        // console.log(req.body);
        // return res.status(200).json({});

        
        

        const {courseName, courseDescription, 
        whatYouWillLearn, price, category, published}=req.body;

        const userId=req.user.id;
        // console.log(req.file);
        const thumbnailImage=req.file.path;
        // console.log(thumbnailImage);
        // let secure_url;

        const output=await cloudinary.uploader.upload(thumbnailImage, (err, result)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    messsage:err.message,
                })
            }
            // secure_url=result;


            // res.status(200).json({
            //     success:true,
            //     data:result,
            // })
        })
        // console.log(output.secure_url);
        const imageUrl=output.secure_url;
        // return res.status(200).json({});
        // secure_url=output.data.secure_url;
        // console.log(secure_url);


        // console.log(userId);

        if(!courseName || !courseDescription || !price || !thumbnailImage){
            res.status(500).json({
                status:false,
                message:"All fields are required",
            })
        }
        


        const existingUser=await User.findOne({_id:userId});
        // console.log(existingUser);


        // return res.status(200).json({});


        if(!existingUser){
            return res.status(400).json({
                status:false,
                message:"User not logged in",
            })
        }


        if(existingUser.accountType!=='instructor'){
            return res.status(400).json({
                status:false,
                message:"Only instructor can create course",
            })
        }

        const categoryDetails=await Category.findOne({_id:category});
        // console.log(categoryDetails);
        // console.log(categoryDetails);


        if(!categoryDetails){
            return res.status(400).json({
                status:false,
                message:"Invalid category",
            })
        }   
        // console.log("Aao");
            const newCourse=await Course.create({
                courseDescription,
                courseName,
                instructor:existingUser._id,
                whatYouWillLearn,
                price,
                category:categoryDetails._id,
                thumbnail:imageUrl,
                published
            })
    
            console.log(newCourse);
        
        


        const updatedUser=await User.findByIdAndUpdate({_id:existingUser._id}, 
            {$push:{courses: newCourse._id}}, {new:true}).populate("additionalDetails").populate("courses").exec();

        const updatedCategory=await Category.findOneAndUpdate({_id:category}, 
            {$push:{courses: newCourse._id}}, {new:true});

        res.status(200).json({
            status:true,
            message:"Course created successfull",
            newCourse,
            updatedUser,
            updatedCategory,
        })
    }

    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.showAllCourses=async(req, res)=>{
    try{
        const allCourses=await Course.find({}).populate("instructor").exec();


        return res.status(200).json({
            success:true,
            allCourses,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.messsage,
        })
    }
}

exports.publishCourse=async(req, res)=>{
    try{
        const {courseId}=req.body;
        
        const publishedCourse=await Course.findOneAndUpdate({_id:courseId}, {
            published:true,
        }, {new:true});

        return res.status(200).json({
            success:true,
            message:"Course published",
            publishedCourse,
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.getCourseDetails=async(req, res)=>{
    try{
        const {courseId}=req.body;

        const courseDetails=await Course.findOne({_id:courseId})
                                  .populate({
                                    path:"instructor",
                                    populate:{
                                        path:"additionalDetails"
                                    }
                                  })
                                  .populate("category").populate("ratingAndReviews")
                                  .populate({
                                    path:"courseContent",
                                    populate:{
                                        path:"subSection",
                                    }
                                  }).exec();

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"No course found with id",
            })
        }

        res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            courseDetails
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.deleteCourse=async(req, res)=>{
    try{

        const {courseId}=req.body;
        console.log(courseId);
        
        const deletedCourse=await Course.findOneAndDelete({_id:courseId});

        res.status(200).json({
            success:true,
            message:"Course Deleted successfully",
        })
    }

    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}