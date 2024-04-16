import React, { useEffect, useState } from "react";
import SideBar from "../components/common/SideBar";
import { Link, NavLink } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosStar } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { courses } from "../services/apis";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../slices/cartSlice";

const Cart = () => {
  const [tag, settag] = useState("all");

  // const {cart}=useSelector((state)=>state.cart);

  const [checkout, setcheckout] = useState(false);
  // const cart = [1];
  const {cart}=useSelector((state)=>state.cart);
  const {totalPrice}=useSelector((state)=>state.cart);
  // console.log(cart);
  console.log(totalPrice);
  const dispatch=useDispatch();

  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", totalPrice);
  }, [cart]);

  return (
    <div className="flex flex-row h-full w-full">
      <SideBar />
      {cart.length == 0 && (
        <div
          className="right w-[87%] h-[90vh] overflow-auto px-5 py-8 text-pure-greys-5 flex flex-col items-start
         justify-start gap-4
        pl-10 "
        >
          <div className="text-3xl font-semibold text-richblack-400">
            No Items in Cart
          </div>
          <div className="btn bg-[#FFD60A] py-1 px-4 text-center rounded-sm text-richblack-700">
            Go to Catalog
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <div
          className="right w-full md:w-[87%] z-[10] h-[90vh] overflow-auto px-5 py-8 text-pure-greys-5 flex flex-col items-start 
          justify-start gap-3 lg:gap-10 
          lg:pl-10 pl-5"
        >
          {/* <h1 className='text-white'>enrooled courses</h1> */}

          <div className="flex flex-row items-center justify-start gap-4 text-lg">
            <Link to={"/"}>
              <div>Home</div>
            </Link>
            <div>Dashboard</div>
            <div className={`${!checkout &&  'text-yellow-100'}`} onClick={()=>{setcheckout(false)}}>My Wishlist</div>
            {checkout && <div className={"text-yellow-100"}>Checkout</div>}
          </div>

          <h1 className="text-pure-greys-5 text-3xl font-medium">
            {!checkout?"My Wishlist":"Checkout"}
          </h1>

          <div className="w-full flex flex-col items-start justify-start gap-5">
            <p className="text-pure-greys-300 text-lg">{cart.length} courses in wishlist</p>

            <div
              className="w-full flex flex-col xl:flex-row items-center md:items-start justify-start gap-0 xl:gap-10
               relative "
            >
              {cart.length>3 && <div
                className="text-richblack-100 absolute bottom-0 left-0
              text-xl font-medium flex flex-col items-center justify-center w-full"
              >
                <div>Scroll Down</div>
                <div>
                  <FaChevronDown />
                </div>
              </div>}
              <div
                className="flex flex-col items-start justify-start gap-0   
                w-full xl:w-[60%] "
              >
                {cart.map((cou, idx)=>{
                  return <div key={idx}
                  className="w-full flex flex-col items-start lg:flex-row lg:items-start 
                  justify-between gap-3 lg:gap-14 h-full py-3 md:py-8 border-t 
                border-richblack-600 "
                > 
                <div className="flex w-full flex-col md:flex-row items-start justify-start gap-2 md:gap-10">
                  <div className="h-[100px] w-[120px] bg-richblack-500 lg:h-[150px] lg:w-[170px]  rounded-md"></div>
                  <div className="flex flex-col items-start justify-start md:justify-between md:h-full gap-2">
                    <h1 className="text-xl lg:text-2xl font-medium">
                      {cou.courseName}
                    </h1>
                    
                    <p className="text-pure-greys-300
                    text-sm md:text-base">{cou.instructor.firstName.toUpperCase()} {cou.instructor.lastName.toUpperCase()}</p>
                    <div className="flex flex-row items-center justify-start gap-3 text-sm lg:text-base">
                      <div className=" text-[#FFD60A]">4.5</div>
                      <div className="flex flex-row items-center justify-center gap-1">
                        <div>
                          <IoIosStar className=" text-[#FFD60A]" />
                        </div>
                        <div>
                          <IoIosStar className=" text-[#FFD60A]" />
                        </div>
                        <div>
                          <IoIosStar className=" text-[#FFD60A]" />
                        </div>
                        <div>
                          <IoIosStar className=" text-[#FFD60A]" />
                        </div>
                        <div>
                          <IoIosStar className=" text-[#FFD60A]" />
                        </div>
                      </div>
                      <div className="text-base">{`(Review Count)`}</div>
                    </div>
                    <div className="flex flex-row items-start justify-center gap-3 text-pure-greys-300">
                      <div>Total Courses</div>
                      <div>Lessons</div>
                      <div>Beginner</div>
                    </div>
                  </div>
                  </div>

                  <div className="flex flex-col items-start justify-start h-full gap-2 md:gap-6">
                    <div
                      className="bg-richblack-700 px-4 py-2 rounded-md border border-richblack-500
                        text-[#EF476F] flex flex-row items-center justify-center gap-2 text-sm md:text-xl cursor-pointer"
                    onClick={()=>{
                      // console.log(cou._id);
                      dispatch(removeItem(cou._id));
                    }}>
                      <div>
                        <RiDeleteBin6Line />
                      </div>
                      <div>Remove</div>
                    </div>
                    <div className="text-lg md:text-3xl tracking-wide font-medium text-[#FFD60A]">
                      Rs. {cou.price}
                    </div>
                  </div>
                </div>
                })}
                
               
               
              </div>

              {!checkout ? (
                <div
                  className="right w-[250px] bg-transparent rounded md
                border border-richblack-500 flex flex-col self-start items-start justify-center gap-1 px-5 py-5"
                >
                  <div className="text-base text-richblack-100">Total</div>
                  <div className="text-2xl font-medium text-[#FFD60A]">
                    Rs. {totalPrice}
                  </div>
                  <div>
                    <del>Rs. {totalPrice+5000}</del>
                  </div>

                  <div
                    className="btn bg-[#FFD60A] py-1 px-4 text-center rounded-sm
                    w-full self-center text-richblack-700"
                  onClick={()=>{setcheckout(true)}}>
                    Buy Now
                  </div>
                </div>
              ) : (
                <div
                  className="right max-w-[350px] bg-richblack-600 rounded md
                border border-richblack-500 flex flex-col items-start justify-center gap-3 px-5 py-5"
                >
                <div className="flex flex-col items-start justify-center gap-0">
                  <div className="text-base text-richblack-100">
                    Payment Details
                  </div>
                  <p className="text-sm text-richblack-200">
                    Complete your purchase details items and providing your
                    payment details to us .
                  </p>
                  </div>

                  <div className="border border-richblack-500 flex flex-col items-start justify-center
                  gap-2 w-full py-4 px-4">
                    <div className="flex flex-col items-start justify-center gap-1 w-full">
                        <label htmlFor="fullname " className="text-sm text-richblack-5">Full Name</label>
                        <input type="text" placeholder="Enter fullname" id="fullname" className="w-full
                        py-2 px-3 rounded-sm bg-richblack-700 focus:outline-none"/>

                    </div>
                    <div className="flex flex-col items-start justify-center gap-1 w-full">
                        <label htmlFor="email" className="text-sm text-richblack-5">Email Address</label>
                        <input type="text" placeholder="Enter Email Address" id="email" className="w-full
                        py-2 px-3 rounded-sm bg-richblack-700 focus:outline-none"/>

                    </div>

                    <div className="w-full h-[1px] my-4 bg-richblack-400"></div>

                    <div className="flex flex-row items-center justify-between w-full text-richblack-5">
                        <div>Total</div>
                        <div>Rs 1200</div>
                    </div>

                    <div
                    className="btn bg-[#FFD60A] py-1 px-4 text-center rounded-sm
                    w-full self-center text-richblack-700"
                  >
                    Pay Now
                  </div>

                  </div>

                  

                  
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
