import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaFileArchive } from "react-icons/fa";

const CustomFileInput = ({  gotFile,gotFile2, label, typee }) => {
  const fileInputRef = useRef(null);
  const [thumbnailFile, setthumbnailFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileType, setfileType] = useState(null)

  // console.log(thumbnailFile);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        // console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
    if(typee===1){

      gotFile(file);
    }
    else{
      gotFile2(file);
    }
    // console.log(fileInputRef);
    setthumbnailFile(file);
    // console.log(typeof file.type);
    // console.log(file.type.split('/').at(0));
    setfileType(file.type.split('/').at(0));
    // console.log(file.type);

  };

  return (
    <div className='w-full flex flex-col items-start justify-start pb-2  gap-1'>
      <label htmlFor="thumbnail" className='text-richblack-5'>{label}</label>
    {!thumbnailFile && <div className="w-full bg-richblack-600 min-h-[180px] gap-1 flex flex-col items-center justify-center">
        
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      
        {!thumbnailFile && <FaCloudUploadAlt onClick={handleButtonClick}
        className="text-3xl text-[#FFD60A] cursor-pointer" />}
        {thumbnailFile && <div onClick={handleButtonClick} className='bg-richblack-400 px-4 py-1 
        rounded-sm flex flex-row items-center justify-center gap-2 text-richblack-5 cursor-pointer'>
          <div><FaFileArchive /></div>
          <div>{thumbnailFile.name}</div>
          </div>}

      {!thumbnailFile && <div className='text-base text-richblack-200'>Browse File</div>}
      <div className='text-base text-richblack-200'>Max 6mb</div>
      <div className='text-base text-richblack-200 w-[80%] mx-auto flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center justify-start gap-2'>
            <div className='h-[6px] w-[6px] rounded-full bg-richblack-200'></div>
            <div>Aspect ratio 16:9</div>
            </div>
        <div className='flex flex-row items-center justify-start gap-2'>
            <div className='h-[6px] w-[6px] rounded-full bg-richblack-200'></div>
            <div>Recommended size</div>
            </div>
        
      </div>

      
      
    </div>}
    {thumbnailFile && <div className='h-[150px]  object-cover overflow-hidden flex flex-col items-center justify-center w-full'>

    {fileType==='image' && <img src={previewImage} alt="" className='h-full'/>}
    {fileType==='video' && <video src={previewImage} className='h-full'></video>}
    
    </div>}
    {thumbnailFile && <div className='self-center text-sm text-richblack-5' onClick={()=>{setthumbnailFile(null)}}>Cancel</div>}
    </div>
  );
};

export default CustomFileInput;