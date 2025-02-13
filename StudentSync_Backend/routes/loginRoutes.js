const express=require('express')
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const adminModel=require('../model/adminData');
const staffModel=require('../model/staffData');
const studentModel=require('../model/studentData');
const jwt=require('jsonwebtoken');
const verify=require('./verifyRoute')
const bcrypt=require('bcryptjs')

//login authentication and token generation

router.post('/check-user',async(req,res)=>{
    let user=await adminModel.findOne({email:req.body.email});
    if(!user){
        user=await staffModel.findOne({email:req.body.email});
    }
    if(!user){
        user=await studentModel.findOne({email:req.body.email});
    }
     if(!user){
        return res.status(404).send({message:"User not found !"});
    }
        
    
    try{
        const userPassword=req.body.password
        const checkPassword=await bcrypt.compare(userPassword,user.password)
        if(checkPassword){
          const payload={email:user.email,password:user.password,role:user.role,id:user._id}  
          const token=jwt.sign(payload,process.env.jwt_secret_key,{expiresIn:"1h"});
          if(user.role=="staff"){
            const class_assigned=user.class_assigned;
            res.status(200).send({message:"Login successful",token:token,class:class_assigned});
          }else{
            res.status(200).send({message:"Login successful",token:token})
          }
          
        }else{
            res.send({message:"Invalid credentials !"});
            
        }
    }catch(error){
        console.log(error);
    }
    
})

//fetch individual user name 
router.get('/username',verify,async(req,res)=>{
    try{
        const Id=req.user.id;
        let user=await adminModel.findOne({_id:Id});
        if(!user){
            user=await staffModel.findOne({_id:Id});
        }
        if(!user){
            user=await studentModel.findOne({_id:Id});
        }

        res.send(user);
    }catch(error){
        res.send({message:"Individual user data fetch failed !"})
    }
})

module.exports=router