const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const shoppingitemSchema=new Schema({
    name:{
        type:String,
        required:true,
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
    category:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
var Item=mongoose.model("shoppingitem",shoppingitemSchema);//by default the mongoose will create a collection in targeted database with plural form like here mongo then there willl be mongos in targeted database!!!
module.exports=Item;