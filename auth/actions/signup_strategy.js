var LocalStrategy   = require('passport-local').Strategy;
var User = require('catfact-ecommerce').model;
var bCrypt = require('bcrypt-nodejs');

var init =  function(passport){

  passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            console.log("Passport signup is called!!")

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        User.create_new(username, password)
                        .then(function(err, user){
                            if (err){
                                console.log('Error in Saving user: '+err);
                                throw err;
                            }
                            console.log('User Registration successful');
                            return done(null, user);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}

module.exports = {
    init:init
}