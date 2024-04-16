import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { auth } from "../services/apis";

const ForgotPassword = () => {


    const [email, setemail] = useState("");
    const [linkSent, setlinkSent] = useState(false);
    // auth
    const handleChange=(event)=>{
        setemail(event.target.value);
    }

    const handleSendLink=async()=>{
        if(!email){
            toast.error("Add correct email")
        }

        toast.loading("loading...");
        try{

            // console.log(auth.RESETPASSWORD_TOKEN_API);
            
            const res=await fetch(auth.RESETPASSWORD_TOKEN_API, {
                method:"GET",
                headers: {
                    email
                },
            })
            
            const output=await res.json();
            
            toast.remove();

            if(!output.success){
                toast.error(output.message);
                return;
            }

            toast.success(output.message);
            setlinkSent(true);
            console.log(output);
        }
        catch(err){
            console.log(err.message);
        }
    }
  return (
    <div className="w-full">
    {!linkSent ?<div className="w-full py-56 flex flex-col items-center justify-center  ">
      <div className="w-[400px]  flex flex-col items-start justify-start mx-auto text-pure-greys-5 gap-6">
        <div className="w-full flex flex-col items-start justify-center gap-2">
        <h1 className="text-3xl font-medium">Reset your password</h1>
        <p className="text-sm text-pure-greys-300">
          Have no fear. We’ll email you instructions to reset your password. If
          you dont have access to your email we can try account recovery
        </p>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-1">
            <label htmlFor="email">Email address</label>
            <input type="text" placeholder="Enter email address" className="w-full py-2 px-4
            rounded-md bg-richblack-700 focus:outline-none" id="email" name="email" value={email}
            onChange={handleChange}/>

        </div>

        <div className="bg-[#FFD60A] py-2 px-4 w-full text-center text-richblue-900 rounded-md
        " onClick={handleSendLink}>Reset Password</div>

        <Link to={'/login'}><div className="flex flex-row items-start justify-start gap1">
            <div>Back to login</div>
        </div></Link>
      </div>
    </div>:
    <div className="w-full py-56 flex flex-col items-center justify-center  ">
    <div className="w-[400px]  flex flex-col items-start justify-start mx-auto text-pure-greys-5 gap-6">
      <div className="w-full flex flex-col items-start justify-center gap-2">
      <h1 className="text-3xl font-medium">Check Email</h1>
      <p className="text-sm text-pure-greys-300 ">
            We have sent the reset email to {email}@gmail.com
      </p>
      </div>

      

      <div className="bg-[#FFD60A] py-2 px-4 w-full text-center text-richblue-900 rounded-md
      " onClick={handleSendLink}>Resend Email</div>

      <Link to={'/login'}><div className="flex flex-row items-start justify-start gap1">
          <div>Back to login</div>
      </div></Link>
    </div>
  </div>}
    </div>
  );
};

export default ForgotPassword;
