const Course=require('../models/course');
const Section=require('../models/section');

exports.createSection= async(req, res)=>{
    try{
        //fetch
        // console.log("AAgya hai create section pe");
        // return res.status(200).json({});
        const {sectionName, courseId}=req.body;
        //validation
         
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        //create section
        const newSection= await Section.create({sectionName});

        //update course
        const updatedCourse=await Course.findByIdAndUpdate({_id:courseId},
            {$push:{courseContent:newSection._id}}, {new:true});

        //send res

        return res.status(200).json({
            success:true,
            message:"Section added successfully",
            newSection,
            updatedCourse,
        })
    }

    catch(err){
        res.status(400).json({
            message:err.message,
        })
    }
}

exports.updateSection=async(req, res)=>{
    try{
        //fetch
        // const {sectionName, sectionId}=req.body;
        console.log(sectionId)
        //validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                message:"All fields are required",
                success:false,
            })
        }
        //update
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
            {sectionName:sectionName}, {new:true});

        //return res 
        res.status(200).json({
            success:true,
            message:"Section updatted successfully",
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.deleteSection=async(req, res)=>{
    try{
        const {sectionId, courseId}=req.body;

        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        console.log(sectionId)

        const deletedSection=await Section.findOneAndDelete({_id:sectionId});
        // console.log(deletedSection)

        const updatedCourse=await Course.findOneAndUpdate({_id:courseId},
            {$pull:{courseContent:deletedSection._id}}, {new:true});
          

        res.status(200).json({
            success:true,
            deletedSection,
            updatedCourse,
            message:"Deleted section successfully", 
        })
    }

    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}