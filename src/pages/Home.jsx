import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import bghome from "../assets/Images/bghome.svg";
import instructor from "../assets/images/instructor.png";
import TimelineImage from "../assets/Images/TimelineImage.png";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import CourseCard from "../components/core/HomePage/CourseCard";
import { FaTrophy } from "react-icons/fa6";
import { RiGraduationCapFill } from "react-icons/ri";
import Card1 from "../components/core/HomePage/Card1";
import Card2 from "../components/core/HomePage/Card2";
import Card3 from "../components/core/HomePage/Card3";
import ReviewCard from "../components/core/HomePage/ReviewCard";
import Footer from "../components/common/Footer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setToken } from "../slices/authSlice";
const Home = () => {

  const notify =()=> toast.error("Bansi is here");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const reviews=[
    {
    id:1,
    name:"Himanshu gupta",
    email:"himanshugupta.theasperteam.com",
    review:"Cordination of activities improved tremendously with learning coding.",
    rating:4.5,
  },
    {
    id:2,
    name:"Himanshu gupta",
    email:"himanshugupta.theasperteam.com",
    review:"Cordination of activities improved tremendously with learning coding.",
    rating:4.5,
  },
    {
    id:3,
    name:"Himanshu gupta",
    email:"himanshugupta.theasperteam.com",
    review:"Cordination of activities improved tremendously with learning coding.",
    rating:4.5,
  },
    {
    id:4,
    name:"Himanshu gupta",
    email:"himanshugupta.theasperteam.com",
    review:"Cordination of activities improved tremendously with learning coding.",
    rating:4.5,
  },
  
]
  return (
    <div className="w-full">
      <div className="relative mx-auto flex flex-col items-center text-white justify-between py-4 
      gap-10 xl:gap-16 bg-richblack-900 w-full pt-5 md:pt-10 ">
        <div className=" flex flex-col items-center justify-center gap-6 w-full max-w-[1200px] mx-auto ">
          <Link to={"/signup"}>
            <div onClick={()=>{
              // localStorage.clear();
              // dispatch(setToken(null));

              // navigate('/login');
            }}
              className="group flex flex-row items-center justify-center gap-3 border border-pure-greys-400 rounded-full px-5 py-1 
                 text-richblack-200 transition-all duration-300 hover:scale-95 hover:bg-richblack-900 "
            >
              <div >Become an instructor</div>
              <div className="group-hover:-rotate-90 transition-all duration-300">
                <FaArrowRightLong />
              </div>
            </div>
          </Link>

          <h1 className="text-3xl md:text-4xl font-medium px-8 md:px-0 text-center md:text-start" onClick={notify}>
            Empower Your Future With{" "}
            <span className="text-[#1FA2FF]">Coding Skills</span>{" "}
          </h1>

          <div className="text-sm text-pure-greys-100 max-w-[750px] text-center px-8 md:px-0">
            With our online coding courses, vou can learn at vour own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </div>

          <div className="btns flex flex-row items-center justify-center gap-3">
            <CTAButton type={1} content={"Learn More"} linkto={"/"} />
            <CTAButton type={2} content={"Book a Demo"} linkto={"/"} />
          </div>

          <div className="flex flex-col items-center w-[90%] sm:w-full max-w-[900px] relative my-0 px-10 xl:px-0">
            <div
              className="h-80 w-80 bg-blue-50 rounded-full backdrop-blur-3xl blur-3xl absolute
            top-[-10px] text-center scale-0 md:scale-100"
            ></div>
            <div className="h-full w-full z-20 shadow-md shadow-[#5f84c1]">
              <video src={Banner} muted loop autoPlay></video>
            </div>

            {/* <div className='h-full w-full bg-white z-10 absolute bottom-[-14px] right-[-14px]'></div> */}
          </div>

          {/* code section1 */}

          <div className="flex flex-col items-center justify-center w-full gap-5 md:gap-14 px-8 md:px-0">
            <CodeBlock
              type={1}
              heading={""}
              text={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              btn1={{ type: 1, text: "Try It Yourself" }}
              btn2={{ type: 2, text: "Learn More" }}
            />
            {/* <CodeBlock
              type={2}
              heading={""}
              text={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              btn1={{ type: 1, text: "Continue Lesson" }}
              btn2={{ type: 2, text: "Learn More" }}
            /> */}
            {/* <CodeBlock type={2} /> */}
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center relative">
          <div className="section2 flex flex-col items-center justify-center w-full gap-5 md:gap-5 relative max-w-[1200px] ">
            <div className="headings flex flex-col items-center justify-center gap-2">
              <h1 className="text-3xl md:text-4xl font-medium">
                Unlock the <span className="text-[#1FA2FF]">Power Of Code</span>
              </h1>
              <p className="text-pure-greys-300">
                Learn to Build Anything You Can Imagine
              </p>
            </div>

            <div className="cards h-full mt-0 md:mt-0 md:min-h-[300px] w-full  flex flex-col md:flex-row items-center justify-center
            xl:justify-between gap-5 lg:gap-10 flex-wrap">
              <CourseCard
                heading={"Learn HTML"}
                content={
                  "This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more."
                }
                type={1}
              />
              <CourseCard
                heading={"Learn CSS"}
                content={
                  "This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques"
                }
                type={2}
              />
              <CourseCard
                heading={"Responsive Web design"}
                content={
                  "This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes"
                }
                type={2}
              />
            </div>

            <div className="btns z-20 flex flex-row items-center justify-center gap-5">
              <CTAButton
                type={1}
                content={"Explore Full Catalog"}
                linkto={"/"}
                arrow={true}
              />
              <CTAButton
                type={2}
                content={"Learn More"}
                linkto={"/"}
                arrow={false}
              />
              {/* <CTAButton/> */}
            </div>
          </div>

          <div className="bg-white h-[280px] w-full absolute bottom-[-40px]">
            <img src={bghome} alt="" className="h-full w-full object-cover " />
          </div>
        </div>
      </div>

      <div className=" bg-[#F9F9F9] px-5 xl:px-0 pt-10">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center gap-8 md:gap-20 pb-10 md:pb-0">
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <div className="left  w-full md:w-[50%] text-3xl md:text-4xl font-medium text-center md:text-start">
              Get the skills you need for a{" "}
              <span className="text-[#1FA2FF]">job that is in demand.</span>
            </div>
            <div className=" w-full md:w-[40%] flex flex-col items-center text-center md:text-start md:items-start 
            justify-center gap-3 md:gap-6">
              <div className="text-base text-pure-greys-300">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton type={1} content={"Learn More"} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between w-full gap-5 md:gap-0">
            <div className="left  w-full md:w-[40%] flex flex-col items-start justify-center gap-5 md:gap-14">
              <div className="w-full flex flex-row items-center justify-center md:justify-start gap-4">
                <div
                  className="bg-[#ffffff] h-[50px] w-[50px] rounded-full flex flex-col items-center
                  justify-center text-[#1FA2FF]"
                >
                  <FaTrophy className="text-2xl" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1>Leadership</h1>
                  <p>Fully committed to the success company</p>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-center md:justify-start gap-4">
                <div
                  className="bg-white h-[50px] w-[50px] rounded-full flex flex-col items-center
                  justify-center text-[#EF476F]"
                >
                  <RiGraduationCapFill className="text-2xl" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1>Leadership</h1>
                  <p>Fully committed to the success company</p>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-center md:justify-start gap-4">
                <div
                  className="bg-white h-[50px] w-[50px] rounded-full flex flex-col items-center
                  justify-center text-[#05BF8E]"
                >
                  <FaTrophy className="text-2xl" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1>Leadership</h1>
                  <p>Fully committed to the success company</p>
                </div>
              </div>
              <div className="w-full flex flex-row items-center justify-center md:justify-start gap-4">
                <div
                  className="bg-white h-[50px] w-[50px] rounded-full flex flex-col items-center
                  justify-center text-[#E7C009]"
                >
                  <FaTrophy className="text-2xl" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h1>Leadership</h1>
                  <p>Fully committed to the success company</p>
                </div>
              </div>
            </div>
            <div className="right w-full md:w-[55%] relative flex flex-col items-center">
              <div className="h-[400px] w-full z-[20]">
                <img
                  src={TimelineImage}
                  alt=""
                  className="h-full w-full object-cover rounded-md"
                />
              </div>

              <div
                className="h-[150px] w-[150px] bg-[#05A77B] blur-3xl
                absolute top-20 left-[-15px] z-[10]"
              ></div>
              <div
                className="flex flex-row items-center justify-between w-[80%] bg-[#014A32] text-[#F9F9F9]
                px-8 py-6 absolute bottom-[-50px] rounded-sm z-[30]"
              >
                <div className="flex flex-row items-center justify-center gap-4 ">
                  <div className="text-base md:text-3xl font-semibold">10</div>
                  <div className="text-sm md:text-base flex flex-col items-start justify-center text-[#05A77B]">
                    <div>Years</div>
                    <div>Experience</div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center gap-4 ">
                  <div className="text-base md:text-3xl font-semibold">10</div>
                  <div className="text-sm md:text-base flex flex-col items-start justify-center text-[#05A77B]">
                    <div>Years</div>
                    <div>Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center gap-10 md:gap-20 py-10 md:pb-16 md:pt-20">
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl text-center md:text-start md:text-4xl font-medium">
              Your Swiss Knife{" "}
              <span className="text-[#1FA2FF]">for learning any language</span>
            </h1>
            <p className="text-base text-pure-greys-300 w-[60%] text-center">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <Card1 />
            {/* <Card1/> */}
            <Card2 />
            <Card3 />
          </div>

          <CTAButton type={1} content={"Learn More"} linkto={"/"} />
        </div>
      </div>

      <div
        className="relative mx-auto flex flex-col items-center text-white justify-between 
      gap-28 bg-richblack-900 w-full py-16 xl:py-20 px-5 xl:px-0"
      > 
        <div className="flex flex-col items-center justify-center w-full max-w-[1200px] mx-auto">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between pb-10 md:pb-16 gap-5">
          <div className="left h-[300px] sm:h-[500px] min-w-full md:min-w-[55%] max-w-[550px] relative">
            <div className="h-full w-full bg-white absolute z-10 bottom-4 right-4"></div>
            <img
              src={instructor}
              alt=""
              className="h-full w-full object-cover z-20 absolute"
            />
          </div>

          <div className="right flex flex-col w-full md:w-[40%] items-center md:items-start justify-center gap-3 md:gap-16">
            <div className="w-full flex flex-col items-start justify-center gap-3">
              <h1 className="text-3xl md:text-4xl w-full  md:w-[40%] text-center md:text-start
              ">Become an <span className="text-[#1FA2FF]">
                Instructor</span></h1>
              <p className="text-sm text-pure-greys-300 w-full text-center md:text-start md:w-[80%]">
                Instructors from around the world teach millions of students on
                StudyNotion. We provide the tools and skills to teach what you
                love.
              </p>
            </div>

            <CTAButton type={1} content={"Start teaching today"} linkto={'/'} arrow={true}/>
          </div>
        </div>

        <div className="flex flex-col w-full items-center justify-center gap-5 md:gap-14">
          <h1 className="text-3xl md:text-4xl font-medium text-pure-greys-5 
          text-center md:text-start">Review from other <span className="text-[#1FA2FF]">learners</span> </h1>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {reviews.map((ele)=>{
              return <ReviewCard key={ele.id} {...ele}/>
            })}
          </div>

          
        </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
