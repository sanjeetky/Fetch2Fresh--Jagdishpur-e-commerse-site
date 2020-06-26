const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const messageSchema=new Schema({
    order:{
        type:String,
      
    },
    telnum:{
        type:String,
       
    }
},{
    timestamps:true
});
var Message=mongoose.model("message",messageSchema);//by default the mongoose will create a collection in targeted database with plural form like here mongo then there willl be mongos in targeted database!!!
module.exports=Message;