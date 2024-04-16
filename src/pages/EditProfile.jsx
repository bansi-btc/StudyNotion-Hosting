import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../components/common/Dropdown";
import SideBar from "../components/common/SideBar";
import { auth, profile } from "../services/apis";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../slices/profileSlice";
import { setUserDetails } from "../slices/authSlice";

const EditProfile = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const items = ["Developer", "Other", "Teacher", "Merchant"];

  const [deleteModal, setdeleteModal] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const navigate=useNavigate();
  

  const updateDate = async (gender, about, dateOfBirth) => {};
  const onSubmit = async (data) => {
    console.log(data);
    toast.loading("Loading");
    try {
      const gender = data.gender;
      const about = data.about;
      const dateOfBirth = data.dob;
      const contactNumber = data.phoneno;
      const name = data.displayname;
      const password = data.password;
      const newPassword = data.newpassword;

      if (password || newPassword) {
        // if(password!==newPassword){
        //   toast.error("Password did not match");
        //   return;
        // }

        const email = user.email;

        const res = await fetch(auth.CHANGE_PASSWORD, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // specify the content type
            token: token,
            // add any other headers as needed
          },
          body: JSON.stringify({
            email,
            password,
            newPassword,
          }),
        });

        const output = await res.json();

        if (!output.success) {
          useToasterStore.remove();
          toast.error(output.message);
          return;
        }
      }

      const names = name.split(" ");

      if (names.length != 2) {
        toast.error("Enter full name");
        return;
      }

      const firstName = names[0];
      const lastName = names[1];

      const res = await fetch(profile.UPDATE_PROFILE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // specify the content type
          token: token,
          // add any other headers as needed
        },
        // body: JSON.stringify({
        //     "otp":otp,
        //     "firstName":formData.firstname,
        //     "lastName":formData.lastname,
        //     "email":formData.email,
        //     "password":formData.password,
        //     "confirmPassword":formData.confirmpassword,
        //     "accountType":role,
        // }),
        body: JSON.stringify({
          gender,
          about,
          dateOfBirth,
          contactNumber,
          token,
          firstName,
          lastName,
        }),
      });
      const output = await res.json();

      console.log(output);

      if (!output.success) {
        toast.error(output.message);
        return;
      }
      toast.remove();

      toast.success(output.message);

      // dispatch(setUser(output.updatedProfile));
      // localStorage.setItem("user", JSON.stringify(output.updatedProfile));
      // output.
      localStorage.setItem("user", JSON.stringify(output.updatedUser));
      console.log(output.updatedUser);
      dispatch(setUser(output.updatedUser));
    } catch (err) {
      console.log(err.message);
    }
  };
  // console.log(user.additionalDetails.image);

  const handleDelete=async()=>{
    try{
      console.log(profile.DELETE_ACCOUNT_API);
      const res=await fetch(profile.DELETE_ACCOUNT_API, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // specify the content type
          token: token,
          // add any other headers as needed
        },
        // body: JSON.stringify({
        //     "otp":otp,
        //     "firstName":formData.firstname,
        //     "lastName":formData.lastname,
        //     "email":formData.email,
        //     "password":formData.password,
        //     "confirmPassword":formData.confirmpassword,
        //     "accountType":role,
        // }),
        body: JSON.stringify({
          token,
        }),
      })

      const output=await res.json();

      if(!output.success){
        toast.error(output.message);
        setdeleteModal(false);
        return;
      }

      localStorage.clear();
      // localStorage.removeItem("userDetails");
      // localStorage.removeItem("token");
      navigate('/login');
    }
    catch(err){
      console.log((err.message));
    }
  }
  // useEffect(() => {
  //   if(!user){
  //     navigate
  //   }
  // },[]);


  return (
    <div className="flex flex-row h-full w-full ">
      <SideBar />
      <div className=" pt-20 px-5 md:px-[100px] h-[90vh] overflow-auto flex flex-col items-start justify-start gap-10 
      w-full lg:w-[87%] relative 
       ">
        <div className="border border-richblack-700 flex flex-row items-center justify-between
         bg-richblack-800 rounded-md py-8 px-10 w-full xl:w-[60%] text-pure-greys-300">
          <div className="left flex flex-row items-center justify-center gap-4">
            <img src="" alt="" />
            <div className="h-[65px] w-[65px] rounded-full overflow-hidden">
              <img src={user?.image} alt="" className="h-full w-full object-cover"/>
            </div>
            <div className="flex flex-col items-start justify-center gap-2 text-pure-greys-25">
              <div>Change Profile Picture</div>
              <div className="flex flex-row items-center justify-center gap-2">
                <div className="btn bg-[#FFD60A] text-richblack-800 px-5 py-1 rounded-md">
                  Change
                </div>
                <div
                  className="btn bg-richblack-900  text-pure-greys-25 px-5 py-1 rounded-md border
                    border-richblack-600"
                >
                  Remove
                </div>
              </div>
            </div>
          </div>

          {/* <button className="btn bg-[#FFD60A] text-richblack-800 px-8 py-2 rounded-md">
            Edit
          </button> */}
        </div>
        <div
          className=" border border-richblack-700  bg-richblack-800 rounded-md py-10 px-4 md:px-10 w-full xl:w-[60%] 
          flex flex-col items-center justify-start gap-5 relative"
        >
          {/* <div></div> */}
          <div className="text-xl text-pure-greys-5 self-start">
            Profile Information
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start justify-start w-full gap-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
              <div className="flex flex-col items-start justify-center gap-1 w-full text-base">
                <label htmlFor="displayname" className="text-pure-greys-300">
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  id="displayname"
                  className="text-pure-greys-5 py-3 h-[40px] px-4 bg-richblack-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none"
                  name="displayname"
                  {...register("displayname", { required: true })}
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-1 w-full text-base">
                <label htmlFor="profession" className="text-pure-greys-300">
                  Profession
                </label>
                <select
                  name="languages"
                  id="profession"
                  className="text-pure-greys-5 py-3 px-4 bg-richblack-700 rounded-md w-full 
                     shadow-sm shadow-pure-greys-100
                    focus:outline-none h-[40px]"
                  {...register("profession", { required: true })}
                >
                  <option value="developer">Developer</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
              <div className="flex flex-col items-start justify-center gap-1 w-full text-base">
                <label htmlFor="dob" className="text-pure-greys-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  placeholder="Enter DOB"
                  id="dob"
                  className="text-pure-greys-5 py-3 h-[40px] px-4 bg-richblack-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none"
                  name="dob"
                  {...register("dob", { required: true })}
                />
              </div>

              <div className="flex flex-col items-start justify-center gap-1 w-full text-base">
                <label htmlFor="" className="text-pure-greys-300 text-base">
                  Gender
                </label>
                <div
                  className="flex flex-row items-center justify-between gap-5 w-full text-pure-greys-5 py-3 
                    h-[40px] px-4 bg-richblack-700 rounded-md 
                    shadow-sm shadow-pure-greys-100
                    focus:outline-none text-base"
                >
                  <div className="w-full flex flex-row items-center justify-between text-pure-greys-25">
                    <label className="flex flex-row items-baseline justify-center gap-2">
                      <input
                        type="radio"
                        value="male"
                        {...register("gender")}
                      />
                      Male
                    </label>
                    <label className="flex flex-row items-baseline justify-center gap-2">
                      <input
                        type="radio"
                        value="female"
                        {...register("gender")}
                      />
                      Female
                    </label>
                    <label className="flex flex-row items-baseline justify-center gap-2">
                      <input
                        type="radio"
                        value="other"
                        {...register("gender")}
                      />
                      Other
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between gap-5 w-full">
              <div className="flex flex-col items-start justify-center gap-1 w-full text-base">
                <label htmlFor="phoneno" className="text-pure-greys-300">
                  Phone No.
                </label>
                <input
                  type="number"
                  maxLength={10}
                  placeholder="Enter Phone number"
                  id="phoneno"
                  className="text-pure-greys-5 py-3 h-[40px] px-4 bg-richblack-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none"
                  name="phoneno"
                  {...register("phoneno", { required: true, maxLength: 10 })}
                  value={FormData.phoneno}
                />
              </div>

              <div className="flex flex-col items-start justify-center gap-1 w-full text-base">
                <label htmlFor="about" className="text-pure-greys-300">
                  About
                </label>
                <input
                  type="text"
                  placeholder="Enter bio details"
                  id="displayname"
                  className="text-pure-greys-5 py-3 h-[40px] px-4 bg-richblack-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none"
                  name="about"
                  {...register("about", { required: true })}
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-between gap-5 w-full">
              <div className="flex flex-col items-start justify-center gap-1 w-full text-base">
                <label htmlFor="password" className="text-pure-greys-300">
                  Password
                </label>
                <input
                  type="text"
                  maxLength={10}
                  placeholder="Enter password"
                  id="password"
                  className="text-pure-greys-5 py-3 h-[40px] px-4 bg-richblack-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none"
                  name="password"
                  {...register("password")}
                />
              </div>

              <div className="flex flex-col items-start justify-center gap-1 w-full text-base">
                <label htmlFor="newpassword" className="text-pure-greys-300">
                  New Password
                </label>
                <input
                  type="text"
                  placeholder="New password"
                  id="newpassword"
                  className="text-pure-greys-5 py-3 h-[40px] px-4 bg-richblack-700 rounded-md w-full shadow-sm shadow-pure-greys-100
                    focus:outline-none"
                  name="newpassword"
                  {...register("newpassword")}
                />
              </div>
            </div>

            <div className="btns flex flex-row items-center justify-between gap-5 w-full text-sm md:text-base flex-wrap">
              <button
                className="btn self-center btn btn bg-[#C6011F]  
                px-8 py-2 rounded-md text-pure-greys-5 " onClick={()=>setdeleteModal(true)}
              >
                Delete Account
              </button>
              <div className="flex flex-row items-center justify-center gap-5">
                <Link to={"/dashboard/my-profile"} className="w-full ">
                  <button
                    className="border border-richblack-600 btn btn bg-richblack-700 text-pure-greys-25
                px-8 py-2 rounded-md "
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  className="btn btn bg-[#FFD60A] text-richblack-800 
                px-8 py-2 rounded-md "
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
          <div
            className={`w-[500px] rounded-md absolute bg-transparent
                border border-richblack-300 mx-auto justify-self-center mt-20 backdrop-filter backdrop-blur-md
                flex flex-col items-start justify-start px-5 py-8 gap-3 ${deleteModal?"scale-100":"scale-0"}
                transition-all duration-300 origin-center`}
          >
            <div className="text-2xl font-medium text-pure-greys-25">
              Would you like to delete account?
            </div>
            <p className=" w-[80%] text-lg text-pure-greys-100">
              This account contains Paid Courses. Deleting your account will
              remove all the contain associated with it.
            </p>

            <div className="btns w-full flex flex-row items-center justify-end gap-5">
              <button className="btn self-center btn btn bg-richblack-700  
                px-8 py-2 rounded-md text-pure-greys-5
                border border-richblack-600" onClick={()=>setdeleteModal(false)}>Cancel</button>
              <button className="btn self-center btn btn bg-[#C6011F]  
                px-8 py-2 rounded-md text-pure-greys-5" onClick={handleDelete}>Delete this account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
