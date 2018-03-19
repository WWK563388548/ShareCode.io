var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ShareCode.io - a collaborative editor' });
});

/* Get about page. */
router.get("/about", function(req, res, next){
  res.render("about", {title: "ShareCode.io - a collaborative editor"});
});

module.exports = router;
