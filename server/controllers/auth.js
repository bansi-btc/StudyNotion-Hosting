const User=require('../models/user');
const Otp=require('../models/otp');
const otpGenerator=require('otp-generator');
const bcrypt=require('bcrypt');
const Profile=require('../models/profile');
const jwt=require('jsonwebtoken');

exports.sendOTP=async(req, res)=>{
    try{
        const {email}=req.headers;
        console.log(email);
        const existingUser=await User.findOne({email:email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist",
            })
        }

        //generate otp
        let otp=otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        let result=await Otp.findOne({otp:otp});

        while(result){
            otp=otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
    
            result=await Otp.findOne({otp:otp});
        }

        // otp is unique

        const otpPayload={
            email,
            otp, 
        }

        //create entry in DB

        const otpBody=await Otp.create(otpPayload);

        console.log(otpBody);

        res.status(200).json({
            success:true,
            message:"OTP sent successfully",
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
        console.log(err.message);
    }
}

//singup

exports.signup=async(req, res)=>{
    try{
        const {otp ,firstName, lastName, email, password, confirmPassword, 
        accountType}=req.body;
        console.log({otp ,firstName, lastName, email, password, confirmPassword, 
            accountType});

        if(!otp || !firstName || !lastName || !email || !password || !confirmPassword 
            || !accountType){
                res.status(400).json({
                    success:false,
                    message:"All fields are required",
                })
            }
        
        const existingUser=await User.findOne({email:email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email already exist",
            })
        }

        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"incorrect password",
            })
        }

        const recentOtp=await Otp.find({email:email}).sort({createdAt:-1}).limit(1);

        if(!recentOtp){
            return res.status(400).json({
                success:false,
                message:"No otp found, resend otp",
            })
        }
        // console.log(otp);
        // console.log(recentOtp[0].otp);

        if(otp!==recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Incorrect otp",
            })
        }

        let hashedPass;
        try{
            hashedPass=await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(400).json({
                message:err.message,
                success:false,
            })
        }

        const newProfile=await Profile.create({
            gender:null, dateOfBirth:null,
            contactNumber:null, about:null,
        });

       const newUser=await User.create({
        firstName, lastName, email, password:hashedPass,
        accountType, additionalDetails:newProfile._id ,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
       })

       return res.status(200).json({
        success:true,
        message:"User created successfull",
        newUser,
       })




    }

    catch(err){
        res.status(400).json({
            message:err.message,
        })
    }
}

exports.login = async(req, res)=>{
    try{
        const {email, password}=req.headers;
        console.log(email, password);
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        let existingUser=await User.findOne({email:email});

        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }

        const result=await bcrypt.compare(password, existingUser.password);

        if(!result){
            return res.status(400).json({
                success:false,
                message:"Incorrect password",
            })
        }

        //create jwt token and send response

        const payload={
            id:existingUser._id,
            email:existingUser.email,
            accountType:existingUser.accountType,
        }

        const token=jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:"2h",
        });

        existingUser.token=token;
        existingUser.password=undefined;

        res.cookie("token", token, {httpOnly:true}).status(200).json({
            success:true,
            message:"Logged in successfully", 
            token,
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

exports.changePassword=async(req, res)=>{
    try{
        const {email, password, newPassword}=req.body;
        // console.log("HI");
        // console.log({email, password, newPassword});

        if(!email | !password || !newPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }

        // if(newPassword!== newConfirmPassword){
        //     return res.status(400).json({
        //         message:"password and confirm password not matched",
        //     })
        // }

        const existingUser=await User.findOne({email:email});

        if(!existingUser){
            return res.status(400).json({
                message:"email not registered",
            })
        }

        const result=await bcrypt.compare(password, existingUser.password);
        // console.log(result);

        if(!result){
            return res.status(400).json({
                message:"Incorrect password",
            })
        }

        const hashedPass=await bcrypt.hash(newPassword, 10);

        const updatedUser=await User.findOneAndUpdate({email:email}, {password:hashedPass},
            {new:true}).populate("additionalDetails");
        console.log(updatedUser);



        res.status(200).json({
            success:"Password updated successfully",
            updatedUser,
        })
    }

    catch(err){

    }
}