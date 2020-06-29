var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const Cart=require('../models/cart');
router.route('/')
.post((req,res)=>{
     var quantity=1;

     //cheking for unique property
    

         Cart.create({
          username:req.body.username,
          name:req.body.name,
          img:req.body.img,
          cost:req.body.cost,
          quantity:quantity,
          itemid:req.body.itemid,
          category:req.body.category
         })
         .then(item=>{
           console.log("added")
          res.statusCode=200;
          res.setHeader('Content-Type','application/json')
          res.json(item)
        },err=>console.log(err))
        .catch(err=>console.log(err));
})

.delete((req,res)=>{
     var obj={itemid:req.body.itemid,username:req.body.username};
     Cart.deleteOne(obj)
     .then(item=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json')
      res.json(item)
    },err=>console.log(err))
    .catch(err=>console.log(err));
});

router.post('/display',(req,res)=>{
    var username=req.body.username;
     Cart.find({username:username})
     .then(item=>{
       res.statusCode=200;
       res.setHeader('Content-Type','application/json')
       res.json(item)
     },err=>console.log(err))
     .catch(err=>console.log(err));
});

router.post('/search',(req,res)=>{
  var username=req.body.username;
  var itemid=req.body.itemid;
   Cart.find({username:username,itemid:itemid})
   .then(item=>{
     res.statusCode=200;
     res.setHeader('Content-Type','application/json')
     res.json(item)
   },err=>console.log(err))
   .catch(err=>console.log(err));
});

module.exports=router;