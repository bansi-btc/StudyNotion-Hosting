const {instance}=require('../config/razorpay');
const User=require('../models/user');
const Course=require('../models/course');
const mailSender=require('../utils/mailSender');
const crypto=require('crypto');

require('dotenv').config();


//initiate the razorpay order
exports.capturePayment=async(req, res)=>{
    try{
        // const {courses}=req.body;
        const courses=JSON.parse(req.body.courses);
        // console.log(req.body);
        
        const userId=req.user.id;

        if(courses.length===0){
            return res.status(400).json({
                success:false,
                message:"please provide course Id",
            })
        }

        let totalAmount=0;

        // console.log(courses);
        // for(let course_id of courses){
        //     console.log(course_id);
        // }
        for(let course_id of courses){
            let course;
            try{
                course=await Course.findOne({_id:course_id});
                // console.log(course)
                if(!course){
                    return res.status(400).json({
                        success:false,
                        message:"Could not find the course",
                    })
                }
            }
            catch(err){
                return res.status(400).json({success:false, message:err.message});
            }
            totalAmount+=course.price 
        }
        // console.log(totalAmount);

        const options={
            amount:totalAmount*100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString(),
            
        }
        // console.log("Bansi");

        try{
            const paymentResponse=await instance.orders.create(options);
            // console.log(paymentResponse);
            // onsole.log(paymentResponse);
            return res.status(200).json({
                success:true,
                data:paymentResponse,
            })
        }
        catch(err){
            return res.status(400).json({
                success:false,
                message:err.message,
            })
        }


    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}


//verify the payment
exports.verifySignature=async(req, res)=>{
    try{
        // console.log(req.body);
        // return res.status(200).json({});
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const courses = JSON.parse(req.body?.courses);
        // console.log(courses);
        const userId = req.user.id;

        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
            return res.status(400).json({
                success:false,
                message:""
            })
        }

        let body=razorpay_order_id+'|'+razorpay_payment_id;

        const exprectedSignature=crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(exprectedSignature==razorpay_signature){
            //enroll krwao bcche ko
            // console.log("first");
            const response=await enrollStudent(courses, userId);
            // console.log(response);
            if(!response){
                return res.status(400).json({success:false}, {message:"Error aaya hai ji"});
            }

            return res.status(200).json({
                success:true,
                message:"Payment verified",
                response
            })
        }

        return res.status(400).json({
            success:false,
            message:"Payment failed",
        })
    }
    catch(err){ 
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

const enrollStudent=async(courses, userId)=>{
    if(!courses || !userId){
       
        return null;
    }
    // console.log(courses)
    // console.log(userId);
    // return res.status(200).json({});
    let updatedStudent;
    for(let course_id of courses){
        try{

            updatedStudent=await User.findOneAndUpdate({_id:userId}, 
                {$push:{courses:course_id}}, {new:true}
                ).populate("additionalDetails").populate("courses").exec();
                
                const updatedCourse=await Course.findOneAndUpdate({_id:course_id}, 
                    {$push:{studentsEnrolled:userId}}, {new:true},    
                    ); 
                    // const emailResponse=await mailSender(updatedStudent.email, 
                    //     `successfully enrolled into ${updatedCourse.courseName}`, 
                    //     )
                    }
                    catch(err){
                        console.log(err.message);
                        return null;
                    }

    }

    return updatedStudent;

    //send mail to student
}

//capture the payment and initiate the order
// exports.capturePayment=async(req, res)=>{
//     try{
//         //fetch
//         const {courseId}=req.body;
//         const userId=req.user.id;

//         //validation
//         if(!courseId || !userId){
//             return res.status(400).json({
//                 success:false,
//                 message:"All fields are required",
//             })
//         }

//         //valid course id;
//         const courseDetails=await Course.findOne({_id:courseId});
//         if(!courseDetails){
//             return res.status(400).json({
//                 success:false,
//                 message:"Invalid course ID",
//             })
//         }
//         //user already bought or not
//         const userDetails=await User.findOne({_id:userId});

//         const enrolledStu=courseDetails.studentsEnrolled;

//         if(enrolledStu.includes(userId)){
//             return res.status(400).json({
//                 success:false,
//                 message:"User already enrolled",
//             })
//         }

//         //capture the payment

//         const amount=courseDetails.price * 100;
//         const currencey="INR";

//         const options={
//             amount, currencey,
//             notes:{
//                 courseId, 
//                 userId,
//             }
//         }

//         try{
//             const paymentResponse=await instance.orders.create(options);
//             console.log(paymentResponse);

//             return res.status(200).json({
//                 success:false,
//                 courseName:courseDetails.courseName,
//                 courseDescription:courseDetails.courseDescription,
//                 thumbnail:courseDetails.thumbnail,
//                 orderId:paymentResponse.id,
//                 currencey:paymentResponse.currencey,
//                 amount:paymentResponse.amount,

//             })
//         }
//         catch(err){
//             return res.status(400).json({
//                 success:false,
//                 message:err.message,
//             })
//         }

//         //send the response
//     }
//     catch(err){
//         res.status(400).json({
//             message:err.message,
//             success:false,
//         })
//     }
// }

// exports.verifySignature=async(req, res)=>{
//     try{
//         const webhookSecret="12345678";

//         const signature=req.headers("x-razorpay-signature");

//         const shasum=crypto.createHmac("sha256", webhookSecret);
//         shasum.update(JSON.stringify(req.body));
//         const digest=shasum.digest("hex");

//         if(signature===digest){
//             console.log("payment is authorised");

//             const {courseId, userId}=req.body.payload.payment.entity.notes;

//             try{
//                 const updatedCourse=await Course.findByIdAndUpdate({_id:courseId},
//                     {$push :{studentsEnrolled:userId}}, {new:true});

//                 const updatedUser=await User.findByIdAndUpdate({_id:userId},
//                     {$push:{courses:courseId}}, {new:true});

//                 const emailResponse=await mailSender(updatedCourse.email, "Course Bought successfully", 
//                 `You have successfully bought ${updatedCourse.courseName} by ${updatedCourse.instructor}`);

//                 return res.status(200).json({
//                     success:true,
//                     message:"Course bought successfully",
//                 })
//             }
//             catch(err){
//                 return res.status(400).json({
//                     success:false,
//                     message:err.message,
//                 })
//             }

//             //update in db 
//             //return res

//         }
//     }
//     catch(err){
//         return res.status(400).json({
//             message:err.message,
//             success:false, 
//         })
//     }
// }