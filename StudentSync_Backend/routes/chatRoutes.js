const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const verify = require("./verifyRoute");
const chatModel = require("../model/chatData");

// create a new chat
router.post("/new-chat", verify, async (req, res) => {
  try {
    const data = req.body;
    const chat = new chatModel(data);
    await chat.save();
    res.send({message:"Question send successfully"})
  } catch (error) {
    res.send({message:"Cannot send message"});
    console.log("Error! message send failed !",error);
  }
});


// display messages in student interface
router.get("/student/display-chat",verify,async(req,res)=>{
    try{
        const student=req.user.id;
        const studentchats=await chatModel.find({student_id:student});
        res.send(studentchats);

    }catch(error){
        res.send({message:"Cannot fetch recent messages !"});
        console.log("ERROR !message retrival failed ",error);
    }
})

//display messages in staff interface
router.get("/staff/display-chat",verify,async(req,res)=>{
    try{
        const staff=req.user.id;
        const staffchats=await chatModel.find({staff_id:staff}).populate("student_id");
        res.send(staffchats);
    }catch(error){
        res.send({message:"Cannot fetch recent messages !"});
        console.log("ERROR! messages retrival failed !",error);
    }
})

//staff replies to the question 
router.put("/reply/:id",verify,async(req,res)=>{
    try{
        const {answer} =req.body;
        const chat=await chatModel.findById(req.params.id);

        if (!chat) {
            return res.send({ message: "Chat not found!" });
          }

        chat.answer=answer;
        await chat.save();
        res.send({message:"Reply send successfully"})
    }catch(error){
        res.send({message:"Reply send unsuccessful !"})
    }
})

module.exports=router;
