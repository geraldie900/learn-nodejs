var express = require('express');
const { route } = require('./users');
var router = express.Router();
var db = require('monk')('localhost:27017/test');
var monk = require('monk');
var userData = db.get('user-data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get-data', function(req, res, next) {
  var data = userData.find({}).then(function(docs){
    res.render('index', {items: docs});
  });
  
});

router.post('/insert', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };

  //var insert = userData.insert(item);
  userData.insert(item);

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  };
  var id = req.body.id;

  //userData.update({"_id": db.id(id)}, item);
  userData.update({"_id": monk.id(id)}, {$set : item})
  //userData.updateById(id, item);

  res.redirect('/');
});

router.post('/delete', function(req, res, next){
  var id = req.body.id;
  
  //userData.remove({"_id": db.id(id)});
  userData.remove({"_id": monk.id(id)});
  //userData.removeById(id);

  res.redirect('/');
});

module.exports = router;
