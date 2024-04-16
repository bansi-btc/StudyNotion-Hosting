const mongoose=require('mongoose');
const mailSender = require('../utils/mailSender');

let otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
    },

    createdAt:{
        type:Date,
        defaul:Date.now(), 
        expires: 5 * 60 ,
    }
})

async function sendVerificationmail(email, otp){
    try{
        const mailResponse=await mailSender(email, "Otp for verification", `otp is ${otp}`);
        console.log(mailResponse);
    }
    catch(err){
        console.log(err.message);
    }
}

otpSchema.pre("save", async function(next){
    await sendVerificationmail(this.email, this.otp);
    next();
})

module.exports=mongoose.model("OTP", otpSchema);