const express=require('express');
const morgan = require('morgan');
const app=new express();
app.use(morgan('dev'));
const cors=require('cors')
app.use(cors());
require('dotenv').config();
require('./db/connection');

const staffRoutes=require('./routes/staffRoutes');
app.use('/staff',staffRoutes);

const studentRoutes=require('./routes/studentRoutes');
app.use('/student',studentRoutes);

const loginRoutes=require('./routes/loginRoutes');
app.use('/login',loginRoutes);

const classRoutes=require('./routes/classRoutes');
app.use('/classes',classRoutes);

const videoRoutes=require('./routes/videoRoutes');
app.use('/videos',videoRoutes);

const attendanceRoutes=require('./routes/attendanceRoutes');
app.use('/attendance',attendanceRoutes);

const chatRoutes=require('./routes/chatRoutes');
app.use('/chat',chatRoutes);

const GradeRoutes=require('./routes/gradeRoutes');
app.use('/marks',GradeRoutes);

const announcementRoutes=require('./routes/announcementRoutes');
app.use('/announcement',announcementRoutes);

const profileRoutes=require('./routes/profileRoutes');
app.use('/profile',profileRoutes);

const paymentRoutes=require('./routes/paymentRoutes');
app.use('/payments',paymentRoutes);


app.listen(process.env.port,(req,res)=>{
    console.log(`Server listening on port ${process.env.port}`);
})