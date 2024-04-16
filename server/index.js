const express=require('express');
const app=express();
const cors=require('cors');
const multer=require('multer');
const {createCourse}=require('./controllers/courseController');
const {auth, isInstructor}=require('./middlewares/authMiddle');
const cloudinary=require('cloudinary').v2;

app.use(cors());
app.use(express.json());


let cloudinaryConnect=require('./config/cloudinary');
cloudinaryConnect();

const userRoutes=require('./routes/userRoutes');
const profileRoutes=require('./routes/profileRoutes');
const paymentRoutes=require('./routes/paymentRoutes');
const courseRoutes=require('./routes/courseRoutes');
const messageRoutes=require('./routes/messageRoutes');
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/message", messageRoutes);


// app.post('/api/v1/course/createCourse',upload.single('file'),auth,isInstructor,createCourse);
// const fileUpload=require('express-fileupload');
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));




let dbConnect=require('./config/database');
const cookieParser=require('cookie-parser');

const bodyParser = require('body-parser');
const { create } = require('./models/course');

const dotenv=require('dotenv').config();

const PORT=process.env.PORT || 4000;

dbConnect();



app.use(cookieParser());







app.get('/', (req, res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running...."
    })
})




// const upload=multer({storage});


app.listen(PORT, ()=>{
    console.log("App running at 4000");
})







