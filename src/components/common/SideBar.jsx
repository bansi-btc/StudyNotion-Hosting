import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setLogoutModal } from "../../slices/profileSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const SideBar = () => {
  const location = useLocation();
  const {user}=useSelector((state)=>state.profile);
  const {logoutModal}=useSelector((state)=>state.profile);
  const dispatch=useDispatch();
  // console.log(logoutModal);
  // console.log("Bansi");
  // console.log(user);
  useEffect(()=>{
    // console.log("Bansi");
  }, [logoutModal])

  const [show, setshow] = useState(false);

  

  return (
    <div
      className={`sidebar flex flex-col items-start justify-start gap-2 bg-richblack-700  
      text-richblack-300 w-[200px] lg:w-[20%] pl-5 py-7 md:py-10 absolute lg:relative h-[90vh]
       ${show?"translate-x-0":"translate-x-[-100%]"} lg:translate-x-0 transition-all duration-300 origin-left h-[92.1vh] z-20`}
    >
      <div className={`fixed top-0 ${show?"left-2":"left-[105%]"} lg:hidden block text-white px-2 py-1 z-10`} onClick={()=>{
        setshow(!show);
      }}>{show?
      <IoCloseSharp className="text-2xl"/>:
      <GiHamburgerMenu className="text-xl" />}</div>
      {/* <div className="" onClick={handleshow}></div> */}
      {user.accountType==='student'?<div className="w-full flex flex-col items-start justify-start gap-2 bg-richblack-700  
      text-richblack-300">
      <div
        className={`w-full ${
          location.pathname.includes("my-profile") &&
          " border-r-4 border-[#FFD60A]"
        }`}
      >
        <Link
          to={"/dashboard/my-profile"}
          className={`${
            location.pathname.includes("my-profile") && "text-[#FFD60A]"
          }`}
        >
          My Profile 
        </Link>
      </div>
      <div
        className={`w-full ${
          location.pathname.includes("enrolled-courses") &&
          " border-r-4 border-[#FFD60A]"
        }`}
      >
        <Link
          to={"/dashboard/enrolled-courses"}
          className={`${
            location.pathname.includes("enrolled-courses") && "text-[#FFD60A]"
          }`}
        >
          Enrolled Courses
        </Link>
      </div>
      <div
        className={`w-full ${
          location.pathname.includes("cart") && " border-r-4 border-[#FFD60A]"
        }`}
      >
        <Link
          to={"/dashboard/cart"}
          className={`${
            location.pathname.includes("cart") && "text-[#FFD60A]"
          }`}
        >
          Wishlist
        </Link>
      </div>
      <div
        className={`w-full ${
          location.pathname.includes("purchase-history") && " border-r-4 border-[#FFD60A]"
        }`}
      >
        <Link
          to={"/dashboard/purchase-history"}
          className={`${
            location.pathname.includes("purchase-history") && "text-[#FFD60A]"
          }`}
        >
          Purchase History
        </Link>
      </div>
      {/* <div>Courses</div> */}
      <br />

      <div>Settings</div>
      
      <div className="cursor-pointer" onClick={()=>{
        // console.log("Bansi");
        // setLogoutModal(true);
        dispatch(setLogoutModal(true));
      }}>Log Out</div>
      </div>:
      <div className="w-full flex flex-col items-start justify-start gap-2 bg-richblack-700  
      text-richblack-300 h-[90vh]">
      <div
        className={`w-full ${
          location.pathname.includes("my-profile") &&
          " border-r-4 border-[#FFD60A]"
        }`}
      >
        <Link
          to={"/dashboard/my-profile"}
          className={`${
            location.pathname.includes("my-profile") && "text-[#FFD60A]"
          }`}
        >
          My Profile
        </Link>
      </div>
      <div
        className={`w-full ${
          location.pathname.includes("enrolled-courses") &&
          " border-r-4 border-[#FFD60A]"
        }`}
      >
        <Link
          to={"/dashboard/my-courses"}
          className={`${
            location.pathname.includes("my-courses") && "text-[#FFD60A]"
          }`}
        >
          My Courses
        </Link>
      </div>
      <div
        className={`w-full ${
          location.pathname.includes("cart") && " border-r-4 border-[#FFD60A]"
        }`}
      >
        <Link
          to={"/dashboard/cart"}
          className={`${
            location.pathname.includes("cart") && "text-[#FFD60A]"
          }`}
        >
          Wishlist
        </Link>
      </div>
      <div>Purchase History</div>
      <div>Courses</div>
      <br />

      <div>Settings</div>
      <div className="cursor-pointer" onClick={()=>{
        // console.log("Bansi");
        // setLogoutModal(true);
        dispatch(setLogoutModal(true));
      }}>Log Out</div>
      </div>
      }
    </div>
  );
};

export default SideBar;
