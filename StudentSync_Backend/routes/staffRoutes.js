const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}))
const staffModel=require('../model/staffData');
const verify=require('./verifyRoute');
const bcrypt=require('bcryptjs')

// display staff
router.get("/display-staff",verify,async(req,res)=>{

    try{
        const data=await staffModel.find().populate("class_assigned");
        res.send(data);
    }catch(error){
        res.send({message:"Failed to fetch data !"})
    }
    
})

//add staff
router.post('/add-staff',verify,async(req,res)=>{
    try{
        const item=req.body;
        const staff=await staffModel.findOne({class_assigned:item.class_assigned});
        if(staff){return res.send({message:"Class already assigned to someone!"})}
        const hashedPassword=await bcrypt.hash(item.password,12);
        const data=new staffModel({...item,password:hashedPassword});
        await data.save();
        res.send({message:"Staff registered successfully"});
    }catch(error){
        res.send({message:"Staff registration failed !"})
    }
})

//update staff
router.put("/update-staff/:id",verify,async(req,res)=>{
    try{
        const data=req.body;
        const password=req.body.password;
        const hashedPassword=await bcrypt.hash(password,12);
        const updateStaff=await staffModel.findByIdAndUpdate(req.params.id,{...data,password:hashedPassword});
        if(!updateStaff){
            return res.send({message:"Staff not found"});
        }
        res.send({message:"Staff updated successfully"});
    }catch(error){
        res.send({message:"Staff update failed !"})
    }
})

//delete staff
router.delete("/delete-staff/:id",verify,async(req,res)=>{
    try{
        const deleteStaff=await staffModel.findByIdAndDelete(req.params.id);

        res.send({message:"Staff deleted successfully !"})
    }catch(error){
        res.status(500).send({message:"Staff deletion failed !"})
    }
})

//to get the staff details(staff_id and class_assigned ) in the add announcement page in staff module
router.get('/staff-announcement',verify,async(req,res)=>{
    try{
        const staff_id=req.user.id;
        const staff=await staffModel.findOne({_id:staff_id});
        res.send(staff);
    }catch(error){
        res.send({message:"Cannot fetch the staff details !"});
    }
})

//get the total number of staffs in the collection
router.get('/count-staff',verify,async(req,res)=>{
    try{
        const staffCount=await staffModel.countDocuments();
        res.send({staffCount});
    }catch(error){
        res.send({message:"cannot count the staff!"});
        console.log("staff count failed !",error)
    }
})

module.exports=router