/// List of all private pages(login required).
'use strict';

var app_root = require('app-root-path');
var serializers = require(app_root + '/auth/actions/serializers');
var login_strategy = require(app_root + '/auth/actions/login_strategy');
var signup_strategy = require(app_root + '/auth/actions/signup_strategy');


var init = function(passport) {

  serializers.init(passport);
  login_strategy.init(passport);
  signup_strategy.init(passport);

  console.log('Loading Authentication Libraries');
  console.log('PASSPORT LOADED');
  console.log(passport);

  console.log('SERIALIZERS----------------');
  console.log(passport._serializers.toString());
  console.log(passport._deserializers.toString());

  console.log('STRATEGIES------------------');
  console.log(JSON.stringify(passport._strategies));
};

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated()) {return next();}
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/auth/login');
};


// Exports
module.exports = {
    init: init,
    isAuthenticated: isAuthenticated
  };

