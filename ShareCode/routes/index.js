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

/* Contact page */
router.route('/contact')
.get(function(req, res, next){
    res.render("contact", {title: "ShareCode.io - a collaborative editor"});
})
.post(function(req, res, next){

    // Check input things and display errors in the contact.hbs
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();

    if(errors){
      res.render("contact", {
        title: "ShareCode.io - a collaborative editor",
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      res.render("thanks", {title: "ShareCode.io - a collaborative editor"});
    }
});

module.exports = router;
