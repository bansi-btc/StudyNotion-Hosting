const User=require('../models/user');
const Profile=require('../models/profile');

exports.updateProfile=async(req, res)=>{
    try{
        // console.log("HI")
        const {gender, dateOfBirth="", about="", contactNumber, firstName, lastName}=req.body;
        const userId=req.user.id;

        if(!gender || !contactNumber || !userId){
            return res.status(400).json({
                success:false,
                message:"ALl fileds are required",
            })

        }

        const existingUser=await User.findOne({_id:userId});

        const profileId=existingUser.additionalDetails;

        const updatedProfile=await Profile.findByIdAndUpdate({_id:profileId},
            {gender, dateOfBirth, about, contactNumber}, {new:true});
        const updatedUser=await User.findOneAndUpdate({_id:userId}, {firstName, lastName}, {new:true}).populate("additionalDetails");

       

        res.status(200).json({
            success:true,
            message:"Profile edited successfully",
            updatedProfile,
            updatedUser
        })
    }
    catch(err){
        res.status(400).json({
            message:err.message,
            success:false,
        })
    }
}

exports.deleteAccount=async(req, res)=>{
    try{
        const userId=req.user.id;

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        const existingUser=await User.findOne({_id:userId});
        const profileId=existingUser._id;

        const deletedProfile=await Profile.findByIdAndDelete({_id:profileId});

        const deletedUser=await User.findByIdAndDelete({_id:userId});

        res.status(200).json({
            success:true,
            message:"User deleted successfully",
            deletedUser, 
        })

    }
    catch(err){
        res.status(400).json({
            message:err.message,
            success:false,
        })
    }
}

exports.getAllUserDetails=async(req, res)=>{
    try{
        const userId=req.user.id;

        const existingUser=await User.findOne({_id:userId})
        .populate("additionalDetails").populate("courses").exec();

        res.status(200).json({
            success:true,
            existingUser, 
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}