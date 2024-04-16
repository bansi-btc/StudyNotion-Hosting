import React from 'react'
import { ImSpinner9 } from "react-icons/im";
import { FiWatch } from "react-icons/fi";
import { RiComputerFill } from "react-icons/ri";

const Card1 = () => {
  return (
    <div className='h-[280px] w-[300px] rounded-sm flex flex-col items-start justify-start gap-6
     bg-white shadow-md shadow-pure-greys-100 rotate-12 
    '>
        <h1 className='bg-[#B4DAEC]
        py-3 px-5 w-full text-base text-[#0A5A72]'>Know Your Progress</h1>

        <div className='w-full flex flex-col items-start justify-center gap-4 px-5'>
            <h1 className='text-2xl font-medium leading-[0rem] flex flex-row items-center
            justify-center gap-3'>
                <RiComputerFill className='text-3xl' />
                <div>HTML</div>
            </h1>
            <p className='text-pure-greys-300'>Your Current League</p>

            <div className='flex flex-row items-center justify-center gap-3'>
                <div className='h-[110px] w-[120px] border border-pure-greys-50 flex flex-col items-start
                justify-between gap-2 rounded-md px-1 py-3'>
                    <div><ImSpinner9 className='text-xl text-[#1FA2FF]' /></div>
                    <div className='font-medium text-2xl leading'>420</div>
                    <div className='text-sm text-pure-greys-300'>Spin earned</div>

                </div>
                <div className='h-[110px] w-[120px] border border-pure-greys-50 flex flex-col items-start
                justify-between gap-2 rounded-md px-1 py-3'>
                    <div><FiWatch className='text-xl'/></div>
                    <div className='font-medium text-2xl'>1240</div>
                    <div className='text-sm text-pure-greys-300'>minutes in app</div>

                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Card1