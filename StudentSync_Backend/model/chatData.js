const mongoose=require('mongoose');
const chatSchema=mongoose.Schema({
    student_id:{type:mongoose.Schema.Types.ObjectId ,ref:"student"},
    staff_id:{type:mongoose.Schema.Types.ObjectId ,ref:"staff"},
    class_id:{type:mongoose.Schema.Types.ObjectId ,ref:"classe"},
    question:{type:String },
    answer:{type:String, default:true},
    createdAt: { type: Date, default: Date.now, expires:15552000 }  //this collection is set to automatically remove its documents after the specified seconds in expires attribute 

});
const chatData=mongoose.model('chat',chatSchema);
module.exports=chatData;