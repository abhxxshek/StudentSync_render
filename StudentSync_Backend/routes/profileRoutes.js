const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const verify=require('./verifyRoute');
const adminModel=require('../model/adminData');
const staffModel=require('../model/staffData');
const studentModel=require('../model/studentData');

//display user profile in dashboard
router.get('/display-user',verify,async(req,res)=>{
    try{
        const id=req.user.id;
        let user=await adminModel.findOne({_id:id});
        if(!user){
            user=await staffModel.findOne({_id:id}).populate("class_assigned")
        }
        if(!user){
            user=await studentModel.findOne({_id:id}).populate("class_assigned")
        }

        res.send(user);
    }catch(error){
        res.send({message:"Cannot fetch the user details !"});
        console.log("ERROR !",error);
    }
})

module.exports=router