const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const deliverySchema=new Schema({
    fullname:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
       
    },
    telnum:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
  village:{
        type:String,
        required:true
    },
    houseno:{
        type:String,
        required:true
    },
    city:{
        type:String,
       
    },
    order:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        default:"Inprogress"
    },
    username:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:new Date()
    }
},{
    timestamps:true
});
var Delivery=mongoose.model("delivery",deliverySchema);//by default the mongoose will create a collection in targeted database with plural form like here mongo then there willl be mongos in targeted database!!!
module.exports=Delivery;