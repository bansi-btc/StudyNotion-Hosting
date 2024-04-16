import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../services/apis";

const UpdatePassword = () => {

    const location=useLocation();
    const navigate=useNavigate();

    const [formData, setformData] = useState({
      password:"",
      confirmpassword:"",
    })
    const handleReset=async()=>{
        // console.log(location.pathname.split('/').at(-1));
        toast.loading("loading")
        const token=location.pathname.split('/').at(-1);
        // console.log(token);
        const res=await fetch(auth.RESET_PASSWORD_API, {
          method: 'PUT',
            headers: {
              'Content-Type': 'application/json', // specify the content type
              // add any other headers as needed
            },
            body: JSON.stringify({
               "password":formData.password,
               "confirmPassword":formData.confirmpassword,
               "token":token,
            }),
        })

        const output=await res.json();

        toast.remove();
        console.log(output);
        if(!output.success){
          toast.error(output.message);
          return;
        }

        toast.success(output.message);
        navigate('/login');
        

        


    }

    const handleChange=(event)=>{
      console.log(formData);
      setformData((prev)=>{
        return {
          ...prev,
          [event.target.name]:event.target.value
        }
      })
    }
  return (
    <div className="w-full py-56 flex flex-col items-center justify-center  ">
      <div className="w-[400px]  flex flex-col items-start justify-start mx-auto text-pure-greys-5 gap-6">
        <div className="w-full flex flex-col items-start justify-center gap-2">
        <h1 className="text-3xl font-medium">Choose new password</h1>
        <p className="text-sm text-pure-greys-300">
        Almost done. Enter your new password and youre all set.
        </p>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-1">
            <label htmlFor="password">New password</label>
            <input type="text" placeholder="Password" className="w-full py-2 px-4
            rounded-md bg-richblack-700 focus:outline-none" id="password" name="password"
            value={formData.password} onChange={handleChange} />

        </div>
        <div className="w-full flex flex-col items-start justify-center gap-1">
            <label htmlFor="confirmpassword">Confirm new password</label>
            <input type="text" placeholder="Confirm Password" className="w-full py-2 px-4
            rounded-md bg-richblack-700 focus:outline-none" id="confirmpassword" name="confirmpassword"
            value={formData.confirmpassword} onChange={handleChange}/>

        </div>

        <div className="bg-[#FFD60A] py-2 px-4 w-full text-center text-richblue-900 rounded-md
        cursor-pointer" onClick={handleReset} >Reset Password</div>

        <Link to={'/login'}><div className="flex flex-row items-start justify-start gap1">
            <div>Back to login</div>
        </div></Link>
      </div>
    </div>
  )
}

export default UpdatePassword