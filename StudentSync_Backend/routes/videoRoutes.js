const express=require('express');
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const videoModel=require('../model/videoData');
const staffModel=require('../model/staffData');
const studentModel=require('../model/studentData');
const verify=require('./verifyRoute');


//display videos
router.get('/display-videos',verify,async(req,res)=>{
    try{
        const userId=req.user.id;
        let user=await staffModel.findOne({_id:userId});
        if(!user){
            user=await studentModel.findOne({_id:userId});
        }
        const video=await videoModel.find({class_id:user.class_assigned});
        res.send(video);
    }catch(error){
        res.send({message:"Video fetch failed !"});
    }
})

//add videos
router.post('/add-videos',verify,async(req,res)=>{
    try{
        const item=req.body;
        const data=new videoModel(item);
        await data.save();
        res.send({message:"video added successfully"})
    }catch(error){
        res.send({message:"video add failed !"})
    }
})

//update videos
router.put('/update-videos/:id',verify, async(req,res)=>{
    try{
        const data=await videoModel.findByIdAndUpdate(req.params.id,req.body);
        res.send({message:"Video updated successfully"});
    }catch(error){
        res.send({message:"Video updation failed !"})
    }
})

//delete videos 
router.delete('/delete-videos/:id',verify,async(req,res)=>{
    try{
        const data=await videoModel.findByIdAndDelete(req.params.id);
        res.send({message:"Video deletion successful"})
    }catch(error){
        res.send({error:"Video deletion failed !"})
    }
})


module.exports=router
