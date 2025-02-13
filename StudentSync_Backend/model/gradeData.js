const mongoose=require('mongoose');
const gradeSchema=mongoose.Schema({
    title:{type:String},
    student_id:{type:mongoose.Schema.Types.ObjectId ,ref:"student"},
    staff_id:{type:mongoose.Schema.Types.ObjectId ,ref:"staff"},
    computer_science:{type:Number},
    mathematics:{type:Number},
    science:{type:Number},
    english:{type:Number},
    hindi:{type:Number},
    total_percentage:{type:Number},
    createdAt:{type:Date ,default:Date.now} 
});
const gradeData=mongoose.model("grade",gradeSchema);
module.exports=gradeData;