var express = require('express');
var router = express.Router();

var nodemailer = require("nodemailer");
var config = require("../config");
var transporter = nodemailer.createTransport(config.mailer);

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
      // Send mail by nodemailer
      var mailOption = {
        from: 'ShareCode.io <no-reply@ShareCode.com>',
        to: 'wc563388548@gmail.com',
        subject: 'You got a message from a user.',
        text: req.body.message
      };

      transporter.sendMail(mailOption, function(error, info){
        if(error){
          console.log(error);
        }
        res.render("thanks", {title: "ShareCode.io - a collaborative editor"});
      });
    }
});

// Create login route
router.get("/login", function(req, res, next){
  res.render("login", {title: "Login your account"});
});

// Create register route
router.get("/register", function(req, res, next){
  res.render("register", {title: "Register a new account"});
});

module.exports = router;
