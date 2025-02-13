const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const announcementModel=require('../model/AnnouncementData');
const staffModel=require('../model/staffData');
const adminModel=require('../model/adminData');
const studentModel=require('../model/studentData');
const verify=require('./verifyRoute')

//create announcements
router.post('/add-announcements',verify,async(req,res)=>{
    try{
        const data=req.body;
    const announcement=new announcementModel(data);
    await announcement.save();
    res.send({message:"Announcement send successfully !"});
    }catch(error){
        res.send({message:"Cannot send announcement !"})
        console.log("ERROR !",error);
    }
})

//display (staff) announcements in staff interface
router.get('/staff/display-announcements',verify,async(req,res)=>{
    try{
        const staff_id=req.user.id;
        const staff=await staffModel.findOne({_id:staff_id});
        const announcement=await announcementModel.find({class_id:staff.class_assigned}).sort({ createdAt: -1 });
        res.send(announcement);
    }catch(error){
        res.send({message:"Failed to fetch announcement !"});
        console.log("ERROR !",error);
    }
})

//display (admin) announcements in admin page
router.get('/admin/display-announcements',verify,async(req,res)=>{
    try{
        const adminData=await adminModel.findOne({role:"admin"});
        const announcement=await announcementModel.find({admin_id:adminData._id}).sort({ createdAt: -1 });
        res.send(announcement);
    }catch(error){
        res.send({message:"Failed to fetch announcements !"});
        console.log("ERROR !",error);
    }
})

//display (staff) announcements in student page
router.get('/student/display-announcements',verify,async(req,res)=>{
    try{
        const studentId=req.user.id;
        const student=await studentModel.findOne({_id:studentId});
        
        const announcement=await announcementModel.find({class_id:student.class_assigned}).sort({createdAt:-1});
        
        res.send(announcement);
    }catch(error){
        res.send({message:"failed to fetch the announcement based on student dashboard !"});
        console.log("ERROR ! announcement fetch failed !",error)
    }
})

//delete announcements 
router.delete('/delete-announcement/:id',verify,async(req,res)=>{
    try{
        const data=await announcementModel.findByIdAndDelete(req.params.id);
        res.send({message:"Announcement deleted successfully !"})
    }catch(error){
        res.send({message:"Failed to delete the announcement !"})
        console.log("ERROR !",error);
    }
})


module.exports=router