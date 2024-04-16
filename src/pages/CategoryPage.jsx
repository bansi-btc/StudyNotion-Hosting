import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categories } from "../services/apis";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import image from "../assets/Images/aboutus1.webp";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { IoStar } from "react-icons/io5";
import Footer from '../components/common/Footer'


// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/swiper-bundle.css';
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const location = useLocation();

  const id = location.pathname.split("/").at(-1);
  const {token}=useSelector((state)=>state.auth);

  const [courses, setcourses] = useState([]);
  const [topCourses, settopCourses] = useState([]);
  const [randomCourses, setrandomCourses] = useState([]);
  const [categoryName, setcategoryName] = useState(null)
  const navigate=useNavigate();
  const [loading, setloading] = useState(false);

  // console.log(id);
  const fetchData = async () => {
    // console.log("Bansi")
    setloading(true);
    const data = {
      categoryId: id,
    };
    const formdata=new FormData();

    formdata.append("token", token);
    formdata.append("categoryId", id);

    const res = await axios.post(categories.CATEGORIES_PAGE_DETAILS, data);
    const res2=await axios.post(categories.CATEGORY_DETAILS, formdata);
    console.log("HHH")
    console.log(res.data);
    // console.log(res2.data.data.name);
    setcategoryName(res2.data.data.name);
    // console.log(res.data.data.courses[0]);
    setcourses(res.data.data.courses);
    setrandomCourses(res.data.data.randomCourses);
    console.log(res.data.data.courses);
    settopCourses(res.data.data.topSellingCourse)
    // toast.remove();
    // toast.remove();
    setloading(false);
  };
  const rating=4.5;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-full w-full relative">
    {!loading?<div className="h-full w-full">
      <div className="text-white bg-richblack-800 px-5 xl:px-0">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between py-8 gap-5 md:gap-0">
          <div className="w-full md:w-[80%] left flex flex-col items-center md:items-start justify-start gap-4">
            <div className="flex flex-row items-center justify-start text-xl font-medium gap-3 ">
              <div>Home</div>
              <div className="text-richblack-500">/</div>
              <div>Catalog</div>
              <div className="text-richblack-500">/</div>
              {categoryName && <div>{categoryName?.charAt(0).toUpperCase()+categoryName.slice(1)}</div>}
              {/* <div>{categoryName}</div> */}
            </div>

            <div className="flex flex-col items-start justify-start gap-3">
              {categoryName && <div className="text-3xl font-medium text-center
              md:text-start w-full md:w-fit">{categoryName?.charAt(0).toUpperCase()+categoryName.slice(1)}</div>}
              {/* <div className="text-3xl font-medium">{categoryName}</div> */}
              <div className="text-richblack-300 text-sm md:text-base text-center md:text-start">
                Python is a general-purpose, versatile, and powerful programming
                language. It’s a great first language because Python code is
                concise and easy to read. Whatever you want to do, python can do
                it. From web development to machine learning to data science,
                Python is the language for you.
              </div>
            </div>
          </div>
          <div className="w-full md:w-[20%] flex flex-col items-center md:items-end justify-start text-base ">
            <div className="flex flex-col items-start justify-start gap-3 text-xl font-medium">
              <div>Related resources</div>
              <div className="flex flex-col items-start gap-1 text-base text-richblack-100">
                <div className="flex flex-row items-center justify-start gap-2">
                  <div className="h-[8px] w-[8px] bg-richblack-300 rounded-full"></div>
                  {categoryName && <div>doc {categoryName}</div>}
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
                  <div className="h-[8px] w-[8px] bg-richblack-300 rounded-full"></div>
                  <div>Cheatsheets</div>
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
                  <div className="h-[8px] w-[8px] bg-richblack-300 rounded-full"></div>
                  <div>article</div>
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
                  <div className="h-[8px] w-[8px] bg-richblack-300 rounded-full"></div>
                  <div>Community forums</div>
                </div>
                <div className="flex flex-row items-center justify-start gap-2">
                  <div className="h-[8px] w-[8px] bg-richblack-300 rounded-full"></div>
                  <div>Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto text-white py-10 flex flex-col gap-10 px-5 xl:px-0">
        <div className="flex flex-col items-start justify-self-start gap-3">
          <h1 className="text-richblack-5 font-medium text-3xl">
            Courses to get you started
          </h1>

          <div className="flex flex-row items-center justify-start gap-4">
            <div className="text-[#FFD60A]">Most Popular</div>
            <div>New</div>
            <div>Trending</div>
          </div>

          <Swiper
            className="text-white w-full"
            modules={[Navigation ]}
            // spaceBetween={50}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            autoplay={{ delay: 1000 }}
            breakpoints={{
              // when window width is >= 768px (md)
              768: {
                slidesPerView: 2,
              },
              1000:{
                slidesPerView:3,
              }
            }}

          >
            {courses && courses.map((ele, idx)=>{
              // console.log("Bansi")
                return <SwiperSlide key={idx} className="cursor-pointer"
                onClick={()=>{navigate(`/course/${ele._id}`)}}
              
                >
                  <div className="bg-richblack-800 flex flex-col items-start justify-self-start gap-5 rounded-md
          overflow-hidden pb-4 w-full">
                  <div className="w-full h-[150px] overflow-hidden ">
                    <img src={ele.thumbnail} className="w-full object-contain" alt="" />
                  </div>
                  <div className="flex flex-col items-start justify-self-start gap-1 px-2">
                    <h1 className="text-richblack-5">
                      {ele.courseDescription.substr(0, 35)}...
                    </h1>
                    <p className="text-richblack-100">{ele.courseName}</p>
                    <div className="flex flex-row items-baseline justify-start gap-3">
                      <div className="text-[#FFD60A]">4.5</div>
                      <div className="flex flex-row items-center justify-start gap-1">
            <IoStar className={`${rating>=1?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=2?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=3?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=4?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=5?"text-[#FFD60A]":""}`}/>
            
            </div>
                    </div>
                    <p className="font-medium">Rs {ele.price}</p>
                  </div>
                  </div>
                </SwiperSlide>
            })}
            
            

          </Swiper>
          {/* <Swiper
            className="text-white w-full block sm:hidden"
            modules={[Navigation ]}
            // spaceBetween={50}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            autoplay={{ delay: 1000 }}

          >
            {courses && courses.map((ele, idx)=>{
              // console.log("Bansi")
                return <SwiperSlide key={idx} className="cursor-pointer"
                onClick={()=>{navigate(`/course/${ele._id}`)}}
              
                >
                  <div className="bg-richblack-800 flex flex-col items-start justify-self-start gap-5 rounded-md
          overflow-hidden pb-4 w-full">
                  <div className="w-full h-[150px] overflow-hidden ">
                    <img src={ele.thumbnail} className="w-full object-contain" alt="" />
                  </div>
                  <div className="flex flex-col items-start justify-self-start gap-1 px-2">
                    <h1 className="text-richblack-5">
                      {ele.courseDescription.substr(0, 35)}...
                    </h1>
                    <p className="text-richblack-100">{ele.courseName}</p>
                    <div className="flex flex-row items-baseline justify-start gap-3">
                      <div className="text-[#FFD60A]">4.5</div>
                      <div className="flex flex-row items-center justify-start gap-1">
            <IoStar className={`${rating>=1?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=2?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=3?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=4?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=5?"text-[#FFD60A]":""}`}/>
            
            </div>
                    </div>
                    <p className="font-medium">Rs {ele.price}</p>
                  </div>
                  </div>
                </SwiperSlide>
            })}
            
            

          </Swiper> */}
        
        
        </div>
        <div className="flex flex-col items-start justify-self-start gap-3">
          <h1 className="text-richblack-5 font-medium text-3xl">
            Top Courses in StudyNotion
          </h1>

          <div className="flex flex-row items-center justify-start gap-4">
            <div className="text-[#FFD60A]">Most Popular</div>
            <div>New</div>
            <div>Trending</div>
          </div>

          <Swiper
            className="text-white w-full"
            modules={[Navigation ]}
            // spaceBetween={50}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            autoplay={{ delay: 1000 }}
            breakpoints={{
              // when window width is >= 768px (md)
              768: {
                slidesPerView: 2,
              },
              1000:{
                slidesPerView:3,
              }
            }}

          >
            {topCourses && topCourses.map((ele, idx)=>{
              console.log("Bansi")
                return <SwiperSlide key={idx}
                onClick={()=>{navigate(`/course/${ele._id}`)}}
              
                >
                  <div className="bg-richblack-800 flex flex-col items-start justify-self-start gap-5 rounded-md
          overflow-hidden pb-4 w-full">
                  <div className="w-full h-[150px] overflow-hidden ">
                    <img src={ele.thumbnail} className="w-full object-contain" alt="" />
                  </div>
                  <div className="flex flex-col items-start justify-self-start gap-1 px-2">
                    <h1 className="text-richblack-5">
                      The complete python bootcamp from zero to hero in python
                    </h1>
                    <p className="text-richblack-100">name</p>
                    <div className="flex flex-row items-baseline justify-start gap-3">
                      <div className="text-[#FFD60A]">4.5</div>
                      <div className="flex flex-row items-center justify-start gap-1">
            <IoStar className={`${rating>=1?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=2?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=3?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=4?"text-[#FFD60A]":""}`}/>
            <IoStar className={`${rating>=5?"text-[#FFD60A]":""}`}/>
            
            </div>
                    </div>
                    <p className="font-medium">Rs 1200</p>
                  </div>
                  </div>
                </SwiperSlide>
            })}
         
          </Swiper>
        
        
        </div>
        <div className="flex flex-col items-start justify-self-start gap-5">
          <h1 className="text-richblack-5 font-medium text-3xl">
            Frequently Bought Together
          </h1>

          <div className="flex flex-row w-full flex-wrap justify-between gap-8">
            {randomCourses.map((cou, idx)=>{
              return <div key={idx}
              onClick={()=>{navigate(`/course/${cou._id}`)}} className="w-full md:w-[48%]">
              <div className="bg-richblack-800 flex flex-col items-start justify-self-start gap-5 rounded-md
      overflow-hidden pb-4 w-full">
              <div className="w-full h-[250px] overflow-hidden relative ">
                <img src={cou.thumbnail} className="w-full object-cover " alt="" />
              </div>
              <div className="flex flex-col items-start justify-self-start gap-1 px-2">
                <h1 className="text-richblack-5 text-lg font-medium">
                  {cou.courseDescription.substr(0, 50)+"..."}
                </h1>
                <p className="text-richblack-100">{cou.courseName}</p>
                <div className="flex flex-row items-baseline justify-start gap-3 text-lg">
                  <div className="text-[#FFD60A]">4.5</div>
                  <div className="flex flex-row items-center justify-start gap-1">
        <IoStar className={`${rating>=1?"text-[#FFD60A]":""}`}/>
        <IoStar className={`${rating>=2?"text-[#FFD60A]":""}`}/>
        <IoStar className={`${rating>=3?"text-[#FFD60A]":""}`}/>
        <IoStar className={`${rating>=4?"text-[#FFD60A]":""}`}/>
        <IoStar className={`${rating>=5?"text-[#FFD60A]":""}`}/>
        
        </div>
                </div>
                <p className="font-medium text-xl">Rs {cou.price}</p>
              </div>
              </div>
            </div>
            })}
          
         
          </div>

          
        
        
        </div>
      </div>

      <Footer/>
    </div>:<div className="text-4xl text-richblack-5 h-full w-full absolute top-1/2 left-1/2  
    ">Loading</div>}
    </div>
  );
};

export default CategoryPage;
