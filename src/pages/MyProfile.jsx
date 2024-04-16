import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../services/apis";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {setUser} from '../slices/profileSlice'
import SideBar from "../components/common/SideBar";


const MyProfile = () => {
  const {token} = useSelector((state) => state.auth);
  const navigate=useNavigate();
  const [loading, setloading] = useState(false);
  // const [userDetails, setuserDetails] = useState({});
  // console.log(token);
  const location=useLocation();

  const dispatch=useDispatch();
  let userDetails=useSelector((state)=>state.profile).user;

  // if(userDetails.accountType!=="student"){
  //   console.log("Bansi")
  // }
  // console.log(userDetails);
  // let userDetails=JSON.stringify(localStorage.getItem)
  // console.log(userDetails);
  

  const fetchData = async () => {
    // console.log(token);
    if(token===null){
      navigate('/login');
    // console.log(token);

      return;
    }

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
  }
  useEffect(() => {
    fetchData();
    // console.log("Bansi")
  },[]);
  
  // const [show, setshow] = useState(false);
  // const handleshow=()=>{
  //   setshow(!show);
  // }
  return (

    <div className="flex flex-row h-full w-full relative">
      
      <SideBar/>
    <div className="right w-full">
      {loading && (
        <div className="text-4xl text-pure-greys-5 flex flex-col items-center pt-40">
          LOADING
        </div>
      )}
      {!loading && userDetails &&  (
        <div className="w-full pt-8 md:pt-20 px-5 md:px-[100px] flex flex-col items-start justify-start gap-5 md:gap-10 h-full">
          <div className="border border-richblack-700 flex gap-3  flex-col md:flex-row items-center justify-between bg-richblack-800 
          rounded-md py-4 md:py-10 px-10 w-full xl:w-[60%] text-pure-greys-300">
            <div className="left flex flex-row items-center justify-center gap-3">
              <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
                <img src={userDetails.image} alt="" className="hfull w-full object-cover" />
              </div>
              <div className="flex flex-col items-start justify-center gap-0">
                <div>{userDetails?.firstName} {userDetails?.lastName}</div>
                <div className="">{userDetails?.email}</div>
              </div>
            </div>

            <Link to={'/dashboard/edit-profile'}><button className="btn bg-[#FFD60A] text-richblack-800 px-8 py-2 rounded-md
            hidden md:block">
              Edit
            </button>
            </Link>
          </div>
          <div className=" border border-richblack-700 flex flex-row items-center justify-between 
          bg-richblack-800 rounded-md py-4 md:py-10 px-10 w-full xl:w-[60%] text-pure-greys-300">
            <div className="flex flex-col w-full gap-8">
              <div className="w-full flex flex-row items-center justify-between">
                <div className="text-pure-greys-5">Personal Details</div>
                <Link to={'/dashboard/edit-profile'}><button className="btn bg-[#FFD60A] text-richblack-800 px-8 py-2 rounded-md">
              Edit
            </button>
            </Link>
              </div>

              <div className="w-[100%] flex flex-col gap-2 md:gap-5 md:flex-row items-center justify-center md:justify-between">
                <div className="left flex flex-col items-start justify-center gap-2 md:gap-8  w-full">
                  <div className="flex flex-col items-start justify-center">
                    <div>First Name</div>
                    <div className="text-pure-greys-5">{userDetails?.firstName}</div>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <div>email</div>
                    <div className="text-pure-greys-5">{userDetails?.email}</div>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <div>Gender</div>
                    <div className="text-pure-greys-5">{userDetails?.additionalDetails?.gender?userDetails?.additionalDetails?.gender
                    :"Add gender"}</div>
                  </div>
                </div>
                <div className="right flex flex-col items-start justify-center gap-2 md:gap-8 w-full ">
                  <div className="flex flex-col items-start justify-center">
                    <div>Last Name</div>
                    <div className="text-pure-greys-5">{userDetails.lastName}</div>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <div>Phone no.</div>
                    <div className="text-pure-greys-5">{userDetails?.additionalDetails?.contactNumber?
                    userDetails?.additionalDetails?.contactNumber:"Add Phone no."}</div>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <div>Date of Birth</div>
                    <div className="text-pure-greys-5">{userDetails?.additionalDetails?.dateOfBirth?
                    userDetails?.additionalDetails?.dateOfBirth:"Add DOB"}</div>
                  </div>
                </div>
              </div>
            </div>

            <div />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default MyProfile;


