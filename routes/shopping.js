var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
router.use(bodyParser.json());
const mongoose=require('mongoose');
const Item=require('../models/shoppingitems');


router.route('/fruits')
.put((req,res)=>{
    var query={_id:ObjectID(req.body.id)}
    var newvalues = { $set: {cost:req.body.cost, quantity:req.body.quantity } };
    Item.updateOne(query, newvalues)
    .then((item)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(item);
      console.log("updated");
    },err=>console.log(err))
    .catch(err=>console.log(err));
  })

.get((req,res)=>{
     Item.find({})
     .then((item)=>{
       res.statusCode=200;
       res.setHeader('Content-Type','application/json');
       res.json(item);
     },err=>console.log(err))
     .catch(err=>console.log(err));
})

.post((req, res) => {
  Item.find({itemid:req.body.itemid})
        .then(item=>{
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json(item)
        },err=>console.log(err))
        .catch(err=>console.log(err))
})

.delete((req,res)=>{
   Item.deleteOne({_id:ObjectID(req.body.id)})
   .then((item)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(item);
    console.log("deleted");
  },err=>console.log(err))
   .catch(err=>console.log(err));
   
});


//putting items into db
router.route('/dalo')
.post((req,res)=>{
   Item.create(req.body)
   .then(item=>{
     res.statusCode=200;
     res.setHeader('Content-Type','application/json');
     res.json(item);
    console.log("added");
   },err=>console.log(err))
   .catch(err=>console.log(err));
});
//display active items of any shop




router.route('/activeitems')
.post((req, res) => {
    var username=req.body.username;
        Item.find({shop:username})
        .then(data=>{
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json(data);
        },err=>console.log(err))
        .catch(err=>console.log(err));
});

module.exports=router;