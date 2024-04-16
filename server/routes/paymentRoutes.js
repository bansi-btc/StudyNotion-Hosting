const express=require('express');
const upload=require('./multer')
const {auth, isStudent}=require('../middlewares/authMiddle')

const router=express.Router();

const {capturePayment, verifySignature}=require('../controllers/paymentController');

router.post('/capturePayment',upload.single('image'),auth, isStudent, capturePayment);
router.post('/verifySignature',upload.single('image'),auth, isStudent, verifySignature);

module.exports=router;