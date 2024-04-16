const express=require('express');

const router=express.Router();

const {sendMessage}=require('../controllers/message');
router.post('/sendMessage', sendMessage);

module.exports=router;