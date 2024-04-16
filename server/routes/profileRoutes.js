const express=require('express');
const router=express.Router();
const upload=require('./multer');

const {updateProfile, deleteAccount, getAllUserDetails}=require('../controllers/profileController');
const{auth}=require('../middlewares/authMiddle');
router.post('/updateProfile', auth, updateProfile);
router.delete('/deleteAccount',auth, deleteAccount);
router.post('/userDetails',upload.single("image"),auth,getAllUserDetails);

module.exports=router;