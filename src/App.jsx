import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import { Provider, useDispatch, useSelector } from 'react-redux'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import EnrolledCourses from './pages/EnrolledCourses'
import EditProfile from './pages/EditProfile'
import Cart from './pages/Cart'
import MyCourse from './pages/MyCourse'
import CreateCourse from './pages/CreateCourse'
import CategoryPage from './pages/CategoryPage'
import CoursePage from './pages/CoursePage'
import CourseContent from './pages/CourseContent'
import PurchaseHistory from './pages/PurchaseHistory'
import { setToken } from './slices/authSlice'
import { setLogoutModal } from './slices/profileSlice'
import ContactUsForm from './components/common/ContactUsForm'
import ContactPage from './pages/ContactPage'



const App = () => {

  
  useEffect(()=>{
    // localStorage.clear();
  }, [])

  // const [logoutModal, setlogoutModal] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const{logoutModal}=useSelector((state)=>state.profile);
  
  
  // console.log(logoutModal)
  return (
    <div className='w-full min-h-screen flex flex-col font-inter overflow-x-hidden bg-richblack-900 h-screen relative'>
     
     <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      {/* <ProtectedRoute exact path="/signup" component={<SignUp/>} /> */}

      {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/update-password/:token' element={<UpdatePassword/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/dashboard/my-profile' element={<MyProfile/>}/>
      <Route path='/dashboard/edit-profile' element={<EditProfile/>}/>
      <Route path='/dashboard/enrolled-courses' element={<EnrolledCourses/>}/>
      <Route path='/dashboard/cart' element={<Cart/>}/>
      <Route path='/dashboard/purchase-history' element={<PurchaseHistory/>}/>
      <Route path='/dashboard/my-courses' element={<MyCourse/>}/>
      <Route path='/dashboard/create-course' element={<CreateCourse/>}/>
      <Route path='/dashboard/purchase' element={<CreateCourse/>}/>
      <Route path='/catalog/:id' element={<CategoryPage/>}/>
      <Route path='/course/:id' element={<CoursePage/>}/>
      <Route path='/view-course/:id' element={<CourseContent/>}/>
      <Route path='/contact' element={<ContactPage/>}/>
      

    </Routes>

    <div className={`w-[250px] md:w-[320px] absolute border border-richblack-300 left-[50%] top-[50%]
    translate-x-[-50%] translate-y-[-50%] rounded-sm bg-transparent backdrop-blur-xl py-4 md:pt-6 md:pb-10 px-6 origin-center
    transition-all duration-300 flex flex-col items-start justify-start gap-3 z-30 
    ${logoutModal?"scale-y-100":"scale-y-0"}`}>
      <h1 className='text-richblack-5 text-lg md:text-2xl'>You will be logged out of the account</h1>

      <div className='w-full flex flex-row items-center justify-start gap-3'>
        <div className='text-base md:text-lg bg-[#FFD60A] px-5 py-1 rounded-sm cursor-pointer'
        onClick={()=>{
          dispatch(setToken(null));
          dispatch(setLogoutModal(false));
          localStorage.clear();
          navigate('/login');
        }}>Confirm</div>
        <div className='text-base md:text-lg bg-richblack-700 border border-richblack-500 text-richblack-5
         px-5 py-1 rounded-sm cursor-pointer' onClick={()=>{dispatch(setLogoutModal(false))}}>Cancel</div>
        {/* <div>Cancel</div> */}
      </div>
      
    </div>
    </div>
  )
}

export default App