import React, { useEffect, useState } from 'react'
import loginImage from '../assets/Images/login.webp'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from '../services/operations/login';
import { auth } from '../services/apis';
import { setToken } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../slices/profileSlice';
import { profile } from '../services/apis';
import axios from 'axios'

const Login = () => {

    const [role, setrole] = useState("student");
    const [show, setshow] = useState(false);
    

    const [formData, setformData] = useState({
        email:"",
        password:"",
    });
    // const [password, setpassword] = useState("");

    const handleChange=(event)=>{
        // console.log(formData);
        setformData((prev)=>{
            return {
                ...prev,
                [event.target.name]:event.target.value,
            }
        })
    }
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {user}=useSelector((state)=>state.profile);
    console.log("Bansi")
    console.log(user)

    // useEffect(()=>{
    //     // navigate('/dashboard/my-profile')
    //     console.log("Himanshu")
    // }, [user]);

    const handleSignIn=async()=>{
        if(!formData.email || !formData.password){
            toast.error("All fields are required");
            return;
        }
        toast.loading("loading")

        const response=await fetch(auth.LOGIN_API, 
            {
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',

                    "email":formData.email,
                    "password":formData.password,
                  },
                  
            })

            const output=await response.json();
            // console.log(output);
            // return;
            toast.remove();
            if(!output.success){
                toast.error(output.message);
                return;
            }

            // console.log(output.existingUser.accountType);
            if(output.existingUser.accountType!==role){
                toast.remove();
                toast.error("User Does not exist");
                return;
            }

            

            localStorage.setItem("token",output.token);
            // console.log(typeof localStorage.getItem("token"));
            dispatch(setToken(output.token));


            const token=output.token;
            // console.log(token);

            // console.log(profile.GET_USER_DETAILS_API);
            const formData1=new FormData();
            formData1.append("token", token);
            // const result = await fetch(profile.GET_USER_DETAILS_API, {
            //     method: "GET",
            //     headers: {
            //       token: token,
            //     },
            //   });
            //   const output2 = await result.json();

              const output2=await axios.post(profile.GET_USER_DETAILS_API, formData1);
              // console.log(output);
            //   console.log(output2.data);
            // console.log("Bansi")
            console.log(output2.data.existingUser);
              if (!output2.data.success) {
                toast.error(output2.data.message);
                navigate('/login');
                return;
              }
        
              // setuserDetails(output.existingUser);
              localStorage.setItem("user", JSON.stringify(output2.data.existingUser));
              dispatch(setUser(output2.data.existingUser));
              
              console.log(JSON.parse(localStorage.getItem("user")));

            // console.log(output);
            toast.success(output.message);

              if(output.existingUser.accountType==='student'){

                  navigate('/dashboard/my-profile');
                }
              else{
                navigate('/dashboard/my-profile');
              }
            // navigate('/signup');
        
    }


    const handleShow=()=>{
        setshow((prev)=>{
            return !prev;
        })
    }

    useEffect(()=>{
        // localStorage.setItem("token", null);
        localStorage.clear();
        dispatch(setToken(null))
    }, [])
  return (
    <div className=' w-full overflow-x-hidden overflow-y-hidden px-5 xl:px-0'>
        <div className='h-full w-full max-w-[1200px] mx-auto text-[#f8f6f6] flex flex-row 
        items-center justify-center lg:justify-between py-28 '>


            <div className="left flex flex-col items-start justify-start gap-8 w-full sm:w-[70%] lg:w-[40%]">
                <div className='flex flex-col items-start justify-center gap-3'>
                    <h1 className='text-3xl font-medium'>WELCOME BACK</h1>
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

                <div className='flex flex-col items-start justify-center gap-1 w-full'>
                    <label htmlFor="email">Email address</label>
                    <input type="text" placeholder='Enter email address' id='email'
                    className='py-3 px-4 bg-richblack-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none' onChange={handleChange} name='email' value={formData.email} />
                </div>
                <div className='flex flex-col items-start justify-center gap-1 w-full relative'>
                    <label htmlFor="password">Password</label>
                    <input type={!show?"password":"text"} placeholder='Enter password' id='password'
                    className='py-3 px-4 bg-richblack-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none' onChange={handleChange} name='password' value={formData.password} />
                    <div onClick={handleShow} className='absolute right-3 text-richblack-50'>{!show?<FaRegEyeSlash/>:<FaRegEye/>}</div>
                    <div className='text-sm self-end text-[#1FA2FF]'><Link to={'/forgotPassword'}>Forgot password</Link></div>
                </div>

                <div className='w-full bg-[#FFD60A] py-3 px-4 text-center text-richblue-900
                rounded-md cursor-pointer' onClick={handleSignIn}>Sign in</div>
            </div>

            <div className="right hidden lg:block h-[500px] w-[500px]">
                <img src={loginImage} alt="" className='rounded-sm h-full w-full object-cover'/>
            </div>
        </div>

    </div>
  )
}

export default Login

