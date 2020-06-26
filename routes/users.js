var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
const url='mongodb+srv://Sanjeet:Sanjeet@cluster0-5et2v.mongodb.net/test?retryWrites=true&w=majority';
var User = require('../models/user');
/* GET users listing. */
var passport = require('passport');
router.route('/')
.post((req, res, next) => {
  User.find({username:req.body.username})
  .then((item)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(item);
  },err=>console.log(err))
  .catch(err=>console.log(err));
  
});





router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      //res.json({err: err});
      res.json({status:"err"})
           }
    else   {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
         req.session.username=req.body.username;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
          });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  req.session.username=req.body.username;
  res.json({success: true, status: 'You are successfully logged in!'});

});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
     res.json({status:"hello"});
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/session',(req,res)=>{
  res.send(req.session)
})

//signup
/*
router.route('/signup')


.post((req, res, next) => {
  var name=req.body.name;
 var username=req.body.username;
 var password=req.body.password;
 var paisa=0;
    var obj={
      name:name,
      username:username,
      password:password,
      paisa:paisa
    }
   
    MongoClient.connect(url,function(err,db){
        if(err) throw err;
        var dbo=db.db("users");
        dbo.collection("user").insertOne(obj,function(err,result){
            if(err) throw err;
               console.log("Successfully created");
            db.close();
        })
    })
    req.session.username=username;
    req.session.password=password;
    res.send(req.session);
      
});


//login

router.route('/login')
.all((req,res,next) => {
    res.statusCode = 200;
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you! login');
})
.post((req, res, next) => {
    var username=req.body.username;
    var password=req.body.password;
    var nam=" ";
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("users");
    var query = {username:username,password:password};
    dbo.collection("user").find(query).toArray(function(err, result) {
      if (err) throw err;
     
      console.log(result);
      db.close();
    })
  })
      req.session.username=username;
      req.session.password=password;
      res.send(req.session);
})
.put((req, res, next) => {
  
    res.end('PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Deleting all dishes');
});




router.get('/logout', (req, res) => {
 
    req.session.destroy();
    res.clearCookie("sanjeet");
    console.log("logout done!!!")
    res.send({"name":"hello"});
});


*/

module.exports = router;
