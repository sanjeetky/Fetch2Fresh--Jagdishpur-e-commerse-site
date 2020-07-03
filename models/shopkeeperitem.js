const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const shopkeeperitemSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    brand:{
        type:String,
        required:true
    },
    cost:{
        type:String,
        required:true
    },
    weight:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    shop:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    itemid:{
      type:String,
      required:true,
     
    },
    img:{
        type:String,
        required:true
    },
    category:{
         type:String,
         required:true
    },
    status:{
        type:String,
        required:true
    },
    message:{
        type:String
    }
},{
    timestamps:true
});
var Shopkeeperitem=mongoose.model("shopkeeperitem",shopkeeperitemSchema);//by default the mongoose will create a collection in targeted database with plural form like here mongo then there willl be mongos in targeted database!!!
module.exports=Shopkeeperitem;