import React, { useEffect, useState } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import CTAButton from '../core/HomePage/CTAButton'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { useDispatch, useSelector } from 'react-redux'
import auth from '../../reducer/index'
import profile from '../../reducer/index'
import cart from '../../reducer/index'
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropdown from '../core/auth/ProfileDropdown'
import { apiconnnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { setToken } from '../../slices/authSlice'
import { IoIosSearch } from "react-icons/io";
import { IoCart } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import toast from 'react-hot-toast'
import axios from 'axios'
// import { profile } from '../../services/apis'

const Navbar = () => {
    const location=useLocation();

    const {token}=useSelector((state) =>state.auth);
    const {user} =useSelector((state)=> state.profile);
    const {totalItems} =useSelector((state)=> state.cart);
    console.log(user);

    const [subLinks, setsubLinks] = useState([]);
    
    const fetchSubLinks=async()=>{
        try{
            // console.log(categories.CATEGORIES_API);
            const result = await apiconnnector("GET", categories.CATEGORIES_API);
            console.log(result.data.categories);
            setsubLinks(result.data.categories);
        }   
        catch(err){
            console.log(err.message);
        }
    }

    const [tokenValid, settokenValid] = useState(false);

    const fetchUser=async()=>{
        try{
            const formData=new FormData();
            console.log(token);
            if(!token){
                settokenValid(false);
                return;
            }
            formData.append("token", token);
            // axios
            const res=await axios.post("http://localhost:4000/api/v1/profile/userDetails", formData);
            // console.log("Bansi");
            // console.log(res.data);
            if(res?.data?.success){
                settokenValid(true);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    useEffect(()=>{
        fetchSubLinks();
        fetchUser();
    }, [token]);
    // console.log(user)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogout=async()=>{
        dispatch(setToken(null));
        localStorage.clear();
        navigate('/login');
        // settokenValid(false);
    }

    const [show, setshow] = useState(false);
    const [showcatalog, setshowcatalog] = useState(false);

    
  return (
    <div className='w-full bg-richblack-900 py-2 border-b-2 border-richblack-700 px-5 xl:px-0'>
        <div className='hidden w-full max-w-[1200px] mx-auto md:flex flex-row items-center justify-between text-pure-greys-5
        '>
            {/* <div>Logo</div> */}
            <img src={logo} alt="" />




            <div className='flex flex-row items-center justify-center gap-6 text-base'>
                {NavbarLinks.map((ele, index)=>{
                    return ele.title==="Catalog"?<div key={index} className='relative group'>
                      <div>Catalog</div>      
                      <div className='bg-pure-greys-5 flex-col items-start justify-center
                      px-5 py-5 absolute z-40 w-[200px] rounded-md gap-3 left-[-10px]
                      flex scale-y-0 group-hover:scale-y-100 transition-all duration-200 origin-top
                      top-8'>
                        {subLinks.map((ele, idx)=>{
                            return  <Link  key={idx} to={`/catalog/${ele._id}`}><div className='text-pure-greys-800
                            cursor-pointer'>{ele.name}</div></Link>
                        })}
                       
                       
                      </div>
                    </div>:
                    
                    
                    <NavLink to={ele.path}  key={index}>
                        {ele.title} </NavLink>
                })}
            </div>

            {/* {user && user?.accountType!=='Instructor' &&  (
                <Link to={'/dashboard/cart'} className='relative flex flex-row items-center justify-center
                gap-1'>
                    <FaShoppingCart />
                    {totalItems>0 && <span>totalItems</span>}
                </Link>
            )} */}

            {!tokenValid && <div className='flex flex-row items-center justify-center gap-4'>
                <Link to={'/login'}><button className="btn bg-richblack-700 px-4 py-2 rounded-md border
                border-pure-greys-500">Log In</button></Link>
                <Link to={'signup'}><button className="btn bg-richblack-700 px-4 py-2 rounded-md border
                border-pure-greys-500">Singup</button></Link>
            </div>}
            {tokenValid && <div className='flex flex-row items-center justify-center gap-3 text-richblack-25'>
                {/* componet */}
                {/* <ProfileDropdown/> */}
                <IoIosSearch className='text-2xl' />
                <Link to={'/dashboard/cart'}>
                <IoCart className='text-2xl' />
                </Link>
                <Link to={'/dashboard/my-profile'}>
                <div className='h-[30px] w-[30px] rounded-full overflow-hidden'>
                    <img src={user?.image} alt="" />
                </div>
                </Link>
                {/* <button className="btn bg-richblack-700 px-4 py-2 rounded-md border
                border-pure-greys-500" onClick={handleLogout}>Log Out</button> */}
                {/* <Link to={'/dashboard/my-profile'}><button className="btn bg-richblack-700 px-4 py-2 rounded-md border
                border-pure-greys-500">Dashboard</button></Link> */}
            </div>}


        </div>
        <div className=' w-full max-w-[1200px] py-1 gap-2 mx-auto flex flex-col md:hidden items-center justify-between text-pure-greys-5
        '>
            {/* <div>Logo</div> */}
            <div className='flex flex-row items-center justify-between px-5 md:px-20 w-full'>
            <img src={logo} alt="" />
            <div onClick={()=>{setshow(!show)}}>
                {show?
                <IoCloseSharp className="text-2xl"/>:
                <GiHamburgerMenu className="text-xl" />}
            </div>

            </div>




            <div className={`${show?"flex":"hidden"} flex flex-row items-center justify-center gap-6 text-base`}>
                {NavbarLinks.map((ele, index)=>{
                    return ele.title==="Catalog"?<div key={index} className='relative group'>
                      <div onClick={()=>{setshowcatalog(!showcatalog)}} >Catalog</div>      
                      <div className={`bg-pure-greys-5 flex-col items-start justify-center
                      px-5 py-5 absolute z-40 w-[200px] rounded-md gap-3 left-[-10px]
                      flex ${showcatalog?"scale-y-100":"scale-y-0"} md:scale-y-0 md:group-hover:scale-y-100 
                      transition-all duration-200 origin-top
                      top-8`}>
                        {subLinks.map((ele, idx)=>{
                            return  <Link  key={idx} to={`/catalog/${ele._id}`}><div className='text-pure-greys-800
                            cursor-pointer'>{ele.name}</div></Link>
                        })}
                       
                       
                      </div>
                    </div>:
                    
                    
                    <NavLink to={ele.path}  key={index}>
                        {ele.title} </NavLink>
                })}
            </div>

            {/* {user && user?.accountType!=='Instructor' &&  (
                <Link to={'/dashboard/cart'} className='relative flex flex-row items-center justify-center
                gap-1'>
                    <FaShoppingCart />
                    {totalItems>0 && <span>totalItems</span>}
                </Link>
            )} */}

            {!tokenValid && <div className={`${show?"flex":"hidden"} flex-row items-center justify-center gap-4`}>
                <Link to={'/login'}><button className="btn bg-richblack-700 px-4 py-2 rounded-md border
                border-pure-greys-500">Log In</button></Link>
                <Link to={'signup'}><button className="btn bg-richblack-700 px-4 py-2 rounded-md border
                border-pure-greys-500">Singup</button></Link>
            </div>}
            {tokenValid && <div className={`${show?"flex":"hidden"} flex-row items-center justify-center gap-3 text-richblack-25`}>
                {/* componet */}
                {/* <ProfileDropdown/> */}
                <IoIosSearch className='text-2xl' />
                <Link to={'/dashboard/cart'}>
                <IoCart className='text-2xl' />
                </Link>
                <Link to={'/dashboard/my-profile'}>
                <div className='h-[30px] w-[30px] rounded-full overflow-hidden'>
                    <img src={user?.image} alt="" />
                </div>
                </Link>
                {/* <button className="btn bg-richblack-700 px-4 py-2 rounded-md border
                border-pure-greys-500" onClick={handleLogout}>Log Out</button> */}
                {/* <Link to={'/dashboard/my-profile'}><button className="btn bg-richblack-700 px-4 py-2 rounded-md border
                border-pure-greys-500">Dashboard</button></Link> */}
            </div>}


        </div>
    </div>
  )
}

export default Navbar