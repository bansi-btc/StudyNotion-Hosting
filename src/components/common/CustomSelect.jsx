import React, { useState } from 'react';

const CustomSelect = ({catarr, setcategoryvalue}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setcategoryvalue(e.target.value);
  };

  return (
    <div className="relative w-full bg-richblack-700">
      <select
        className="block appearance-none w-full bg-richblack-600 px-4 py-2 pr-8 rounded shadow leading-tight 
        focus:outline-none focus:shadow-outline text-richblack-100"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="" className='text-richblack-300'>Select an option</option>
        {catarr.map((ele)=>{
            return <option value={ele._id} key={ele._id}>{ele.name}</option>
        })}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.293 11.293a1 1 0 011.414 0l4 4a1 1 0 11-1.414 1.414l-3.297-3.297a.5.5 0 01-.138-.406V16a1 1 0 11-2 0v-3.586a.5.5 0 01-.138.406l-3.297 3.297a1 1 0 01-1.414-1.414l4-4zM10 0a1 1 0 011 1v8a1 1 0 11-2 0V1a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default CustomSelect;
