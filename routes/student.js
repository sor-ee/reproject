var express = require('express');
var router = express.Router();
const db = require('monk')(process.env.mongo_url ||'localhost:27017/mydb')
const { check , validationResult } = require('express-validator');
/* GET home page. */
require('dotenv').config()
router.get('/', function(req, res, next) {
  res.render('student',{data:"null"});
});

router.post('/', [
  ], function(req,res,next) { 
    const answer = validationResult(req);
    if(!answer.isEmpty()) {
      res.location('/student');
      res.redirect('/student');
    }
    else{
      var ct=db.get('borrow')
      ct.findOne({studentID: req.body.ID}, { projection: {
        _id: 1,
        product: 1,
        borrowDate: 1,
        returnDate: 1,
        studentID: 1,
         } }).then(result => {
          console.log(result)
          if(result == null){
            res.render('student', {data:"null"});
          }else{
            res.render('student', {data:result});
          }
          
         })
      }
});


router.get('/delete', function(req, res, next) {
  res.render('return',{data:"null"});
});

router.post('/delete(:_id)', function(req, res, next) {
  var ct=db.get('borrow')
  ct.findOneAndDelete({_id: req.params._id})
  res.location('/student');
  res.redirect('/student');
});

module.exports = router;