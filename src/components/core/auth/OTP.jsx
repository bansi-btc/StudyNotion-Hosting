import React, { useState, useRef, useEffect } from 'react';

const OTP = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = Array.from({ length }, () => useRef(null));

  const handleInput = (index, e) => {
    const input = e.target;
    const nextInput = inputs[index + 1];
    
    input.value = input.value.replace(/\D/g, ''); // Allow only digits

    if (input.value.length === 1 && nextInput) {
      nextInput.current.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = input.value;
    setOtp(newOtp);

    if (newOtp.every((value) => value !== '')) {
      onComplete(newOtp.join(''));
    }
    // console.log(otp);
  };

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && index !== 0) {
      inputs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    if (otp.every((value) => value !== '')) {
      onComplete(otp.join(''));
    }
  }, [otp, onComplete]);

  return (
    <div className='w-[100%] mx-auto flex flex-row items-center justify-between'>
      {inputs.map((inputRef, index) => (
        <input
        className='bg-richblack-600 py-2 px-2 h-[50px] w-[50px]
        flex flex-col items-center justify-center text-center focus:outline-none rounded-md'
          key={index}
          type="text"
          maxLength="1"
          autoFocus={index === 0}
          ref={inputRef}
          onInput={(e) => handleInput(index, e)}
          onKeyDown={(e) => handleBackspace(index, e)}
          style={{ marginRight: '5px', width: '40px', height: '40px', fontSize: '16px' }}
        />
      ))}
    </div>
  );
};

export default OTP;
