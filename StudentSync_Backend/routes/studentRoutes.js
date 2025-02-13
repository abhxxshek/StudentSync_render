const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const studentModel=require('../model/studentData');
const staffModel=require('../model/staffData')
const verify=require('./verifyRoute');
const { default: mongoose } = require('mongoose');
const bcrypt=require('bcryptjs');

// display student
router.get('/display-student',verify,async(req,res)=>{
    try{
        const data=await studentModel.find();
        res.send(data);
    }catch(error){
        res.send({message:"Cannot fetch students"});
    }
})

//add students
router.post('/add-student',verify,async(req,res)=>{
    try{
        const item=req.body;
        const hashedpassword=await bcrypt.hash(item.password,12);
        const student=new studentModel({...item,password:hashedpassword});
        await student.save();
        res.send({message:"Student registered successfully"})
    }catch(error){
        res.send({message:"Student registration failed !"})
        console.log(error)
    }
})

//update student
router.put('/update-student/:id',verify,async(req,res)=>{
    try{
        const data=req.body;
        const password=data.password;
        const hashedPassword=await bcrypt.hash(password,12);
        const student=await studentModel.findByIdAndUpdate(req.params.id,{...data,password:hashedPassword});
        
        res.send({message:"Student updated successfully"});
    }catch(error){
        res.send({message:"Student Updation failed !"})
    }
})

//delete student
router.delete('/delete-student/:id',verify,async(req,res)=>{
    try{
        const student=await studentModel.findByIdAndDelete(req.params.id);
        if(!student){
            return res.status(404).send({message:"Student not found !"});
        }
        res.send({message:"Student deleted successfully "})
    }catch(error){
        res.status(500).send({message:"Student deletion failed !"})
    }
})

//display only the students of class that is assigned to the staff 
router.get('/staff-students',verify,async(req,res)=>{
    try{
        const staff_id=req.user.id;
        const staff=await staffModel.findOne({_id:staff_id});
        const student=await studentModel.find({class_assigned:staff.class_assigned}).populate("class_assigned");
        res.send(student);
    }catch(error){
        res.send({message:"Student data fetch failed !"})
    }
})

//student info( sending class_id and staff_id to the frontend) for the studentchat page 
router.get('/student-chat',verify,async(req,res)=>{
    try{
        const studentId=req.user.id;
        const student=await studentModel.findOne({_id:studentId});
        const staff=await staffModel.findOne({class_assigned:student.class_assigned});
        res.send({staffId:staff._id,
            classId:student.class_assigned,
            studentId:studentId
        })
    }catch(error){
        res.send({message:"Cannot fetch staffId and classId"})
    }
})

//get the total number of student in the collection
router.get('/count-student',verify,async(req,res)=>{
    try{
        const studentCount=await studentModel.countDocuments();
        res.send({studentCount});
    }catch(error){
        res.send({message:"cannot count the student!"});
        console.log("student count failed !",error)
    }
})

//get the total number of students in assigned class
router.get('/assignedClass-count-student',verify,async(req,res)=>{
    try{
        const user_id=req.user.id;
        const staff=await staffModel.findOne({_id:user_id});
        const studentCount=await studentModel.countDocuments({class_assigned:staff.class_assigned});
        res.send({studentCount});
    }catch(error){
        res.send({message:"cannot count the student of assigned class!"});
        console.log("student count failed !",error)
    }
})

//fee status pending
router.put('/fee-status-pending',verify,async(req,res)=>{
    try{
        const user_id=req.user.id;
        const staff=await staffModel.findOne({_id:user_id});
        await studentModel.updateMany({class_assigned:staff.class_assigned},{$set:{fee_status:"pending"}});
        res.send({message:"Fee remainder send successfully"})
    }catch(error){
        res.send({message:"Error updating fee status !"})
    }
})

//fee status paid
router.put('/fee-status-paid',verify,async(req,res)=>{
    try{
        const user_id=req.user.id;
        const staff=await staffModel.findOne({_id:user_id});
        await studentModel.updateMany({class_assigned:staff.class_assigned},{$set:{fee_status:"paid"}});
        res.send({message:"Fee remainder unsend successfully"})
    }catch(error){
        res.send({message:"Error updating unsend status !"})
    }
})

//get fee status
router.get('/staff-students-fee-status',verify,async(req,res)=>{
    try{
        const staff_id=req.user.id;
        const staff=await staffModel.findOne({_id:staff_id});
        const student=await studentModel.findOne({class_assigned:staff.class_assigned,fee_status:"pending"})
        res.send(student);
    }catch(error){
        res.send({message:"Student fee status fetch failed !"})
    }
})

//set fee status paid for current student
router.put('/fee-paid',verify,async(req,res)=>{
    try{
        const studentId=req.user.id;
    const student=await studentModel.findByIdAndUpdate(studentId,{fee_status:"paid"});
    res.send({message:"Fee status updated successfully !"})
    }catch(error){
        res.send({message:"Fee status update failed !"})
            console.log("ERROR !Fee staus update !",error)
        
    }
})


module.exports=router