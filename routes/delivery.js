var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const Delivery=require('../models/delivery')
router.route('/')
.post((req,res)=>{
    
  Delivery.create(req.body)
  .then(item=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(item)
  },err=>console.log(err))     
})
.put((req,res)=>{
  var query={_id:ObjectID(req.body.id)}
  var newvalues = { $set: { status: req.body.status} };
  Delivery.updateOne(query, newvalues)
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
  var username=req.body.username;
  var status=req.body.status;
  Delivery.find({username:username,status:status})
  .then(item=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json(item)
  },err=>console.log(err))
  .catch(err=>console.log(err));
});

module.exports=router;