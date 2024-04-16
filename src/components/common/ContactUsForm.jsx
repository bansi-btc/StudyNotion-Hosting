import React, { useEffect, useState } from 'react'
import { Form, useForm } from 'react-hook-form';
import { message } from '../../services/apis';
import toast from 'react-hot-toast';

const ContactUsForm = () => {

    const [loading, setloading] = useState(false);

    const submitContactForm=async(data)=>{
        console.log(data);
        const response=await fetch(message.SEND_MESSAGE_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // specify the content type
              // add any other headers as needed
            },
            body: JSON.stringify({
                firstName:data.firstname,
                lastName:data.lastname,
                email:data.email,
                phoneNo:data.phoneno,
                messageContent:data.message,
            }),
        })

        const output=await response.json();

        if(!output.success){
            toast.error(output.message);
            console.log(output.message);
            return;
        }

        toast.success(output.message);

    }
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessful}
    }=useForm()

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneno:""
            })
        }
    },[isSubmitSuccessful, reset] )
  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col items-center justify-center gap-6 w-full
    '>

        <div className='w-full flex flex-col md:flex-row items-center justify-center gap-5'>
        <div className='w-full flex flex-col items-start justify-center gap-1 text-pure-greys-5'>
            <label htmlFor="firstname">First Name</label>
            <input type="text" placeholder='Enter First name' id='firstname' name='firstname' 
            {...register("firstname", {required:true})} className='bg-richblack-700 px-4 py-2 rounded-sm w-full
            focus:outline-none'/>
            {
                errors.firstname && <span>Please fill firstname</span>
            }
        </div><div className='w-full flex flex-col items-start justify-center gap-1 text-pure-greys-5'>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" placeholder='Enter Last name' id='lastname' name='lastname' 
            {...register("lastname", {required:true})} className='bg-richblack-700 px-4 py-2 rounded-sm w-full
            focus:outline-none'/>
        </div>
        </div>
        <div className='w-full flex flex-col items-start justify-center gap-1 text-pure-greys-5'>
            <label htmlFor="email">Email address</label>
            <input type="text" placeholder='Enter email address' id='email' name='email' 
            {...register("email", {required:true})} className='bg-richblack-700 px-4 py-2 rounded-sm w-full
            focus:outline-none'/>
        </div>
        <div className='w-full flex flex-col items-start justify-center gap-1 text-pure-greys-5'>
            <label htmlFor="phoneno">Phone no.</label>
            <input type="text" placeholder='Enter Phone number' id='phoneno' name='phoneno' 
            {...register("phoneno", {required:true})} className='bg-richblack-700 px-4 py-2 rounded-sm w-full
            focus:outline-none'/>
        </div>
        <div className='w-full flex flex-col items-start justify-center gap-1 text-pure-greys-5'>
            <label htmlFor="message">Message</label>
            <textarea type="text" placeholder='Enter a message' id='message' name='message' 
            {...register("message", {required:true})} className='bg-richblack-700 px-4 py-2 rounded-sm w-full
            focus:outline-none h-[100px] resize-none' maxLength={100} />
            
        </div>

        <button type='submit' className='w-full rounded-sm px-4 py-2 text-center bg-[#FFD60A]'>Send message</button>

    </form>
  )
}

export default ContactUsForm