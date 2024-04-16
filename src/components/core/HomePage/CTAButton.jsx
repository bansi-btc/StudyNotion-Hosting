import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";

const CTAButton = ({type, content, linkto, arrow}) => {
  return (
    <Link to={linkto}>
    <button className={`btn1 z-20 ${type===1?"bg-[#FFD60A]":"bg-richblack-900"}
      text-black py-3 px-3 rounded-md text-sm ${type===1?"text-black":"text-white"} ${type!==1?"border border-pure-greys-400":""}
      transition-all duration-300 hover:scale-95 flex flex-row items-center justify-between gap-4`}>
        <div>{content}</div>
        {arrow && <div><FaArrowRightLong/></div>}
        </button>
        </Link>
  )
}

export default CTAButton