var express = require('express');
var router = express.Router();
const db = require('monk')(process.env.mongo_url ||'localhost:27017/mydb')
const { check , validationResult } = require('express-validator');
/* GET home page. */
require('dotenv').config()
/*router.get('/', function(req, res, next) {
  res.render('home',{data:""});
});*/
router.get('/', function(req, res, next) {
  let ct = db.get('product')
  ct.find({}, {projection: {_id: 1, name:1}})
  .then(result =>{
    console.log(result.length);
    res.render('home', { data: result });
  })
});
module.exports = router;