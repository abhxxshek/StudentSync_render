const mongoose=require('mongoose');
const adminSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String, default:'admin'}
})
const adminData=mongoose.model('admin',adminSchema);
module.exports=adminData
