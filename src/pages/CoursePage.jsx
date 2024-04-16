import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courses } from "../services/apis";
import { useDispatch, useSelector } from "react-redux";
import { IoStar } from "react-icons/io5";
import Footer from "../components/common/Footer";
import image from '../assets/Images/aboutus1.webp'
import { PiTelevision } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa6";
import { FaArrowPointer } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { addItem, removeItem } from "../slices/cartSlice";
import toast from "react-hot-toast";
import { buyCourse } from "../services/operations/studentFeaturesApi";

const CoursePage = () => {
  const location = useLocation();
  const courseId = location.pathname.split("/").at(-1);
  const { user } = useSelector((state) => state.profile);
  const rating = 4.5;
  const dispatch=useDispatch();
  const {token}=useSelector((state)=>state.auth);
  // console.log(token);
  const navigate=useNavigate();
  const [loading, setloading] = useState(true);
  const [totalLectures, settotalLectures] = useState(0);


  const [courseDetails, setcourseDetails] = useState({});

  const {cart}=useSelector((state)=>state.cart);
  const {totalPrice}=useSelector((state)=>state.cart);
  // console.log(totalPrice);
  const result=cart.find((cou)=>{
    return cou._id===courseId;
  })
  // let temparr=[...cart];
  // console.log(cart);
  console.log("Himanshu");
  console.log(user.courses);

  let alreadyPurchased=user.courses.find((cou)=>{
    return cou._id===courseId;
  })

  const fetchData = async () => {
    
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("token", token);
    const res = await axios.post(courses.COURSE_DETAILS, formData);
    // console.log(res.data);
    setcourseDetails(res.data.courseDetails);
    console.log("Bansi")
    console.log(res.data.courseDetails);
    let cnt=0;
    for(let value of res.data.courseDetails.courseContent){
      // console.log(value.subSection.length)
      cnt+=value.subSection.length;
    }
    console.log(cnt);

    settotalLectures(cnt);
    setloading(false);
  };

  const handleBuyCourse=async()=>{
    if(!token){
      toast.error("Sign in to buy course");
      navigate('/login');
    }

    //new user laao
    const res=await buyCourse(token, [courseId], user, navigate, dispatch);
    // console.log("Bansi");
    // console.log(res);


  }


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", totalPrice); 
  }, [cart]);

  const [opencnt, setopencnt] = useState("0");
  return (
    <div className="h-full w-full relative">
    {!loading ?<div className="h-full w-full">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-start justify-between pt-10 lg:py-10 px-5 xl:px-0">
        <div className="left w-full lg:w-[65%] flex flex-col items-start justify-start gap-8 md:gap-14">
          <div className="flex flex-col items-start w-full justify-start gap-3">
            <div className="flex flex-row items-center justify-start gap-3 text-richblack-300 text-lg">
              <div>Home</div>
              <div>/</div>
              <div>Learing</div>
              <div>/</div>
              <div className="text-yellow-25">{courseDetails?.category?.name?courseDetails.category.name.charAt(0).toUpperCase()+
              courseDetails.category.name.slice(1):""}</div>
            </div>

            <h1 className="text-2xl md:text-3xl font-medium text-richblack-5">
              {courseDetails.courseDescription}
            </h1>

            <p className="text-base text-richblack-200">
              This {courseDetails.category.name} for beginners course will help you to become Zero to
              Hero. Learn {courseDetails.category.name} Programming in Easy Way.
            </p>

            <div className="flex flex-row items-baseline justify-start gap-3 text-base md:text-xl">
              <div className="text-[#FFD60A]">4.5</div>
              <div className="flex flex-row items-center justify-start gap-1">
                <IoStar
                  className={`${
                    rating >= 1 ? "text-[#FFD60A]" : "text-richblack-300"
                  }`}
                />
                <IoStar
                  className={`${
                    rating >= 2 ? "text-[#FFD60A]" : "text-richblack-300"
                  }`}
                />
                <IoStar
                  className={`${
                    rating >= 3 ? "text-[#FFD60A]" : "text-richblack-300"
                  }`}
                />
                <IoStar
                  className={`${
                    rating >= 4 ? "text-[#FFD60A]" : "text-richblack-300"
                  }`}
                />
                <IoStar
                  className={`${
                    rating >= 5 ? "text-[#FFD60A]" : "text-richblack-300"
                  }`}
                />
              </div>
            </div>

            <div className="text-richblack-100 text-base md:text-xl">
              Created by instructor {courseDetails.instructor.firstName.charAt(0).toUpperCase()+courseDetails.instructor.firstName.slice(1)} {courseDetails.
              instructor.lastName.charAt(0).toUpperCase()+courseDetails.instructor.lastName.slice(1)} 
              
            </div>

            <div className="flex flex-row items-center justify-self-start gap-5 text-richblack-100 text-base md:text-xl">
              <div>Created at 02/2020</div>
              <div className="flex flex-row items-center justify-start gap-3 text-richblack-100">
                English
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-6 w-full border-2 border-richblack-700 px-8 py-8 rounded-md">
            <h1 className="text-2xl md:text-3xl font-medium text-richblack-5">
              What you'll learn
            </h1>

            <div className="w-full flex flex-col items-start justify-start gap-3 text-richblack-50 text-sm md:text-base">
              <div>Introduction to {courseDetails.category.name} and {courseDetails.category.name} 3</div>
              <div>
                Understand the basics: Data types, Loops, Conditional
                statements, Functions and Modules
              </div>
              <div>Learn object oriented programming in Python</div>
              <div>
                Learn how to make your own web-scraping tool using Python
              </div>
              <div>Know how to Read and Parse JSON and XML files</div>
            </div>
          </div>

          <div className="w-full flex flex-col items-start justify-start gap-4">
            <h1 className="text-xl md:text-3xl font-medium text-richblack-5">
              Course Content
            </h1>

            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center justify-start gap-3 text-richblue-200 text-sm md:text-base">
                <div>{courseDetails.courseContent.length} sections</div>
                <div>{totalLectures} lectures</div>
                <div>4 hour 57 min total length</div>
              </div>

              <div className="text-sm md:text-base text-yellow-25">
                Collapse all sections
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-full border-2 border-richblack-600 rounded-md">
              {courseDetails.courseContent.map((section, idx)=>{
                return <div key={idx}
                className="flex flex-col items-start justify-start w-full"
                onClick={() => {
                  setopencnt(idx+1);
                }}
              >
                <div
                  className="text-richblack-5 text-base md:text-lg p-3 bg-richblack-700 w-full h-full flex flex-row 
                  items-center justify-between border-b
                border-richblack-500"
                >
                  <div>{section.sectionName}</div>
                  <div className="flex flex-row items-center justify-end gap-5 text-base">
                    <div className="text-yellow-25">{section.subSection.length} lectures</div>
                    <div>51 minutes</div>
                  </div>
                </div>

                

                {opencnt === (idx+1) && section.subSection.length>0 && (
                  <div className="flex flex-col items-start justify-start gap-2 text-lg w-full bg-richblack-800 py-4 px-3 text-richblack-100">
                    {section.subSection.map((ele, index)=>{
                      return <div key={index} className="">{ele.title}</div>
                    })}
                    
                  </div>
                )}
              </div>
              })}
              
            
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-3">
              <div className="text-2xl md:text-3xl font-medium text-richblack-5">Author</div>
              <div className="flex flex-row items-center justify-start gap-2 text-richblack-5 text-xl md:text-2xl">
                {/* <div>{courseDetails.instructor.firstName}</div> */}
                <div className="h-[30px] w-[30px] md:h-[40px] md:w-[40px] rounded-full overflow-hidden">
                  <img className="h-full w-full" src={courseDetails.instructor.image} alt="" /></div>
                <div>{courseDetails.instructor.firstName.charAt(0).toUpperCase()+courseDetails.instructor.firstName.slice(1)} {courseDetails.
              instructor.lastName.charAt(0).toUpperCase()+courseDetails.instructor.lastName.slice(1)} </div>
              </div>
              <div className="text-richblack-100 text-sm md:text-base">
                I will be your lead trainer in this course. Within no time, I
                will help you to understand the subject in an easy manner. I
                have a huge experience in online training and recording videos.
                Let's get started!
              </div>
            </div>
          </div>
        </div>

        <div className="right w-[100%] sm:w-[70%] scale-[0.80] md:scale-100 lg:w-[32%] pb-3 bg-richblack-700 flex flex-col items-start 
        justify-start rounded-md overflow-hidden
        border-2 border-richblack-600 mx-auto lg:mx-0 translate-y-[-2%]">
          <div className="h-[180px] w-full overflow-hidden">
            <img src={courseDetails?.thumbnail} alt="" className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col items-start justify-start gap-4 w-full py-3 px-8">
            <div className="w-full flex flex-col items-start justify-start">

            <div className="text-3xl font-semibold text-richblack-5">Rs. {courseDetails.price}</div>
            <del className="text-base italic font-medium text-[#06D6A0]">Rs. {courseDetails.price+1000}</del>
            </div>
            

            <div className="flex flex-col items-center justify-start w-full gap-2">
              {!alreadyPurchased && !result && <div className="w-full bg-[#FFD60A] text-center py-2 rounded-sm cursor-pointer" onClick={()=>{
                // console.log(courseDetails);
                // return;
                if(!courseDetails){
                  return;
                }
                dispatch(addItem(courseDetails))
                // console.log(courseDetails);
                // localStorage.setItem()
                // console.log(res);
                // console.log(cart);
                
                

                // localStorage.setItem("cart", JSON.stringify(cart));
                toast.success("Item added to cart");
                // toast
              }}>Add to cart</div>}
              {!alreadyPurchased && result && <div className="w-full bg-[#fc4a4a] text-center py-2 rounded-sm cursor-pointer text-richblack-5 " onClick={()=>{
                // console.log(courseDetails);
                // return;
                if(!courseDetails){
                  return;
                }
                // dispatch(addItem(courseDetails))
                dispatch(removeItem(courseId));
                // console.log(courseDetails);
                // localStorage.setItem()
                // console.log(res);
                // console.log(cart);
                
                

                // localStorage.setItem("cart", JSON.stringify(cart));
                toast.success("Item removed to cart");
                // toast
              }}>Remove from cart</div>}
              {!alreadyPurchased && <div className="w-full bg-richblack-800 text-richblack-5 text-center py-2 rounded-sm cursor-pointer"
              onClick={handleBuyCourse}>Buy Now</div>}
              {alreadyPurchased && <div className="w-full bg-richblack-800 text-richblack-5 text-center py-2 rounded-sm cursor-pointer"
              onClick={()=>{
                // navigate(/)
                navigate(`/view-course/${courseId}`);
              }}>View Course</div>}
            </div>

            <div className="w-full text-center text-richblack-200">30-Day Money-Back Guarantee</div>


            <div className="flex flex-col items-start justify-start gap-2 text-base">
              <h1 className=" text-richblack-5">This course includes:</h1>
              <div className="flex flex-row items-center justify-start gap-2 text-[#06D6A0]">
              <FaRegClock />
                <div>8 hours on-demand video</div>
              </div>
              <div className="flex flex-row items-center justify-start gap-2 text-[#06D6A0]">
              <FaArrowPointer />
                <div>Full Lifetime access</div>
              </div>
              <div className="flex flex-row items-center justify-start gap-2 text-[#06D6A0]">
              <PiTelevision />
                <div>Access on Mobile and TV</div>
              </div>
              <div className="flex flex-row items-center justify-start gap-2 text-[#06D6A0]">
              <GrCertificate />
                <div>Certificate of completion</div>
              </div>
            </div>

            <div className="text-center w-full text-[#FFD60A]">Share</div>
          </div>
          
        </div>
      </div>

      <Footer/>
    </div>:<div className="text-3xl absolute top-1/2 left-1/2 text-richblack-5">Loading</div>}
    </div>
  );
};

export default CoursePage;
