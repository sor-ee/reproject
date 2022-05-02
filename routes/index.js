var express = require('express');
var router = express.Router();
const db = require('monk')(process.env.mongo_url ||'localhost:27017/mydb')
const { check , validationResult } = require('express-validator');
/* GET home page. */
require('dotenv').config()
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/', [
  check("user","").not().isEmpty(),
  check("pass","").not().isEmpty()
], function(req,res,next) {
  const answer = validationResult(req);
  if(!answer.isEmpty()) {
    res.location('/');
    res.redirect('/');
  }
  else{
    var check = db.get('user');
    check.find({$and:[{username:req.body.user},{password:req.body.pass}]}).then((result) => {
      if(result.length== 0) {
        res.location('/');
        res.redirect('/');
    }
      else if (req.body.pass=="1234"){
        res.location('/home');
        res.redirect('/home');
      }
      else {
        res.location('/student');
        res.redirect('/student');
    }
  });
  }
});

module.exports = router;
