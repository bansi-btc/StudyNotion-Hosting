const User=require('../models/user');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');

const mailSender=require('../utils/mailSender');

exports.resetPasswordToken=async(req, res)=>{
    try{
        const {email}=req.headers;
        console.log(email)
        // console.log(email);
        const existingUser=await User.findOne({email:email});
        // console.log(existingUser);
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User does not exist",
            })
        }
        
        const token=crypto.randomUUID();
        // console.log(token);

        const updatedUser=await User.findOneAndUpdate({email:email}, 
                                                      {token:token,
        resetPasswordExpires:Date.now() + 5 * 60 * 1000}, {new:true});
        
        // const updatedUser=await User.findOneAndUpdate({email:email}, 
        //                                               {token:token}, {new:true});

        console.log(updatedUser);

        const url=`http://localhost:5173/update-password/${token}` 

        const mailResponse=await mailSender(email, "Reset password link", `here is the link ${url}`);

        res.status(200).json({
            success:true,
            message:"Link has been sent for resetting password",
            url,
            mailResponse,
        })

    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message, 
        })
    }
}

exports.resetPassword=async(req, res)=>{
    try{
        const {password, confirmPassword, token}=req.body;

        console.log({password, confirmPassword, token})
        console.log(password);
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password not matched",
            })
        } 

        const userDetails=await User.findOne({token:token});
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"Token invalid", 
            })
        }

        if(Date.now()>userDetails.resetPasswordExpires){
            return res.status(400).json({
                success:false,
                message:"Link expired",
            })
        } 

        let hashedPass=await bcrypt.hash(password, 10);
        // console.log(hashedPass);

        const updatedUser=await User.findOneAndUpdate({_id:userDetails._id},
                                                       {password:hashedPass},
                                                       {new:true});

        console.log(updatedUser)

        res.status(200).json({
            success:true,
            message:"Password chenged successfully",
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}
