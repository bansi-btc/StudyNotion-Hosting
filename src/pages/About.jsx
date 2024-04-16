import React from "react";
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import founder from "../assets/Images/FoundingStory.png";
import CTAButton from "../components/core/HomePage/CTAButton.jsx";
import ContactUsForm from "../components/common/ContactUsForm.jsx";
import Footer from '../components/common/Footer.jsx'

const About = () => {
  return (
    <div className="w-full h-full">
      <div className="section1 w-full max-w-[1200px] mx-auto flex flex-col items-center justify-start gap-8 md:gap-14 py-5 md:py-10 px-5
      xl:px-0">
        <div className="w-full flex flex-col items-center justify-start gap-4">
          <h1 className="text-3xl md:text-4xl font-medium text-center text-pure-greys-5 w-[60%]">
            Driving Innovation in Online Education for a{" "}
            <span>Brighter Future</span>
          </h1>
          <p className="text-sm md:text-base text-pure-greys-300 text-center w-[60%]">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </div>

        <div className="flex flex-row items-center justify-center gap-5 w-full flex-wrap">
          <div className="h-[200px] md:h-[300px] overflow-hidden">
            <img
              src={image1}
              alt=""
              className="h-full w-full object-cover rounded-sm"
            />
          </div>
          <div className="h-[200px] md:h-[300px] overflow-hidden">
            <img
              src={image2}
              alt=""
              className="h-full w-full object-cover rounded-sm"
            />
          </div>
          <div className="h-[200px] md:h-[300px] overflow-hidden">
            <img
              src={image3}
              alt=""
              className="h-full w-full object-cover rounded-sm"
            />
          </div>
        </div>

        <div className=" text-3xl text-center text-pure-greys-5 leading-[3rem] font-medium px-5 xl:px-0">
          {/* <ImQuotesRight className="absolute right-0 bottom-0" />   */}
          <span className="relative">
            We <ImQuotesLeft className="absolute left-[-50px] top-[-15px]" />
          </span>{" "}
          are passionate about revolutionizing the way we learn. Our innovative
          platform <span className="text-[#1FA2FF]">combines technology</span>,{" "}
          <span className="text-[#F09819]">expertise</span>, and community to
          create an{" "}
          <span className="text-[#E65C00]">
            unparalleled educational{" "}
            <span className="relative">
              experience.
              <ImQuotesRight className="absolute right-[-50px] top-[-15px] text-pure-greys-5" />
            </span>
          </span>
        </div>
      </div>

      <div className="section2 w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between pt-0 md:py-10 px-5 xl:px-0
      gap-10 md:gap-0">
        <div className="left w-full md:w-[38%] flex flex-col items-start justify-start gap-6">
          <h1 className="text-4xl font-medium text-[#F09819]">
            Our Founding Story{" "}
          </h1>
          <div className="flex flex-col items-start justify-center gap-2 w-full text-base text-pure-greys-300">
            <p>
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p>
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
        </div>

        <div className="right h-[280px] overflow-hidden">
          <img
            src={founder}
            alt=""
            className="h-full w-full object-cover rounded-sm"
          />
        </div>
      </div>

      <div className="section3 w-full max-w-[1200px] mx-auto flex flex-col md:flex-row items-baseline
      md:items-center justify-between pb-20 pt-5 md:pt-0 px-5 xl:px-0 gap-5 md:gap-0">
        <div className="flex flex-col items-center md:items-start justify-center gap-4 w-full md:w-[38%]">
          <h1 className="text-4xl font-medium text-[#E65C00] ">Our Vision</h1>
          <p className="text-base text-pure-greys-300 text-center md:text-start">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-start justify-center gap-4 w-full md:w-[38%]">
          <h1 className="text-4xl font-medium text-[#1FA2FF]">Our Mission</h1>
          <p className="text-base text-pure-greys-300 text-center md:text-start">
            our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>
      </div>

      <div className="w-full bg-richblack-700 py-10 md:py-20">
        <div className="flex flex-row w-full max-w-[1200px] mx-auto items-center justify-around">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-xl md:text-3xl font-semibold text-pure-greys-5">5K</div>
            <p className="text-balance text-pure-greys-300">Active Students</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="text-xl sm:text-3xl font-semibold text-pure-greys-5 flex flex-row items-center
          justify-center"
            >
              <div>10</div>
              <div> +</div>
            </div>
            <p className="text-balance text-pure-greys-300">Mentors</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-xl sm:text-3xl font-semibold text-pure-greys-5">200+</div>
            <p className="text-balance text-pure-greys-300">Active Students</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="text-xl sm:text-3xl font-semibold text-pure-greys-5">50+</div>
            <p className="text-balance text-pure-greys-300">Awards</p>
          </div>
        </div>
      </div>

      <div className="section4 w-full max-w-[1200px] mx-auto flex flex-col xl:flex-row justify-between items-start py-10 px-5 xl:px-0">
        <div className="left w-full xl:w-[40%] flex flex-col items-start justify-center md:h-[250px] gap-3">
          <h1 className="text-4xl font-medium text-pure-greys-5">
            World-Class Learning for{" "}
            <span className="text-[#1FA2FF]">Anyone, Anywhere</span>
          </h1>
          <p className="text-pure-greys-300">
            Studynotion partners with more than 275+ leading universities and
            companies to bring flexible, affordable, job-relevant online
            learning to individuals and organizations worldwide.
          </p>

          <CTAButton type={1} content={"Learn More"} linkto={"/"} />
        </div>

        <div className="right flex gap-8 xl:gap-0 flex-row items-center justify-center flex-wrap w-full xl:w-[50%] relative mt-5">
          <div className="h-[300px] w-[300px] bg-richblack-700 flex flex-col px-4">
            <div className="h-[100px] py-10 w-[70%]">
              <h1 className="text-pure-greys-5 font-medium text-lg">
                Curriculum Based on Industry Needs
              </h1>
            </div>

            <div className="pt-5 text-pure-greys-300">
              <p>
                Save time and money! The Belajar curriculum is made to be easier
                to understand and in line with industry needs.
              </p>
            </div>
          </div>
          <div className="h-[300px] w-[300px] bg-richblack-800 px-4">
            <div className="h-[100px] py-10 w-[70%]">
              <h1 className="text-pure-greys-5 font-medium text-lg">
                Our Learning Methods
              </h1>
            </div>

            <div className="pt-5 text-pure-greys-300">
              <p>The learning process uses the namely online and offline.</p>
            </div>
          </div>
          <div className="h-[300px] w-[300px] bg-richblack-800 px-4 ">
            <div className="h-[100px] py-10 w-[70%]">
              <h1 className="text-pure-greys-5 font-medium text-lg">
                Rating "Auto-grading"
              </h1>
            </div>

            <div className="pt-5 text-pure-greys-300">
              <p>
                You will immediately get feedback during the learning process
                without having to wait for an answer or response from the
                mentor.
              </p>
            </div>
          </div>
          <div className="h-[300px] w-[300px] bg-richblack-700 px-4">
            <div className="h-[100px] py-10 w-[70%]">
              <h1 className="text-pure-greys-5 font-medium text-lg">
                Ready to Work
              </h1>
            </div>

            <div className="pt-5 text-pure-greys-300">
              <p>
                Connected with over 150+ hiring partners, you will have the
                opportunity to find a job after graduating from our program.
              </p>
            </div>
          </div>
          <div className="h-[300px] w-[300px] bg-richblack-700  xl:absolute bottom-0 left-[-300px] px-4">
            <div className="h-[100px] py-10 w-[70%]">
              <h1 className="text-pure-greys-5 font-medium text-lg">
              Certification
              </h1>
            </div>

            <div className="pt-5 text-pure-greys-300">
              <p>
              You will get a certificate that can be used as a certification during job hunting.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto pb-10 px-5 xl:px-0">
        <div className="max-w-[500px] mx-auto flex flex-col items-center justify-center gap-8">
          <div className="w-fu
           flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl text-pure-greys-5 font-semibold">Get in touch</h1>
            <p className="text-pure-greys-300 text-center md:text-start">We'd love to here for you, Please fill out this form.</p>
           </div>

           <div className="w-full">
              <ContactUsForm/>
           </div>
        </div>
      </div>

      <div className="w-full">
        <Footer/>
      </div>
    </div>
  );
};

export default About;
