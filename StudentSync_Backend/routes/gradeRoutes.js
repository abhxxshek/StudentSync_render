const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const gradeModel=require('../model/gradeData');
const verify=require('./verifyRoute');

//add marks 
router.post('/add-marks',verify,async(req,res)=>{
    try{
        const data=req.body;
    const marks=new gradeModel(data);
    await marks.save();
    res.send({message:"Marks added successfully"})
    }catch(error){
        res.send({message:"Marks adding failed !"});
        console.log("ERROR !",error);
    }
})

// display marks in staff interface 
router.get('/display-marks/:studentId',verify,async(req,res)=>{
    try{
        const studentId=req.params.studentId;
        const marks=await gradeModel.find({student_id:studentId});
        res.send(marks);
    }catch(error){
        res.send({message:"Marks fetching failed !"})
    }
})

//delete marks 
router.delete('/delete-marks/:id',verify,async(req,res)=>{
    try{
        const marks=await gradeModel.findByIdAndDelete(req.params.id);
        res.send({message:"Grade removed successfully !"});
    }catch(error){
        res.send({message:"Grades delete failed !"});
    }
})

//update marks 
router.put('/edit-marks/:id',verify,async(req,res)=>{
    try{
        const marks=await gradeModel.findByIdAndUpdate(req.params.id,req.body);
        res.send({message:"Grade editted successfully"});
    }catch(error){
        res.send({message:"Oops something went wrong !"});
    }
})

module.exports=router