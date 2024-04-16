import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import axios from "axios";
import logo from '../../assets/Logo/Logo-Full-Dark.png'
import { setUser } from "../../slices/profileSlice";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESSFULL_EMAIL_API}=studentEndpoints



function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            // Code to execute after script has loaded
            console.log('Script loaded!');
            resolve(true);
        };

        script.onerror = () => {
            // Error handling
            console.error('Failed to load script:', src);
            resolve(false);
        };

        document.body.appendChild(script);
    });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    
    const formData=new FormData();
    formData.append("token", token);
    formData.append("courses", JSON.stringify(courses));

    
    const toastId=toast.loading("Loading...");
    try{
        //load the script
        const res= await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay sdk failed to load");
            return;
        }

        //initialze the order
        const orderResponse=await axios.post(COURSE_PAYMENT_API, formData);
        // console.log(orderResponse.data.data);

        //all working fine
        // return;
        const options={
            key:"rzp_test_RqrQW0ixGx5h3Q",
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id, 
            name:"StudyNotion",
            description:"Thank you for purchasing the course",
            image:logo,
            // prefill:{
            //     name: `${userDetails.firstName}`,
            //     email:`${userDetails.email}`
            // },
            handler: function (response){
                //send successfull wala mail

                //verify payment
                // console.log("first")
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject=new window.Razorpay(options);
        paymentObject.open();
    }
    catch(err){
        console.log(err.message);
        toast.error("Payment failed");
    }
    toast.dismiss(toastId);
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    // console.log(bodyData);
    const toastId=toast.loading("Verifying payment");
    // dispatch(setPaymentLoading(true));
    const formData=new FormData();
    formData.append('courses', JSON.stringify(bodyData.courses  ));
    formData.append('razorpay_order_id', bodyData.razorpay_order_id);
    formData.append('razorpay_payment_id', bodyData.razorpay_payment_id);
    formData.append('razorpay_signature', bodyData.razorpay_signature);
    formData.append("token", token);

    try{
        const res=await axios.post(COURSE_VERIFY_API, formData);
        // console.log("Bansi");
        // console.log(res.data.response); 
        // new user aayega isme


        
        // return;
        dispatch(setUser(res.data.response));
        localStorage.setItem("user", JSON.stringify(res.data.response));
        if(!res.data.success){
            toast.error("Pament error");
            return;
            }
        
        // return {
        //     success:true,
        //     message:"Payment successfull, course bought successfully",
        //     updatedUser:res.data.response,
        // }
        toast.success("Payment successfull, Course bought successfully");
        navigate('/dashboard/enrolled-courses')

    }   
    catch(err){
        console.log(err.message);
        toast.error("Payment verify error");   
    }
    toast.dismiss(toastId);

}