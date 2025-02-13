const mongoose=require('mongoose');
const announcementSchema=mongoose.Schema({
    announcement:{type:String },
    admin_id:{type:mongoose.Schema.Types.ObjectId, ref:"admin"},
    staff_id:{type:mongoose.Schema.Types.ObjectId, ref:"staff"},
    class_id:{type:mongoose.Schema.Types.ObjectId, ref:"classe"},
    createdAt:{type:Date, default:Date.now}
});

const announcementData=mongoose.model('announcement',announcementSchema);
module.exports=announcementData;