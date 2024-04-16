import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import { courses } from '../services/apis';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const CourseContent = () => {
    const {token}=useSelector((state)=>state.auth);
    // console.log(token);
    const {user}=useSelector((state)=>state.profile);
  const location =useLocation();

  const courseId=location.pathname.split('/').at(-1);
  const [courseDetails, setcourseDetails] = useState(null);

  const [modalcnt, setmodalcnt] = useState(-1);
  const [videoUrl, setvideoUrl] = useState('https://res.cloudinary.com/dxajun5s3/video/upload/v1711439494/ndzy3ibbyvoeyddzvber.mp4');
  const navigate=useNavigate();
  const [subSectionId, setsubSectionId] = useState('')

  const markCompleted=async()=>{
    // console.log("Bansi");
    console.log(subSectionId);
  }


  const fetchData=async()=>{
    try{
        const formData=new FormData();
        formData.append("courseId", courseId);
        formData.append("token", token);
        const res=await axios.post(courses.COURSE_DETAILS, formData);
        // console.log(res.data);
        // console.log(res.data);
        setcourseDetails(res.data.courseDetails);
        console.log(res.data.courseDetails.courseContent.at(0).subSection.at(0).videoUrl);
        setvideoUrl(res.data.courseDetails.courseContent.at(0).subSection.at(0).videoUrl);
        // setsubSectionId(res.data.courseDetails.courseContent.at(0));
        setsubSectionId(res.data.courseDetails.courseContent.at(0).subSection.at(0)._id);
    }   
    catch(err){
        console.log(err.message);
        toast.error(err.message);
    }
    

  }
  useEffect(()=>{
    // console.log(user.courses);
    const res=user.courses.find((cou)=>{
        return cou._id===courseId;
    })
    // console.log(res);
    if(!res){
        toast.error("You are trying to access paid course please buy first");
        navigate('/');

    }
    fetchData();
  }, [])

  const [show, setshow] = useState(true);



  return (
    <div className='flex flex-row items-start justify-start h-full w-full bg-richblack-200 text-richblack-5'>
        {/* <div className='text-white z-30 px-2 py-3 md:hidden'>Himanshu</div> */}
        <div className='z-30 px-2 py-3 md:hidden absolute' onClick={()=>{setshow(!show)}}>
                {show?
                <IoCloseSharp className="text-2xl"/>:
                <GiHamburgerMenu className="text-xl" />}
            </div>
        <div className={`leftsidebar w-[300px] bg-richblack-900 h-full md:flex flex-col py-10 md:py-4 gap-5 z-10 absolute md:static
        ${show?"translate-x-0":"translate-x-[-100%] md:translate-x-0"}`}>
              <h1 className='text-2xl text-richblack-5 font-semibold tracking-wide px-2'> Dot batch mern stack</h1> 

              <div className='w-full max-h-[85vh] flex flex-col items-start justify-start overflow-auto pt-4 md:pt-0'>

                {courseDetails && courseDetails.courseContent.map((ele, idx)=>{
                    // console.log(idx)
                    return <div key={idx} className='w-full flex flex-col items-start justify-start'>
                    <h1 className='text-lg font-medium bg-richblack-700 w-full py-2 px-3 border-b-2 border-richblack-600'
                     onClick={()=>{setmodalcnt(idx)}}>{ele.sectionName}</h1>
                   <div className={`w-full ${modalcnt===idx?"h-full":"h-0"} text-base flex-col items-start justify-start`}>
                        {ele.subSection.map((subsec, index)=>{
                        
                        return <div key={index} className='py-2 border-b-2 border-richblack-700 px-7 bg-richblack-800 w-full'
                        onClick={()=>{
                          setvideoUrl(subsec.videoUrl);
                          // console.log(subsec.videoUrl);
                          setsubSectionId(subsec._id)
                        }}>{subsec.title}</div>
                        })}
                        {/* <div className='py-2 border-b-2 border-richblack-700 px-7 bg-richblack-800 w-full'>Learn basic</div>
                        <div className='py-2 border-b-2 border-richblack-700 px-7 bg-richblack-800 w-full'>Learn Conditionals</div>
                        <div className='py-2 border-b-2 border-richblack-700 px-7 bg-richblack-800 w-full'>Practice</div>
                        <div className='py-2 border-b-2 border-richblack-700 px-7 bg-richblack-800 w-full'>Practice</div>
                        <div className='py-2 border-b-2 border-richblack-700 px-7 bg-richblack-800 w-full'>Practice</div> */}
                    </div>
                </div>
                })}
                
                
                
               
              </div>
        </div>

        <div className='w-[100%] md:w-[83%] flex flex-col items-center justify-center bg-richblack-800 h-full'>
            <div className='w-[90%] lg:w-[60%] h-[200px] sm:h-[400px]  lg:h-[500px] overflow-hidden rounded-sm'>
                {/* <video src={videoUrl} alt="" className='h-full w-full rounded-sm'/> */}
                <ReactPlayer url={videoUrl} controls  width='100%'
          height='100%' onEnded={()=>{markCompleted()}}/>
            </div>
        </div>

    </div>
  )
}

export default CourseContent