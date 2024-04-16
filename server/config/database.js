const mongoose=require('mongoose');

require('dotenv').config();
let dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB connection successfull")
        
    })
    .catch((err)=>{
        console.log(err.message);
    })
}

module.exports=dbConnect;