var LocalStrategy   = require('passport-local').Strategy;
var User = require('catfact-ecommerce').model;
var bCrypt = require('bcrypt-nodejs');
var request = require('request-promise');

var init =  function(passport){

  passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            console.log("Passport signup is called!!")

            findOrCreateUser = function(){

                // refactor this crap to a promise...
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
                        User.create_new(username, createHash(password))
                        .then(function(user){
                            console.log('User Registration successful');
                            return done(null, user);
                        })
                        .catch(function(err){
                            console.log('Error in Creating New user: '+err);
                            throw err;
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            console.log(req)

            var options = {
              method: 'POST',
              uri: "https://www.google.com/recaptcha/api/siteverify",
              form: {
                secret: process.env.GOOGLE_CAPTCHA_SECRET,
                response: req.body["g-recaptcha-response"]
              }
            }

            request(options)
            .then(function(captcha_res){
                console.log(captcha_res)
                captcha_res = JSON.parse(captcha_res)

                if(!captcha_res.success){
                  console.log('Captcha failed: '+username);
                  return done(null, false, req.flash('message','Captcha Failed. ARE you a robot?'));
                }

                return findOrCreateUser();
             })
            .catch(function(err){
                console.log(err)
            })


        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        try{
            console.log("Encrypting Password")
            return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        }
        catch(err){
            console.log("Error in createHash method:")
            throw err;
        }
    }
}

module.exports = {
    init:init
}