const mongoose=require('mongoose');
const studentSchema=mongoose.Schema({
    name:{type:String},
    dob:{type:Date},
    email:{type:String},
    password:{type:String},
    fathers_name:{type:String},
    mothers_name:{type:String},
    address:{type:String},
    gender:{type:String},
    contact:{type:Number},
    class_assigned:{type:mongoose.Schema.Types.ObjectId,ref:"classe"},
    fee_status:{type:String ,default:"paid"},
    role:{type:String ,default:'student'}
},{versionKey:false})
const studentData=mongoose.model('student',studentSchema);
module.exports=studentData