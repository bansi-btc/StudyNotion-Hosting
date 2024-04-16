const express=require('express');
const router=express.Router();

const {signup, login, sendOTP, changePassword}=require('../controllers/auth');
const {resetPasswordToken, resetPassword}=require('../controllers/resetPassword');
const {auth} = require('../middlewares/authMiddle');
router.post('/signup', signup);
router.get('/login', login);
router.get('/sendOTP', sendOTP);

router.get('/resetPasswordToken', resetPasswordToken);
router.put('/resetPassword', resetPassword);
router.post('/changePassword', changePassword);

module.exports=router;