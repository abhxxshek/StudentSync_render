const mongoose=require('mongoose');
const attendanceSchema=mongoose.Schema({
    student_id:{type:mongoose.Schema.Types.ObjectId ,ref:"student"},
    date:{type:Date},
    status:{type:Number},
    staff:{type:mongoose.Types.ObjectId ,ref:"staff"}
})
const attendanceData=mongoose.model('attendance',attendanceSchema);
module.exports=attendanceData