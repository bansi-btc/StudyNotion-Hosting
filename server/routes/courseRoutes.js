const express=require('express');
const router=express.Router();
const multer  = require('multer');
const cloudinary=require('cloudinary').v2;
const upload=require('./multer')









// router.post('/createCourse', upload.single('image'), function (req, res) {
//     // console.log(req.body);
//     // console.log("Bansi")
//   cloudinary.uploader.upload(req.file.path, function (err, result){
//     if(err) {
//       console.log(err);
//       return res.status(500).json({
//         success: false,
//         message: "Error"
//       })
//     }

//     res.status(200).json({
//       success: true,
//       message:"Uploaded!",
//       data: result
//     })
//   })
// });

// router.post('/createCourse',upload.single('image'), (req, res)=>{
//     console.log(req.body);
//     res.status(200).json({});
// })
const {createCourse, showAllCourses, getCourseDetails, publishCourse, deleteCourse}=require('../controllers/courseController');
const {createCategory, showAllCategory, categoryPageDetails, categoryDetails}=require('../controllers/categoryController');
const {createRatingAndReview, getAverageRating, getAllRating, getAllRatingCourse}=
require('../controllers/ratingAndReviewController');
const {createSection, updateSection, deleteSection}=require('../controllers/sectionController');
const {createSubSection, deleteSubSection}=require('../controllers/subSectionController');
const {auth, isAdmin, isStudent}=require('../middlewares/authMiddle');
// router.use(fileUpload());


router.post('/createSubSection',upload.single('image'),auth, isAdmin, createSubSection);
router.post('/deleteSubSection',upload.single("image"),auth, isAdmin, deleteSubSection);

router.post('/createSection',upload.single('image'),auth, isAdmin, createSection);
router.put('/updateSection',auth, isAdmin, updateSection);
router.post('/deleteSection',upload.single("image"),auth, isAdmin, deleteSection);

// router.post('/createCourse', upload.none(),createCourse);
router.post('/createCourse', upload.single('image'),auth, createCourse);
router.post('/publishCourse', upload.single('image'),auth, publishCourse);
router.post('/deleteCourse', upload.single('image'),auth, deleteCourse);


router.get('/showAllCourses', showAllCourses);
router.post('/getCourseDetails',upload.single("image"),auth, getCourseDetails);


router.post('/createCategory',upload.single("image"),auth, isAdmin, createCategory);
router.get('/showAllCategory', showAllCategory);
router.post('/categoryPageDetails', categoryPageDetails);
router.post('/categoryDetails', upload.single("image"), auth, categoryDetails);

router.post('/createRatingAndReview',auth, isAdmin, createRatingAndReview);
router.get('/getAverageRating', getAverageRating);
router.get('/getAllRating', getAllRating);
router.get('/getAllRatingCourse', getAllRatingCourse);

module.exports=router;


