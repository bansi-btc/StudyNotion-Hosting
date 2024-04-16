import React, { useState } from 'react'
import loginImage from '../assets/Images/signup.webp'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CTAButton from '../components/core/HomePage/CTAButton';
import OTP from '../components/core/auth/OTP';
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { auth } from '../services/apis';

const SignUp = () => {
    const [role, setrole] = useState("student");
    const [show, setshow] = useState(false);

    const [formData, setformData] = useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        confirmpassword:"",
        phoneno:"",
    });

    const [otp, setotp] = useState(null);
    // const [password, setpassword] = useState("");

    const handleChange=(event)=>{
        console.log(formData);
        
        setformData((prev)=>{
            return {
                ...prev,
                [event.target.name]:event.target.value,
            }
        })
    }
    const navigate=useNavigate();

    const handleSignUp=async()=>{
        if(!formData.email || !formData.password || !formData.confirmpassword || !formData.phoneno ||
            !formData.firstname || !formData.lastname){
            toast.error("All fields are required");
            return;
        }

        if(formData.password!==formData.confirmpassword){
            toast.error("Incorrect password");
            return;
        }

        const res=await fetch(auth.SENDOTP_API, {
            method:"GET",
            headers:{
                "email":formData.email,
            }
        })
        const output=await res.json();

        console.log(output);
        setmodal(true);
        // navigate('/login');
        
    }
    const onComplete=(otpp)=>{
        // console.log(otp);
        setotp(otpp)
    }

    const handleSignUpComp=async()=>{
        console.log(formData);
        // const res=await fetch(auth.SIGNUP_API, {
        //     method:"GET",
        //     headers:{
        //         "otp":otp,
        //         "firstName":formData.firstname,
        //         "lastName":formData.lastname,
        //         "email":formData.email, 
        //         "password":formData.password, 
        //         "confirmPassword":formData.confirmpassword, 
        //         "accountType":role,
               
        //     }
        // })

        const res=await fetch(auth.SIGNUP_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // specify the content type
              // add any other headers as needed
            },
            body: JSON.stringify({
                "otp":otp,
                "firstName":formData.firstname,
                "lastName":formData.lastname,
                "email":formData.email, 
                "password":formData.password, 
                "confirmPassword":formData.confirmpassword, 
                "accountType":role,
                
            }), // convert data to JSON string
          })

        const output=await res.json();

        console.log(output);
        toast.success(output.message);
        navigate("/login");
    }


    const handleShow=()=>{
        setshow((prev)=>{
            return !prev;
        })

    }

    

    const [modal, setmodal] = useState(false);



   
  return (
    <div className=' w-full overflow-x-hidden overflow-y-auto pb-10 px-5 xl:px-0'>
        <div className='h-full w-full max-w-[1200px] mx-auto text-[#f8f6f6] flex flex-row 
        items-center justify-center lg:justify-between py-20 relative'>

            <div className={`modal py-10 px-5 top-[50%] left-[50%] border border-pure-greys-200 rounded-md
             absolute bg-transparent backdrop-brightness-50 translate-x-[-50%] translate-y-[-50%] flex flex-col items-start
             justify-start w-full md:w-[500px] gap-6 backdrop-blur-xl scale-0 transition-all duration-1000
             ${modal?"scale-100":"scale-0"}`} >

                <h1 className='text-3xl font-medium'>Verify Email</h1>
                <p className='w-[70%] text-lg'>A verification code has been sent to you. Enter the code below</p>
                {/* <div className='w-[100%] mx-auto flex flex-row items-center justify-between'>
                   
                    {optarr.map((ele, index)=>{
                        return  <input key={index} onChange={handleInput} type="text" maxLength={1} className='bg-richblack-600 py-2 px-2 h-[50px] w-[50px]
                        flex flex-col items-center justify-center text-center focus:outline-none rounded-md' />
                    })}
                </div> */}
                <OTP length={6} onComplete={onComplete}/>

               
                
                <button className='w-[100%] mx-auto px-4 py-2 text-center bg-[#FFD60A] text-richblue-900
                rounded-md' onClick={handleSignUpComp}>
                    Verify And Register 
                </button>

                <div className='flex flex-row items-center justify-between w-full text-lg'>
                    <Link to={"/login"}><button className="btn flex flex-row
                    items-center justify-center gap-2">
                        <FaArrowLeftLong />
                        <div>
                        Back to login
                        </div>
                        </button></Link>
                    <button className='flex flex-row items-center justify-center gap-2 text-[#1FA2FF]'>
                    <MdTimer className='text-2xl'/>
                    <div>
                    Resend OTP
                    </div>
                    </button>
                </div>
                

            </div>


            <div className="left flex flex-col items-start justify-start gap-8  w-full sm:w-[70%] lg:w-[40%] pt-10 sm:pt-0">
                <div className='flex flex-col items-start justify-center gap-3'>
                    <h1 className='text-3xl font-medium'>Join the millions learning to code with StudyNotion for free</h1>
                    <div className='flex flex-col items-start justify-center gap-0'>
                        <div className='text-xl'>Build skills for today, tomorrow and beyond</div>
                        <div className='text-sm italic'>Education to future-proof your career.</div>
                    </div>
                </div>

                
                <div className='flex flex-row items-center justify-center gap-2 bg-richblack-600
                text-[#f8f6f6] rounded-full'>
                    <div className={`py-2 px-5 ${role==="student"?"bg-richblack-700":""} 
                     rounded-full`} onClick={()=>setrole("student")}>Student</div>
                    <div className={`py-2 px-5 ${role!=="student"?"bg-richblack-700":""} 
                     rounded-full`} onClick={()=>setrole("instructor")}>Instructor</div>
                </div>

                <div className='w-full flex flex-row justify-start items-center gap-4'>
                <div className='flex flex-col items-start justify-center gap-1 w-full'>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" placeholder='First Name' id='firstname'
                    className='py-3 px-4 bg-richblue-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none' onChange={handleChange} name='firstname' value={formData.firstname} />
                </div><div className='flex flex-col items-start justify-center gap-1 w-full'>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" placeholder='Last Name' id='lastname'
                    className='py-3 px-4 bg-richblue-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none' onChange={handleChange} name='lastname' value={formData.lastname} />
                </div>
                </div>


                <div className='flex flex-col items-start justify-center gap-1 w-full'>
                    <label htmlFor="email">Email address</label>
                    <input type="text" placeholder='Enter email address' id='email'
                    className='py-3 px-4 bg-richblue-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none' onChange={handleChange} name='email' value={formData.email} />
                </div>


                <div className='flex flex-col items-start justify-center gap-1 w-full'>
                    <label htmlFor="phoneno">Phone No.</label>
                    <input type="text" placeholder='Phone Number' id='phoneno'
                    className='py-3 px-4 bg-richblue-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none' onChange={handleChange} name='phoneno' value={formData.phoneno} />
                </div>
                <div className='w-full flex flex-row justify-start items-center gap-4'>
                <div className='flex flex-col items-start justify-center gap-1 w-full'>
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder='Password' id='password'
                    className='py-3 px-4 bg-richblue-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none' onChange={handleChange} name='password' value={formData.password} />
                </div><div className='flex flex-col items-start justify-center gap-1 w-full'>
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="text" placeholder='Confirm password' id='confirmpassword'
                    className='py-3 px-4 bg-richblue-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none' onChange={handleChange} name='confirmpassword' value={formData.confirmPassword} />
                </div>
                </div>
                {/* <div className='flex flex-col items-start justify-center gap-1 w-full relative'>
                    <label htmlFor="password">Password</label>
                    <input type={!show?"password":"text"} placeholder='Enter password' id='password'
                    className='py-3 px-4 bg-richblue-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none' onChange={handleChange} name='password' value={formData.password} />
                    <div onClick={handleShow} className='absolute right-3 text-richblack-50'>{!show?<FaRegEyeSlash/>:<FaRegEye/>}</div>
                    <div className='text-sm self-end text-[#1FA2FF]'><Link to={'/forgotPassword'}>Forgot password</Link></div>
                </div> */}

                <div className='w-full bg-[#FFD60A] py-3 px-4 text-center text-richblue-900
                rounded-md cursor-pointer' onClick={handleSignUp}>Create Account</div>
            </div>

            <div className="right hidden lg:block h-[500px] w-[500px]">
                <img src={loginImage} alt="" className='rounded-sm h-full w-full object-cover'/>
            </div>
        </div>

    </div>
  )
}

export default SignUp