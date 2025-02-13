const mongoose=require('mongoose');
const staffSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    address:{type:String},
    gender:{type:String},
    contact:{type:Number},
    subject:{type:String},
    class_assigned:{type:mongoose.Schema.Types.ObjectId,ref:"classe"},
    joining_date:{type:Date,default:Date.now},
    dob:{type:Date},
    role:{type:String, default:'staff'}
},{versionKey:false})
const staffData=mongoose.model("staff",staffSchema);
module.exports=staffData