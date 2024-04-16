import React from 'react'

const Card2 = () => {
  return (
    <div className='h-[340px] w-[290px] rounded-sm flex flex-col items-start justify-start gap-8
     bg-white shadow-md shadow-pure-greys-100 rotate-[-12deg] 
    '>
        <h1 className='bg-[#FBC7D1]
        py-3 px-5 w-full text-base text-[#4F0A25]'>Compare with others</h1>

        <div className='flex flex-col items-start justify-start gap-4 px-5 text-pure-greys-600'>
            <div className='text-lg font-medium flex flex-row items-center justify-center
            gap-3'>
              <div className='h-[40px] w-[40px] rounded-full'>
                <img src="user1.avif" alt="" className=''/>
              </div>
              <div>Wade Warren</div>
            </div>
            <div className='text-lg font-medium flex flex-row items-center justify-center
            gap-3'>
              <div className='h-[40px] w-[40px] rounded-full'>
                <img src="user2.avif" alt="" className=''/>
              </div>
              <div>Jane Cooper</div>
            </div>
            <div className='text-lg font-medium flex flex-row items-center justify-center
            gap-3'>
              <div className='h-[40px] w-[40px] rounded-full'>
                <img src="user3.avif" alt="" className=''/>
              </div>
              <div>Eleanor Pena</div>
            </div>
            <div className='text-lg font-medium flex flex-row items-center justify-center
            gap-3'>
              <div className='h-[40px] w-[40px] rounded-full'>
                <img src="user1.avif" alt="" className=''/>
              </div>
              <div>Ralph Edwards</div>
            </div>
            
        </div>
    </div>
  )
}

export default Card2