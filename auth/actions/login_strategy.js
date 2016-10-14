var LocalStrategy   = require('passport-local').Strategy;
var User = require('catfact-ecommerce').model;
var bCrypt = require('bcrypt-nodejs');

var init = function(passport){

  passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            console.log("Entering the Login  Strategy")


            var findUser = function(){
                    User.findOne({ 'username' :  username })
                    .then(function(user){

                        console.log("User:" + user)

                        // Username does not exist, log the error and redirect back
                        if (!user){
                            console.log('User Not Found with username '+username);
                            return done(null, false, req.flash('message', 'User Not found.') );
                        }
                        // User exists but wrong password, log the error
                        if (!isValidPassword(user, password)){
                            console.log('Invalid Password');
                            return done(null, false, req.flash('message', 'Invalid Password') );
                        }
                        // User and password both match, return user from done method
                        // which will be treated like success
                        console.log("Successful Login!")
                        return done(null, user);
                    })
                    .catch(function(err){
                        console.log("Error in login_strategy.init.findUser")
                        console.log(err);
                        return done(err);
                    });
            }
            process.nextTick(findUser);
        })
    );


    var isValidPassword = function(user, password){
        try{
            console.log("Testing Password")
            return bCrypt.compareSync(password, user.password);
        }
        catch(err){
            console.log("Error in isValidPassword method:")
            return false;
        }
    }

}

module.exports = {
    init: init
}