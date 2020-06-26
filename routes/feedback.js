var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const Feedback=require('../models/feedback')
router.route('/')
.post((req,res)=>{
    
  Feedback.create(req.body)
  .then(console.log('created'),err=>console.log(err))
  .catch(err=>console.log(err));      
});
module.exports=router;