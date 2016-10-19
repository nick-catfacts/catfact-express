var User = require('catfact-ecommerce').model;

var init = function(passport) {

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
      try {
        //console.log('serializing user: ');console.log(user);
        done(null, user._id);
      }
      catch (err) {
        console.log('Error in Serialize User method');
        throw err;
      }
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            console.log('deserializing user:', user);
            done(err, user);
        })
        .catch(function(err) {
            console.log('Error in Deserialize User!');
            throw err;
        });
    });
return passport;
};

module.exports = {
    init: init
};
