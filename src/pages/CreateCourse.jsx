import React, { useDebugValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories, courses, profile, section, subsection } from "../services/apis";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {setUser} from '../slices/profileSlice'
import SideBar from "../components/common/SideBar";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md"; 
import { CiCirclePlus } from "react-icons/ci";
import { useForm } from 'react-hook-form';
import CustomFileInput from "./CustomInput";
import { AiFillThunderbolt } from "react-icons/ai";
import CustomSelect from "../components/common/CustomSelect";
import { MdPlayLesson } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { PiTelevisionLight } from "react-icons/pi";


const CreateCourse = () => {
    const {token} = useSelector((state) => state.auth);
  const navigate=useNavigate();
  const [loading, setloading] = useState(false);
  // const [first, setfirst] = useState(second)
  const {user}=useSelector((state)=>state.profile);
  const [catarr, setcatarr] = useState([]);
  const [categoryvalue, setcategoryvalue] = useState(null)
  // const [courseData, setcourseData] = useState(null)
  // const [userDetails, setuserDetails] = useState({});
  // console.log(token);
  const location=useLocation();

  const dispatch=useDispatch();
  let userDetails=useSelector((state)=>state.profile).user;
  const [thumbnailFile, setthumbnailFile] = useState(null);
  const [subsectionFile, setsubsectionFile] = useState(null);

  const { register, handleSubmit, formState: { errors } , reset} = useForm();
  const [courseId, setcourseId] = useState('65f2745533701c9411590715');



  const onSubmit = async(data) => {
    // console.log(data); // This will contain the form data
    toast.loading("loading");
    if(!thumbnailFile || !categoryvalue){
      toast.error("Fill all details");
      toast.remove();
      return;
    }
    const newcourseData={
      ...data,
      thumbnailFile,
      categoryvalue,

    }

    console.log(newcourseData);
    // setcourseData(newcourseData);
    
    // const formDataToSend = new FormData();
    // formDataToSend.append('username', "Himanshu");
    // formDataToSend.append('email', "hg");
    // formDataToSend.append('file', formData.file);
    const formData=new FormData();
    formData.append("category", newcourseData.categoryvalue);
    formData.append("courseName", newcourseData.title);
    formData.append("courseDescription", newcourseData.description);
    formData.append("price", newcourseData.price);
    formData.append("whatYouWillLearn", "Hima");
    formData.append("token", token);
    formData.append("image", thumbnailFile);
    formData.append("published", false);

    try{

      const res=await axios.post(courses.CREATE_COURSE, formData);
      console.log(res.data);
      if(!res.data.status){
        toast.error(res.data.message);
        toast.remove();
        return;
      }

      setcourseId(res.data.newCourse._id);
      dispatch(setUser(res.data.updatedUser));
      
      localStorage.setItem("user", JSON.stringify(res.data.updatedUser));

      
    }
    catch(err){
      console.log(err.message);
    }
    toast.remove();
    
    setstep(2);
  };
  const [sectionidx, setsectionidx] = useState(-1);


  const onSubmitAddLecture = async(data) => {

    try{

    // console.log(data); // This will contain the form data

    const {lecturetitle, lecturedescription,hour, minute, second}=data;
    console.log(subsectionFile);

    const newLecture={
      'title':lecturetitle,
      'description':lecturedescription,
      'duration':`${hour}:${minute}:${second}`,
      'file':subsectionFile,
    }

    // console.log(newLecture);
    const formData=new FormData();
    // console.log(token);
    formData.append("token", token);
    formData.append("title",newLecture.title);
    formData.append("description",newLecture.lecturedescription);
    formData.append("timeDuration",newLecture.duration);
    formData.append("image",newLecture.file);
    formData.append("sectionId",sectionId);

    const res=await axios.post(subsection.CREATE_SUBSECTION, formData);

    console.log(res.data);
    // return;

    const datatosend={
      "courseId":courseId,
      "token":token
    }
    
    const newCourseData=await axios.post(courses.COURSE_DETAILS, datatosend)
    console.log(newCourseData.data);

    console.log(newCourseData.data.courseDetails.courseContent);
    setsections(newCourseData.data.courseDetails.courseContent);



    
    // console.log(sections[sectionidx].subsections);
    // sections[sectionidx].subsections.push(newLecture);
    // console.log(sections[sectionidx].subsections);
    setsubsectionModal(false);
  }

  catch(err){
    console.log(err.message);
  }




    
  };

  const gotFile=(file)=>{
    // console.log(file);
    setthumbnailFile(file);
  }
  const gotFile2=(file)=>{
    // console.log(file);
    // setthumbnailFile(file);
    setsubsectionFile(file);
    // console.log(file);
    // console.log(file);

  }
//   console.log(userDetails);
    // console.log(userDetails.courses);

  // if(userDetails.accountType!=="student"){
  //   console.log("Bansi")
  // }
  // console.log(userDetails);
  // let userDetails=JSON.stringify(localStorage.getItem)
  // console.log(userDetails);
  

  const fetchData = async () => {
    
    // console.log(token);
    if(token===null){
      navigate('/login');
    // console.log(token);

      return;
    }

    const res=await fetch(categories.CATEGORIES_API);

    const output=await res.json();
    // console.log(output.categories);
    setcatarr(output.categories);

    // if(userDetails.accountType!=='student'){
    //   toast.error("Protected route for student");
    //   navigate('/login');
    //   return;
    // }

  //   if(!token) {}
  //   setloading(true);
  //   try {
  //     // console.log(profile.GET_USER_DETAILS_API);
  //     const result = await fetch(profile.GET_USER_DETAILS_API, {
  //       method: "GET",
  //       headers: {
  //         token: token,
  //       },
  //     });
  //     const output = await result.json();
  //     // console.log(output);
  //     if (!output.success) {
  //       toast.error(output.message);
  //       navigate('/login');
  //       return;
  //     }

  //     // setuserDetails(output.existingUser);
  //     dispatch(setUser(output.existingUser));
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  //   setloading(false);
  // };


  }
  const [step, setstep] = useState(1);
  
  const [sections, setsections] = useState([]);
  const [sectionName, setsectionName] = useState('');
  const [sectionId, setsectionId] = useState(null);

  const handleChange=(event)=>{
    setsectionName(event.target.value)
  }

  const handleSectionAdd=async(sectionName)=>{
    // const prevsecarr=[...sections];
    // prevsecarr.push({
    //   'name':sectionName,
    //   'subsections':[],
    // })

    // console.log(prevsecarr);
    // setsections(prevsecarr);
    // console.log(sectionName);
    //create section api to create section

    toast.loading("loading");
    const formData=new FormData();
    formData.append("token", token);
    formData.append("sectionName", sectionName);
    formData.append("courseId", courseId);

    const res=await axios.post(section.CREATE_SECTION, formData);
    console.log(res.data);
    const prevarr=[...sections];
    prevarr.push(res.data.newSection);
    console.log(prevarr);
    setsections(prevarr);  
    reset();
    setsectionName('');
    toast.remove();


  }

  
  const [subsectionModal, setsubsectionModal] = useState(false);

  const handleAddLecture=(index)=>{
    // console.log(index);
    setsectionidx(index);
    setsubsectionModal(true);
  }

  const [file, setfile] = useState(null);
  const upload=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("file", file);
    formData.append("name", "Himanshu");

    await axios.post('https://studynotion-hosting-11.onrender.com/api/v1/course/createCourse', formData)
    .then(res=>{})
    .catch((er)=>{console.log(er.message)});
  }

  const [sectionToBeDeleted, setsectionToBeDeleted] = useState('');
  const [subsectionToBeDeletedId, setsubsectionToBeDeletedId] = useState('');

  const [deletedSectionModal, setdeletedSectionModal] = useState(false);
  const [deletedSubSectionModal, setdeletedSubSectionModal] = useState(false);

  const handleSectionDelete=async()=>{
    // console.log(sectionToBeDeleted);
    toast.loading("loading");
    const data={
      "sectionId":sectionToBeDeleted,
      "courseId":courseId,
    }

    const formData=new FormData();
    formData.append("sectionId", sectionToBeDeleted); 
    formData.append("courseId", courseId); 
    formData.append("token", token); 
    // console.log(section.DELETE_SECTION);
    const res=await axios.post(section.DELETE_SECTION, formData);
    console.log(res.data);

    const datatosend={
      "courseId":courseId
    }
    
    const newCourseData=await axios.post(courses.COURSE_DETAILS, datatosend)
    console.log(newCourseData.data);

    console.log(newCourseData.data.courseDetails.courseContent);
    setsections(newCourseData.data.courseDetails.courseContent);
    setdeletedSectionModal(false);

    toast.remove();
  }

  const handleSubSectionDelete=async()=>{
    // console.log(subsectionToBeDeletedId);
    toast.loading("loading");
    const formData=new FormData();
    formData.append("token", token);
    formData.append("subSectionId", subsectionToBeDeletedId)
    formData.append("sectionId", sectionToBeDeleted);

    const res=await axios.post(subsection.DELETE_SUBSECTION, formData);
    console.log(res.data);

    const datatosend={
      "courseId":courseId
    }
    
    const newCourseData=await axios.post(courses.COURSE_DETAILS, datatosend)
    console.log(newCourseData.data);

    console.log(newCourseData.data.courseDetails.courseContent);
    setsections(newCourseData.data.courseDetails.courseContent);
    setdeletedSectionModal(false);

    toast.remove();
    setdeletedSubSectionModal(false);


  }

  const handleDraft=async()=>{
    toast.success("Course saved as draft");
    navigate('/dashboard/my-profile');
  }

  const handlePublish=async()=>{
    toast.loading("loading");
    const formData=new FormData();
    formData.append("token", token);
    formData.append("courseId", courseId);

    const res=await axios.post(courses.PUBLISH_COURSE, formData);
    console.log(res.data);
    if(!res.data.success){
      toast.remove();
      toast.error(res.data.message);
      return;
    }

    const formData2=new FormData();
    formData2.append("token", token);

    const res2=await axios.post(profile.GET_USER_DETAILS_API, formData2);
    console.log(res2.data);

    dispatch(setUser(res2.data.existingUser));
    localStorage.setItem("user", JSON.stringify(res2.data.existingUser));
    toast.remove();
    toast.success(res.data.message);
    navigate('/dashboard/my-profile');
  }

  




  useEffect(() => {
    fetchData();
    // console.log("Bansi")
  },[]);
  return (
    <div className="flex flex-row h-full w-full relative">
    {subsectionModal && <form onSubmit={handleSubmit(onSubmitAddLecture)} className="scale-[0.6] sm:scale-[0.7] 
    xl:scale-[1] w-[500px] absolute pb-4 bg-richblack-700 backdrop-blur-sm border border-richblack-600
      self-center mx-auto rounded-md
      left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
    flex flex-col items-start justify-start gap-3 z-10">
      <div className="w-full bg-richblack-600 py-2 px-4 text-richblack-5">Editing Lectures</div>

      <div className="w-full flex flex-col items-start justify-start gap-4 px-4">
        
        <CustomFileInput label={"Lecture Video"} gotFile2={gotFile2} gotFile={gotFile} typee={2}/>

        <div className="flex flex-col items-start justify-start w-full">
          <label htmlFor="lecturetitle" className="text-richblack-5">Lecture title</label>
          <input type="text" placeholder="Enter lecture title" id="lecturetitle"
          name="lecturetitle" className="w-full py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
          text-richblack-5" {...register('lecturetitle')}/>
        </div>

        <div className="flex flex-col items-start justify-start w-full">
            <div className="text-richblack-5">Video Playback Time</div>
            <div className="w-full flex flex-row items-center justify-between gap-3 ">
              <input type="number" placeholder="HH" className="w-[30%] py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
          text-richblack-5 styled-number-input" {...register('hour')}/>
              <input type="number" placeholder="MM" className="w-[30%] py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
          text-richblack-5 styled-number-input" {...register('minute')}/>
              <input type="number" placeholder="SS" className="w-[30%] py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
          text-richblack-5 styled-number-input" {...register('second')}/>

            </div>
        </div>

        <div className="flex flex-col items-start justify-start w-full">
          <label htmlFor="lecturedescription" className="text-richblack-5">Lecture description</label>
          {/* <input type="text" placeholder="Enter lecture title" id="lecturetitle"
          name="lecturetitle" className="w-full py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
          text-richblack-5" /> */}
          <textarea name="lecturedescription" id=""  rows="3" className="w-full py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
          text-richblack-5" {...register('lecturedescription')}></textarea>
        </div>
      </div>

      <button type="submit" className="btn text-base text-richblack-700 bg-[#FFD60A] px-10 py-2 rounded-md flex 
              flex-row items-center justify-center gap-2 mx-4">Add lecture</button>
    </form>}
    
      <SideBar/>
    <div className="right w-full  lg:w-[87%] overflow-auto  h-[92vh]">
      {loading && (
        <div className="text-4xl text-pure-greys-5 flex flex-col items-center pt-40">
          LOADING
        </div>
      )}
      {!loading && userDetails &&  (
        <div className="w-full flex flex-col gap-5 items-center lg:flex-row lg:items-start justify-start lg:gap-0 pt-8 pb-5">
          
          
        <div className="w-full md:w-[55%] px-5 lg:pl-[100px] lg:pr-[40px] flex flex-col items-start justify-start gap-5 ">
            <Link to={'/dashboard/my-profile'} className="text-richblack-5 text-2xl">Back to Dashboard</Link>
            

            <div className="w-full flex flex-row items-center justify-between text-richblack-5">
                <div className={`flex flex-col items-center justify-start gap-2 ${step===1 && "text-[#FFD60A]"}`}>
                    <div className="h-[40px] w-[40px] flex flex-col items-center justify-center border border-dashed
                    border-richblack-400 rounded-full">1</div>
                    <div>Course Information</div>
                </div>
                <div className={`flex flex-col items-center justify-start gap-2 ${step===2 && "text-[#FFD60A]"}`}>
                    <div className="h-[40px] w-[40px] flex flex-col items-center justify-center border border-dashed
                    border-richblack-400 rounded-full">2</div>
                    <div>Course Builder</div>
                </div>
                <div className={`flex flex-col items-center justify-start gap-2 ${step===3 && "text-[#FFD60A]"}`}>
                    <div className="h-[40px] w-[40px] flex flex-col items-center justify-center border border-dashed
                    border-richblack-400 rounded-full">3</div>
                    <div>Publish</div>
                </div>
                
            </div>

            {step===1 && <div className="w-full bg-richblack-700 px-4 py-5 rounded-md mx-auto">
                
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-start justify-start
                gap-4">

                    <div className="flex flex-col items-start justify-start w-full gap-1">
                        <label htmlFor="title" className="text-richblack-5">Course Title</label>
                        <input type="text" placeholder="Enter Course Title" {...register('title',{required:true})}
                        id="title" className="w-full py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
                         text-richblack-5" />
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-1">
                        <label htmlFor="description" className="text-richblack-5">Short description</label>
                        {/* <input type="text" placeholder="Enter Course Title" {...register('title',{required:true})}
                        id="title" className="w-full py-2 px-4 rounded-sm bg-richblack-600" /> */}
                        <textarea name="description" id="" rows="4" placeholder="Enter short description"
                         {...register('description',{required:true})}
                        className="w-full py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none text-richblack-5"></textarea>
                    </div>

                    <div className="flex flex-col items-start justify-start w-full gap-1">
                        <label htmlFor="price" className="text-richblack-5">Price</label>
                        <input type="number" placeholder="Enter Price Detail" {...register('price',{required:true})}
                        id="price" className="w-full py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
                         text-richblack-5" />
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-1">
                        <label htmlFor="category" className="text-richblack-5">Category</label>
                         <CustomSelect catarr={catarr} setcategoryvalue={setcategoryvalue}/>
                         
                    </div>

                    <div className="flex flex-col items-start justify-start w-full gap-1">
                        <label htmlFor="tags" className="text-richblack-5">Tags</label>
                        <input type="text" placeholder="Enter tags" {...register('tags',{required:true})}
                        id="tags" className="w-full py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
                         text-richblack-5" />
                    </div>

                    <div className="flex flex-col items-start justify-start w-full gap-1">
                      
                         <CustomFileInput gotFile={gotFile} typee={1} />
                    </div>

                    
                    <button className="btn text-base text-richblack-700 bg-[#FFD60A] px-10 py-2 rounded-md flex 
                flex-row items-center justify-center gap-2" type="submit">Add</button>
                
                    
      
                </form>
            </div>}
            {step===2 && (<div className="w-full bg-richblack-700 px-4 py-5 rounded-md flex flex-col items-center
            justify-start gap-4 relative">

              {deletedSectionModal && <div className="w-[300px] mx-auto absolute z-20 mt-10 bg-transparent border border-richblack-500
              px-4 py-6 rounded-md backdrop-blur-sm
              flex flex-col items-center justify-center gap-5">
                <h1 className="text-center text-xl font-medium text-richblack-25">Are you sure to Delete this section</h1>
                <div className="btns flex flex-row items-center justify-center gap-4">
                  <button className="btn px-6 py-1 border border-[#FFD60A] rounded-md text-richblack-5"
                  onClick={()=>{setdeletedSectionModal(false)}}>Cancel</button>
                  <button className="btn px-6 py-1 bg-[#e24c4c] rounded-md text-richblack-5" 
                  onClick={handleSectionDelete}>Delete</button>
                </div>
                </div>}
              {deletedSubSectionModal && <div className="w-[300px] mx-auto absolute z-20 mt-10 bg-transparent border border-richblack-500
              px-4 py-6 rounded-md backdrop-blur-sm
              flex flex-col items-center justify-center gap-5">
                <h1 className="text-center text-xl font-medium text-richblack-25">Are you sure to Delete this section</h1>
                <div className="btns flex flex-row items-center justify-center gap-4">
                  <button className="btn px-6 py-1 border border-[#FFD60A] rounded-md text-richblack-5"
                  onClick={()=>{setdeletedSubSectionModal(false)}}>Cancel</button>
                  <button className="btn px-6 py-1 bg-[#e24c4c] rounded-md text-richblack-5" 
                  onClick={handleSubSectionDelete}>Delete</button>
                </div>
                </div>}
              <h1 className="text-richblack-5 text-xl font-medium mb-1 self-start">Course Builder</h1>


              {<div className="w-full bg-richblack-600 rounded-md pr-3 pl-5 py-2 flex flex-col items-start justify-start gap-5 text-sm">
                {sections.map((ele,index)=>{
                  return <div key={index} className="w-full flex flex-col items-start justify-start text-richblack-200 gap-2">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="flex flex-row items-center justify-start gap-2">
                      <MdPlayLesson />
                      <div className="">{ele.sectionName}</div>
                      </div>
                      <div className="flex flex-row items-center justify-start gap-2">
                          <MdEdit />
                          <MdDelete onClick={()=>{
                            setsectionToBeDeleted(ele._id);
                            // setSectionToBeDeleted(ele._id);
                            setdeletedSectionModal(true);
                          }}/>
                      </div>
                    </div>

                    <div className="pl-10 flex flex-col items-start justify-start w-full gap-1">
                      {ele.subSection.map((element, idx)=>{
                        return <div key={idx} className="flex flex-row items-center justify-between w-full">
                        <div>{element.title}</div>
                        <div className="flex flex-row items-center justify-start gap-2">
                          <MdEdit />
                          <MdDelete onClick={()=>{
                            setsubsectionToBeDeletedId(element._id)
                            setsectionToBeDeleted(ele._id);
                            setdeletedSubSectionModal(true);
                          }} />
                        </div>
                      </div>
                      })}
                      
                      
                      
                    </div>

                    <div className="text-[#FFD60A] flex flex-row items-center justify-start gap-2">
                      <div><IoMdAdd /></div>
                      <div onClick={()=>{
                        setsubsectionModal(true);
                        setsectionId(ele._id);
                      }}>Add lecture</div>
                    </div>
                  </div>
                })}
              </div>}
              
              <input type="text" placeholder="Add a section to build your course" className="
              w-full py-2 px-4 rounded-sm bg-richblack-600 focus:outline-none
              text-richblack-5" value={sectionName} onChange={handleChange}/>

              <div className="flex flex-row items-center justify-between w-full">

              <button className="btn bg-transparent border border-[#FFD60A]
              text-[#FFD60A]  px-4 py-1 rounded-md self-start" onClick={()=>{handleSectionAdd(sectionName)}}>Create Section</button>
              <button className="btn bg-[#FFD60A]
                px-6 py-1 rounded-md self-start" onClick={()=>{setstep(3)}}>Next</button>

              </div>
            </div>)}
            {step===3 && (<div className="w-full   flex flex-col items-start
            justify-start gap-4 relative">

              <div className="w-full  px-4 py-5 rounded-md flex flex-col items-start
            justify-start gap-4 relative bg-richblack-700">
              <h1 className="text-richblack-5 text-xl font-medium mb-1 self-start">Publish Settings</h1>

              <div className="flex flex-row items-center justify-start text-richblack-300 gap-4">
                <div><PiTelevisionLight /></div>
                <div>
                Make this course public
                </div>
                </div>
                </div>

              <div className="flex flex-row items-center justify-end w-full gap-4 mt-10">
                <button className="btn bg-transparent border border-[#FFD60A]
              text-[#FFD60A]  px-4 py-1 rounded-md self-start" 
              onClick={handleDraft}>Save as draft</button>
                <button className="btn bg-[#FFD60A]
                px-6 py-1 rounded-md self-start" onClick={handlePublish}>Publish</button>
              </div>


              
              
              
            </div>)}

        </div>
        
        <div className=" w-[350px] rounded-md flex flex-col items-start justify-start px-4 py-2 gap-4 bg-richblack-700">
            <div className="text-xl text-richblack-100 flex flex-row items-center justify-start
            gap-2"><AiFillThunderbolt className="text-[#FFD60A]"/>
            <div className="">Course Upload tips</div>
            </div>
            <div className="flex flex-col items-start justify-start gap-2 text-sm text-richblack-100">
                <p>Set the Course Price option or make it free.</p>
                <p>Standard size for the course thumbnail is 1024x576.</p>
                <p>Video section controls the course overview video.</p>
                <p>Course Builder is where you create & organize a course.</p>
                <p>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</p>
                <p>Information from the Additional Data section shows up on the course single page.</p>
                <p>Make Announcements to notify any important</p>
                <p>Notes to all enrolled students at once.</p>
            </div>
        </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default CreateCourse