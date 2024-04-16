const SubSection=require('../models/subSection');
const Section=require('../models/section');
const {uploadImageToCloudinary}=require('../utils/imageUploader');
const cloudinary=require('cloudinary').v2;

exports.createSubSection=async(req, res)=>{
    try{
        const {title, description, timeDuration, sectionId}=req.body;
        // const video=req.files.file;
        const video=req.file.path;
        console.log(video);
        // console.log(title);
        // return res.status(200).json();

        if(!title || !description || !timeDuration || !video || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        // console.log("HImanshu");
        // const output=await cloudinary.uploader.upload(video, (err, result)=>{
        //     if(err){
        //         return res.status(400).json({
        //             success:false,
        //             messsage:err.message,
        //         })
        //     }
        //     // secure_url=result;


        //     // res.status(200).json({
        //     //     success:true,
        //     //     data:result,
        //     // })
        // })
        let output;
        try{
            output=await cloudinary.uploader.upload(video, { resource_type: "video" })
        }
        catch(err){
            console.log(err.message);
        }
        // console.log(output.secure_url);
        // const videoUrl=output.secure_url;

        // const videoDetails=await uploadImageToCloudinary(video, "codehelp", 90);
        console.log(output.secure_url);

        const newSubSection=await SubSection.create({
            title, description, timeDuration,
            videoUrl:output.secure_url,
        })

        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId},
            {$push:{subSection:newSubSection._id}}, {new:true});


        return res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            newSubSection,
            updatedSection,
        })

        
    }
    catch(err){
        res.status(400).json({
            message:err.message,
            success:false,
        })
    }
}

exports.deleteSubSection=async(req, res)=>{
    try{
        const {subSectionId, sectionId}=req.body;

        if(!subSectionId || !sectionId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        const deletedSubSection=await SubSection.findByIdAndDelete({_id:subSectionId});

        const updatedSection=await Section.findByIdAndUpdate({_id:sectionId}, 
            {$pull:{subSection:deletedSubSection._id}}, {new:true});

        res.status(200).json({
            success:true,
            message:"Deleted successfully",
            deletedSubSection,
            updatedSection,
        })
    }

    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}