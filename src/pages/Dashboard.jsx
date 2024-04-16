import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useFetcher, useLocation, useNavigate, Link } from 'react-router-dom'
import MyProfile from './MyProfile';
import EditProfile from './EditProfile';


const Dashboard = () => {
    const navigate=useNavigate();
    let location=useLocation();
    const {token}=useSelector((state)=>state.auth);
    useEffect(()=>{
        if(!token){
            navigate('/login');
            return;
        }
        // navigate('/dashboard');
        // console.log("Dashboard pe aaye ho");
        // navigate('/signup')
        navigate('/dashboard/my-profile')
    }, [])
  return (
    <div className='flex flex-row h-full w-full'>
      <div className="sidebar flex flex-col items-start justify-start gap-2 bg-richblack-700  
      text-richblack-300 w-[13%] px-5 py-10">
        <div><Link to={'/dashboard/my-profile'}>My Profile</Link></div>
        <div><Link to={'/dashboard/enrolled-courses'}>Enrolled Courses</Link></div>
        <div>Wishlist</div>
        <div>Purchase History</div>
        <div>Courses</div>
        <br />

        <div>Settings</div>
        <div>Log Out</div>
      </div>

      <div className="right w-[87%]">
          <Routes>
            <Route path='/my-profile' element={<MyProfile />}/>
            <Route path='/enrolled-courses' element={<div className='text-white'>Enrolled Courses</div>}/>
            <Route path='/editprofile' element={<EditProfile/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default Dashboard
