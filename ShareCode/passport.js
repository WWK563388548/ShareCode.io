var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findOne({_id: id}, function(err, user){
        done(err, user);
    });
});

// Check username and password
// if result of check is ok then return user
passport.use(new localStrategy({
        usernameField: 'email'
    }, 
    function(username, passport, done) {
        User.findOne({email: username}, function(err, done) {
            if(err){
                return done(err);
            }
            if(!user) {
                return done(null, false, {
                    message: 'Incorrect username or password'
                });
            }
            if(!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect username or password'
                });
            }

            return done(null, user);
        });
    }
));