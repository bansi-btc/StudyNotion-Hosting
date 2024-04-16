const jwt=require('jsonwebtoken');
require('dotenv').config();
const User=require('../models/user');

//auth

exports.auth=async(req, res, next)=>{
    try{
        //extract token
        // console.log(req.body.token)
        // const {token}=req.body;
        let token=req.body.token;
        // console.log(req.body);
        // return res.status(200).json({});
        // console.log(token);
        if(!token){
            token=req.headers.token;
        }

        if(!token){
            req.cookies.token;
        }
        

        // const token=req.body.token || req.cookies.token || req.headers.token;
        // console.log(token);
        // return;

        // const token=req.cookies.token || req.body.token ||  req.headers.token || 
        // req.header("Authorisation").replace("Bearer ", "");
        // console.log(token);
        // console.log(req.body);
        // return res.status(200).json({});

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token missing", 
            })
        }

        //verify the token
        // console.log(token);
        let decode;
        try{

            decode= jwt.verify(token, process.env.JWT_SECRET);
        }
        catch(err){
            console.log(err.message);
        }
        // console.log("Bansi");
        // console.log(decode)
        // console.log(decode);
        req.user=decode;

        next();
                                                           
    }
    catch(err){
        res.status({
            success:false,
            message:err.message,
        })
    }
}



//isStudent

exports.isStudent=async(req, res, next)=>{
    try{
        if(req.user.accountType!=='student'){
            return res.status(400).json({
                message:"This is a private route for student",
                success:false,
            })
        }
        next();
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.isInstructor=async(req, res, next)=>{
    try{
        if(req.user.accountType!=='instructor'){
            return res.status(400).json({
                message:"This is a private route for instructor",
                success:false,
            })
        }
        next();
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}
exports.isAdmin=async(req, res, next)=>{
    try{
        if(req.user.accountType!=='instructor'){
            return res.status(400).json({
                message:"This is a private route for admin",
                success:false,
            })
        }
        next();
    }
    catch(err){ 
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

//isInstructor

//isAdmin 