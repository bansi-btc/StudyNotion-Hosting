const Message= require('../models/message');

exports.sendMessage=async(req, res)=>{
    try{
        const {firstName, lastName, email, phoneNo, messageContent}=req.body;

        const result=await Message.create({firstName, lastName, email, phoneNo, messageContent});

        return res.status(200).json({
            success:true,
            message:"message sent successfully",
            result 
        })
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}