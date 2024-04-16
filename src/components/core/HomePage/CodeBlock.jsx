import React from "react";
import CTAButton from "./CTAButton";
import { FaArrowRightLong } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

const CodeBlock = ({type, heading, text, btn1, btn2}) => {

  
  return (
    <div className={`codesection1 flex  flex-col md:flex-row items-center justify-between w-full pt-5
    md:px-10 xl:px-0`}>
      <div className="left w-[100%]  md:w-[40%] flex flex-col items-start justify-between md:gap-14 gap-3">
        <div className="flex flex-col items-start justify-center gap-2">
          {type===1 && <h1 className="text-3xl md:text-4xl w-[100%]">
            Unlock your{" "}
            <span className="text-[#1FA2FF]">coding potential</span>{" "}
            with our online courses.
          </h1>}
          {type===2 && <h1 className="text-3xl md:text-4xl w-[100%]">
            Start{" "}
            <span className="text-[#1FA2FF]">coding in seconds</span>{" "}
          </h1>}
          <p className="text-pure-greys-400 text-sm">
          {text}
          </p>

        </div>

        <div className="btns flex flex-row items-center justify-start gap-4 pb-5">
          
          <div className="relative flex flex-row items-center justify-between">

          <CTAButton type={btn1.type} content={btn1.text} linkto={'/'} arrow={true}/>
          </div>

          <CTAButton type={btn2.type} content={btn2.text} linkto={'/'}/>
        </div>
      </div>

      <div className="right w-[100%] md:w-[44%] text-sm text-[#1FA2FF] bg-richblue-800 py-10 rounded-md
       bg-gradient-to-tr from-richblack-900 to-richblack-800 shadow-sm shadow-pure-greys-500 relative">
        <div className="flex flex-col items-start justify-center gap-0 pl-10 z-[-10]">
          <div>{`‹IDOCTYPE html>`}</div>
          <TypeAnimation
          sequence={[
          // Same substring at the start will only be typed out once, initially
          'headsetitle>Examples/',
          1000,
          '', // wait 1s before replacing "Mice" with "Hamsters"
          1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          />
          <div className="text-[#ff5555]">{` title»clinkrel="stylesheet"href="styles.css">`}</div>
          <div>{`/head»`}</div>
          <div>{`body>`}</div>
          <div>{`FIll x + 47`}</div>
          <div>{` h1>cahref="/">Headera/ay`}</div>
          <div>{`/h1>`}</div>
          <div>{`nav«ahref="one/"»One«/a><ahref="two/">Two</`}</div>
          <div>{` a><ahref="three/"›Three</a>`}</div>
        </div>
        
        
       {type===1 && <div className={`h-[100px] w-[100px] rounded-full bg-yellow-100 blur-3xl absolute top-3 left-16 z-10`}></div>}
      </div>
    </div>
  );
};

export default CodeBlock;
