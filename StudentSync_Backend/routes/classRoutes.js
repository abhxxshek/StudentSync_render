const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const classModel=require('../model/classData')
const staffModel=require('../model/staffData')
const verify=require('./verifyRoute');
const { default: mongoose } = require('mongoose');

//Display all class
router.get('/display-class',verify,async(req,res)=>{
    try{
        const data=await classModel.find();
        res.status(200).send(data);
    }catch(error){
        res.status(404).send({message:'Class details fetch failed !'});
    }
})

//create class
router.post('/add-class',verify,async(req,res)=>{
    try{
        const item=req.body;
        const classData=await classModel.findOne({class_name:item.class_name,section:item.section});
        if(classData){return res.send({message:"Class already exist !"})}
        const data=new classModel(item);
        await data.save();
        res.send({message:"Class added successfully"})
    }catch(error){
        res.send({message:'class add failed !'});
    }
})

// update class
router.put('/update-class/:id',verify,async(req,res)=>{
    try{
        const data=await classModel.findByIdAndUpdate(req.params.id,req.body);
        if(!data){
            return res.send({message:'class not found'})
        }
        res.send({message:'class updated successfully'});
    }catch(error){
        res.send({message:'class updation failed !'});
    }
})

// delete class
router.delete('/delete-class/:id',verify,async(req,res)=>{
    try{
        const id=req.params.id;
        const staff=await staffModel.findOne({class_assigned:id})
        if(staff){return res.send({message:"Cannot delete class! This class is assigned to someone."})}
        const data=await classModel.findByIdAndDelete(req.params.id);
        res.status(200).send({message:'Class deleted successfully'});
    }catch(error){
        res.status(404).send({message:'class deletion failed !'});
    }
})

//display only the class assigned to the staff in the student add page 
router.get('/staff/class',verify,async(req,res)=>{
    try{
        const staff_id=req.user.id;
        const staff=await staffModel.findOne({_id:staff_id});
        const class_data=await classModel.findOne({_id:staff.class_assigned})
        res.send(class_data);
    }catch(error){
        res.send({message:"error fetching assigned class  with respect to the staff"})
        console.log("Error!",error);
    }

})

//get the total number of class in the collection
router.get('/count-class',verify,async(req,res)=>{
    try{
        const classCount=await classModel.countDocuments();
        res.send({classCount});
    }catch(error){
        res.send({message:"cannot count the classes!"});
        console.log("class count failed !",error)
    }
})

module.exports=router