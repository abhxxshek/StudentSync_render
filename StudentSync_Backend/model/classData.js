const mongoose=require('mongoose');
const classSchema=mongoose.Schema({
    class_name:{type:Number},
    section:{type:String}
})
const classData=mongoose.model('classe',classSchema);
module.exports=classData