var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const mongoose=require('mongoose');
const Sitem=require('../models/shopkeeperitem');

router.route('/')
.get((req,res)=>{
   Sitem.find({})
   .then(item=>{
     res.statusCode=200;
     res.setHeader('Content-Type','application/json');
     res.json(item)
   },err=>console.log(err))
   .catch(err=>console.log(err));       
})               
.post((req,res)=>{
  Sitem.create({
    name:req.body.name,
    brand:req.body.brand,
    weight:req.body.weight,
    cost:req.body.cost,
    shop:req.body.shop,
    quantity:req.body.quantity,
    status:"requested",
    message:""
})
.then(item=>{
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json(item)
},err=>console.log(err))
.catch(err=>console.log(err));  
})

.delete((req,res)=>{
 Sitem.deleteOne({item:req.body.item})
 .then((item)=>{
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json(item);
  console.log("updated");
},err=>console.log(err))
 .catch(err=>console.log(err));
})

.put((req,res)=>{
  var query={_id:ObjectID(req.body.id)}
  var newvalues = { $set: {message: req.body.message, status: req.body.status} };
  Sitem.updateOne(query, newvalues)
  .then(item=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(item)
    console.log(item)
  },err=>console.log(err))
  .catch(err=>console.log(err));
});



router.route('/display')      
.post((req,res)=>{
        var shop=req.body.username;
        var obj={shop:shop}   
        Sitem.find(obj)
        .then(item=>{
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json(item)
        },err=>console.log(err))
        .catch(err=>console.log(err));     
});

module.exports=router;