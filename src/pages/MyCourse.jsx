import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { courses, profile } from "../services/apis";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../slices/profileSlice";
import SideBar from "../components/common/SideBar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios';

const MyCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  // const [userDetails, setuserDetails] = useState({});
  // console.log(token);
  const location = useLocation();

  const dispatch = useDispatch();
  let userDetails = useSelector((state) => state.profile).user;
  console.log("Bansi");
  console.log(userDetails);
  //   console.log(userDetails);
  // console.log(userDetails.courses);

  // if(userDetails.accountType!=="student"){
  //   console.log("Bansi")
  // }
  // console.log(userDetails);
  // let userDetails=JSON.stringify(localStorage.getItem)
  // console.log(userDetails);

  const fetchData = async () => {
    // console.log(token);
    if (token === null) {
      navigate("/login");
      // console.log(token);

      return; 
    }

    // const res=await
    const data={
      "token":token,
    }
    // const res=await fetch(profile.GET_USER_DETAILS_API
    // const res=await axios.post(profile.GET_USER_DETAILS_API, data);
    // console.log(res.data);


    // if(userDetails.accountType!=='student'){
    //   toast.error("Protected route for student");
    //   navigate('/login');
    //   return;
    // }

    //   if(!token) {}
    //   setloading(true);
    //   try {
    //     // console.log(profile.GET_USER_DETAILS_API);
    //     const result = await fetch(profile.GET_USER_DETAILS_API, {
    //       method: "GET",
    //       headers: {
    //         token: token,
    //       },
    //     });
    //     const output = await result.json();
    //     // console.log(output);
    //     if (!output.success) {
    //       toast.error(output.message);
    //       navigate('/login');
    //       return;
    //     }

    //     // setuserDetails(output.existingUser);
    //     dispatch(setUser(output.existingUser));
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    //   setloading(false);
    // };
  };

  const [deleteCourseId, setdeleteCourseId] = useState('');
  const [deleteCourseModal, setdeleteCourseModal] = useState(false);

  const handleCourseDelete=async()=>{
    // console.log(deleteCourseId);
    const formData=new FormData();
    formData.append("token", token);
    formData.append("courseId", deleteCourseId);
    console.log(deleteCourseId);

    const res=await axios.post(courses.DELETE_COURSE, formData);
    console.log(res.data);

    const formData1=new FormData();
    formData1.append("token", token);
    const output2=await axios.post(profile.GET_USER_DETAILS_API, formData1);

    if (!output2.data.success) {
      toast.error(output2.data.message);
      // navigate('/login');
      return;
    }

    // setuserDetails(output.existingUser);
    dispatch(setUser(output2.data.existingUser));
    localStorage.setItem("user", JSON.stringify(output2.data.existingUser));
    // console.log(JSON.parse(localStorage.getItem("user")));
    toast.success(res.data.message);
    // toast.remove();
    setdeleteCourseModal(false);
    
  }
  useEffect(() => {
    fetchData();
    // console.log("Bansi")
  }, []);
  return (
    <div className="flex flex-row h-full w-full relative">
      <SideBar />
     {deleteCourseModal &&  <div className="w-[300px] mx-auto absolute z-20 mt-10 bg-transparent border border-richblack-500
              px-4 py-6 rounded-md backdrop-blur-sm
              flex flex-col items-center justify-center gap-5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
              ">
                <h1 className="text-center text-xl font-medium text-richblack-25">Are you sure to Delete this Course</h1>
                <div className="btns flex flex-row items-center justify-center gap-4">
                  <button className="btn px-6 py-1 border border-[#FFD60A] rounded-md text-richblack-5"
                  onClick={()=>{setdeleteCourseModal(false)}}>Cancel</button>
                  <button className="btn px-6 py-1 bg-[#e24c4c] rounded-md text-richblack-5" 
                  onClick={handleCourseDelete}>Delete</button>
                </div>
                </div>}
      <div className="right w-full lg:w-[87%] mx-auto lg:mx-0  overflow-auto h-[92vh]">
        {loading && (
          <div className="text-4xl text-pure-greys-5 flex flex-col items-center pt-40">
            LOADING
          </div>
        )}
        {!loading && userDetails && (
          <div className="w-full pt-10 px-5 lg:px-[100px] flex flex-col items-start justify-start gap-8">
            <div className="flex flex-row items-center justify-start gap-4 text-lg text-richblack-100   ">
              <div>Home</div>
              <div>Dashboard</div>
              <div className="text-yellow-50">Courses</div>
            </div>

            <div className="text-3xl font-medium text-richblack-100 w-full flex flex-row items-center justify-between">
              <div>My Course</div>
              <Link to={"/dashboard/create-course"}>
                <div
                  className="text-base text-richblack-700 bg-[#FFD60A] px-6 py-2 rounded-md flex 
                flex-row items-center justify-center gap-2"
                >
                  <CiCirclePlus className="text-black font-bold text-xl" />
                  <div>New</div>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-6 gap-x-10 gap-y-8 w-full px-4 py-4 border
             border-richblack-600 rounded-md mb-10">
              
              <div className="col-span-4 md:col-span-3 text-richblack-5 text-lg ">Courses</div>
              <div className="hidden md:block text-richblack-5 text-lg">Duration</div>
              <div className= "hidden md:block text-richblack-5 text-lg">Price</div>
              <div className="col-span-2 md:col-span-1 text-richblack-5 text-lg">Actions</div>

              {userDetails.courses.map((ele, index)=>{
                return <div key={index} className="col-span-6 grid grid-cols-6 gap-x-10 gap-y-8">
              <div className="col-span-6 h-[1px] bg-richblack-500"></div>

                <div className="col-span-4 md:col-span-3 flex flex-col lg:flex-row items-start lg:items-center justify-start gap-5 py-0">
                  {/* <div className="h-[130px] w-[200px] bg-richblack-200 rounded-md"></div> */}
                  <div className="h-[100px] w-[140px] bg-white rounded-sm object-cover overflow-hidden">
                    <img src={ele.thumbnail} alt="" className="h-full w-full object-cover"/>
                  </div>
                  <div className="w-[90%] flex flex-col items-start justify-between gap-2">
                    <h1 className="text-richblack-5 text-xl">
                      {ele.courseName}
                    </h1>
                    <p className="text-sm text-richblack-400 hidden md:block">
                      This course provides an overview of the design process,
                      design thinking, and basic design principles.
                      {ele.courseDescription}
                    </p>
                    <p className="text-sm text-richblack-200">
                      Created: April 27, 2023 | 05:15 PM
                    </p>
                    {ele.published && <div className="text-yellow-100 bg-richblack-500 px-4 py-1 rounded-md">
                      Published
                    </div>}
                    {!ele.published && <div className="text-richblack-5 bg-[#dd5858] px-4 py-1 rounded-md">
                      Draft
                    </div>}
                  </div>
                </div>
                <div className="hidden md:flex flex-col justify-center text-richblack-5">
                  20h 10m
                </div>
                <div className="hidden md:flex flex-col justify-center text-richblack-5">
                  ₹{ele.price}
                </div>
                <div className="col-span-2 md:col-span-1 flex flex-row justify-start items-center text-richblack-5 gap-3 text-2xl">
                  <div>
                    <MdEdit />
                  </div>
                  <div onClick={()=>{
                    setdeleteCourseId(ele._id);
                    setdeleteCourseModal(true);
                  }}>
                    <MdDelete />
                  </div>
                </div>
                </div>
              })}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourse;
