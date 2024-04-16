import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";

const CourseCard = ({heading, content, type}) => {
  return (
    <div className={`h-[250px] w-[300px] rounded-sm  flex flex-col items-start justify-between py-3 z-20
    shadow-md shadow-pure-greys-500 ${type===1?"bg-[#fafafa]":"bg-richblack-700"}`}>
        <div className='flex flex-col items-start justify-center gap-3 px-5'>
        <h1 className={`${type===1?"text-black":"text-white"} text-2xl`}>{heading}</h1>
        <p className='text-base text-pure-greys-300'>{content}</p>
        </div>

        <div className="btns w-full flex flex-row items-center justify-between text-[#1FA2FF] border-t-2 border-dashed pt-3 px-5 text-base">
            <div className='flex flex-row items-center justify-center gap-2'>
            <FaUserFriends />
            <div>Beginner</div>
            </div>
            <div className='flex flex-row items-center justify-center gap-2'>
            <MdPlayLesson />
            <div>6 Lessons</div>
            </div>
        </div>

    </div>
  )
}

export default CourseCard