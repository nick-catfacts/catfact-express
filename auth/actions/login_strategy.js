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
            console.log("User:" + user)
            console.log("Err: " + err)

            User.findOne({ 'username' :  username },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log(err)
                        return done(err);
                    }
                    // Username does not exist, log the error and redirect back
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    console.log("Successful Login!")
                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        console.log("testing password")
        return bCrypt.compareSync(password, user.password);
    }

}

module.exports = {
    init: init
}