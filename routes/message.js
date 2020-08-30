var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const Message=require('../models/message')
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
    apiKey: '18ec6cb9',
    apiSecret: 'Dw59VQUhh0qG67MZ',
  });

  const from = 'Vonage APIs';
const to = '917667433131';

router.route('/')
.post((req,res)=>{
    const text=JSON.stringify(req.body);
   console.log(text)
   nexmo.message.sendSms(from, to, text,{type:'unicode'}, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
      })
      res.send({name:"sanjeet"})

});
module.exports=router;


