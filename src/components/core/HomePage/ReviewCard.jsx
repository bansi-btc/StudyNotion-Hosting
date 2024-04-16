import React from "react";
import { IoStar } from "react-icons/io5";

const ReviewCard = ({name, email, review, rating}) => {
    // const rating=4.5;
  return (
    <div className="h-[160px] w-[260px] flex flex-col items-start justify-start gap-3 bg-richblack-800
    py-5 rounded-sm ">
      <div className="flex flex-row items-center justify-center gap-3 px-3">
        <div className="h-[40px] w-[40px] bg-black rounded-full"></div>
        <div className="flex flex-col items-start justify-center gap-0">
            <div className="text-base">{name}</div>
            <div className="text-pure-greys-300 text-xs">{email}</div>
        </div>
      </div>
      <p className="text-xs text-pure-greys-5 px-5">
        {review}
      </p>
      <div className="text-sm px-5 flex flex-row items-center justify-start gap-2">
        <div className="text-[#FFD60A]">{rating}</div>
        <div className="flex flex-row items-center justify-start gap-1">
        <IoStar className={`${rating>=1?"text-[#FFD60A]":""}`}/>
        <IoStar className={`${rating>=2?"text-[#FFD60A]":""}`}/>
        <IoStar className={`${rating>=3?"text-[#FFD60A]":""}`}/>
        <IoStar className={`${rating>=4?"text-[#FFD60A]":""}`}/>
        <IoStar className={`${rating>=5?"text-[#FFD60A]":""}`}/>
        
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
