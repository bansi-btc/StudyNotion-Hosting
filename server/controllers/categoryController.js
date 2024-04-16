const Category=require('../models/category');
const Course = require('../models/course');

exports.createCategory=async(req, res)=>{
    try{
        let {name, description}=req.body;

        if(!name || !description){
            return res.status(200).json({
                status:false,
                message:"All fields are required",
            })
        }

        const newCategory=await Category.create({name, description});

        res.status(200).json({
            success:true,
            message:"New category created",
            newCategory,
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.showAllCategory=async(req, res)=>{
    try{
        const categories=await Category.find({});

        res.status(200).json({
            success:true,
            categories,
        })
    }

    catch(err){
        return res.status(400).json({
            status:false,
            message:err.message,
        })
    }
}

exports.categoryPageDetails=async(req, res)=>{
    try{
        // console.log("BANSI");
        // console.log(req.body);
        const {categoryId}=req.body;

        if(!categoryId){
            return res.status(400).json({
                success:true,
                message:"All fields are required"
            })
        }

        // const categoryDetails=await Category.find({_id:categoryId}).populate({
        //     path:"courses",
        //     match:{published:true},
        //     populate:"ratingAndReviews",
        // }).exec();

        const categoryDetails=await Category.findOne({_id:categoryId}).populate("courses").exec();

        if(!categoryDetails){
            return res.status(400).json({
                success:false,
                message:"No courses found",
            })
        }
        // console.log(categoryDetails);
        const courses=categoryDetails.courses;

        const randomCourses=await Course.find({});

        const topSellingCourse=await Course.find({}).sort({'studentsEnrolled':-1}).limit(10);
         
        res.status(200).json({
            success:true,
            message:"Courses fetched sucessfully",
            data:{
                courses,
                randomCourses,
                topSellingCourse,
            }
        })
        
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.categoryDetails=async(req, res)=>{
    try{
        const {categoryId}=req.body;
        // console.log(categoryId);
        const catDetails=await Category.findOne({_id:categoryId});
        // console.log(catDetails)
        return res.status(200).json({
            success:true,
            message:"Hello ji",
            data:catDetails
        })
    }
    catch(err){
        // console.log(err.message);
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}