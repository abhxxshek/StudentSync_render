const mongoose=require('mongoose');
const videoSchema=mongoose.Schema({
    title:{type:String},
    description:{type:String},
    video_url:{type:String},
    class_id:{type:mongoose.Schema.Types.ObjectId,ref:"classe"}

});
const videoData=mongoose.model('video',videoSchema);
module.exports=videoData;