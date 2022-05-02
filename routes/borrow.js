var express = require('express');
var router = express.Router();
const db = require('monk')(process.env.mongo_url ||'localhost:27017/mydb')
const { check , validationResult, Result } = require('express-validator');
/* GET home page. */
require('dotenv').config()
router.get('/', function(req, res, next) {

  res.render('borrow',{data:''});
});

router.post('/', [
    check("borrow","").not().isEmpty(),
    check("return","").not().isEmpty(),
    check("ID","").not().isEmpty()
  ], function(req,res,next) { 
    const answer = validationResult(req);
    if(!answer.isEmpty()) {
      res.location('/borrow');
      res.redirect('/borrow');
    }
    else{
      var ct=db.get('borrow')
      ct.insert({
        product:req.body.product,
        borrowDate:req.body.borrow,
        returnDate:req.body.return,
        studentID:req.body.ID
      },function(err,home){
        if(err){
          res.send(err);
        }else{
          res.location('/home');
          res.redirect('/home');
        }
      })
    }
  });
 router.get('/send', function(req, res, next) {
    var result="";
    res.render('borrow',{data:result});
  });
  router.post('/send(:_id)', function(req, res, next) {
    var ct1=db.get('product')
    ct1.findOne({_id:req.params._id},{projection:{name:1}}).then(result =>{
      console.log(result)
      res.location('/borrow',{data:result});
      //res.redirect('/borrow',{data:result});
      res.render('borrow',{data:result});
    })
    
    //res.render('borrow');
  });
module.exports = router;
