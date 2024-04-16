import React, { useState } from 'react'
import SideBar from '../components/common/SideBar'
import { Link, NavLink } from 'react-router-dom'
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";


const EnrolledCourses = () => {

  const {user}=useSelector((state)=>state.profile);


  if(user.accountType!=='student'){
    console.log("proteccted Route for Student");
    return <>Protected route</>
  }

  const [tag, settag] = useState("all");

 

  
  // useState
  return (
    <div className='flex flex-row h-full w-full relative'>
      
        <SideBar/>
        
        <div className='right w-full lg:w-[87%] px-5 py-8 text-pure-greys-5 flex flex-col items-start justify-start gap-2 md:gap-10'>
            {/* <h1 className='text-white'>enrooled courses</h1> */}

            <div className='flex flex-row items-center justify-start gap-4 text-base md:text-lg'>
              <Link to={'/'}><div>Home</div></Link>
              <div>Dashboard</div>
              <div className='text-yellow-100'>Enrolled Courses</div>
            </div>

            <h1 className='text-pure-greys-5 text-xl md:text-3xl font-medium'>Enrolled Courses</h1>

            <div className='w-full flex flex-col items-start justify-start gap-5'>
              <div className='flex flex-row items-center justify-between gap-0 text-sm md:text-lg bg-richblack-700 w-full
              md:w-[380px] 
              rounded-full'>
                <div className={`${tag==="all"?"bg-richblack-800":""} py-2 w-[28%] text-center
                   rounded-full`} onClick={()=>{settag("all")}}>All</div>
                <div className={`${tag==="pending"?"bg-richblack-800":""} py-2 w-[33%] text-center
                  rounded-full`} onClick={()=>{settag("pending")}}>Pending</div>
                <div className={`${tag==="completed"?"bg-richblack-800":""} py-2 w-[38%] text-center
                   rounded-full`} onClick={()=>{settag("completed")}}>Completed</div>
              </div>
              <div className='w-full max-h-[60vh] overflow-auto border border-richblack-600 rounded-sm '>
             

              <table className='w-full rounded-md border border-richblack-600 '>
                <thead>
                <tr className=' bg-richblack-700 rounded-md overflow-hidden'>
                  <td className='w-[90%] md:w-[70%] py-5 px-4'>Course</td>
                  <td className='px-5'>Duration</td>
                  <td  className='hidden md:table-cell' >Progress</td>
                </tr>
                
                </thead>

                <tbody>
                {user.courses.length===0 && <tr className='text-lg  py-5 px-4 text-richblack-300'>
                  <td colSpan="3" className='p-3'>No Course to view</td>
                
              </tr>}

                {user.courses.map((ele, index)=>{
                  return <tr key={index} className='border border-richblack-600'>
                  <td className='w-[90%] md:w-[70%] flex flex-col sm:flex-row items-start justify-start gap-4 py-5 px-4'>
                    <NavLink to={`/view-course/${ele._id}`}><div className='h-[80px] w-[100px] rounded-md bg-yellow-5'>
                      <img src={ele.thumbnail} alt="" className='w-full h-full rounded-md' />
                      </div></NavLink>
                    <NavLink to={`/view-course/${ele._id}`}><div className='flex flex-col items-start justify-center gap-0'>
                      <h1 className='text-xl font-medium'>{ele.courseName}</h1>
                      <h1 className='text-sm'>{ele.courseDescription}</h1>
                    </div></NavLink>
                  </td>
                  <td className=''>2hr 30mins</td>
                  <td  className='hidden md:table-cell' >
                  <ProgressBar className='' height='13px' width='200px' completed={20} bgColor='#1FA2FF'
                  animateOnRender={true} />
                  {/* <div>:</div> */}
                  </td>
                </tr>
                })}
                
                
                
                </tbody>
                
                
              </table>
              </div>
              
            </div>
        </div>
    </div>
  )
}

export default EnrolledCourses