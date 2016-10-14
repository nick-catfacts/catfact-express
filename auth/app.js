/// List of all private pages(login required).
'use strict';

var app_root = require('app-root-path');
var serializers = require(app_root + '/auth/actions/serializers');
var login_strategy = require(app_root + '/auth/actions/login_strategy')
var signup_strategy = require(app_root + '/auth/actions/signup_strategy')


var init = function(passport){

  // configure passport which relies up several above (session,bodyparser, flash,etc)
  app.use(passport.initialize());
  app.use(passport.session());

  serializers.init(passport);
  login_strategy.init(passport)
  signup_strategy.init(passport);

  console.log("Loading Authentication Libraries")
  console.log("PASSPORT LOADED")
  console.log(passport)

  console.log("SERIALIZERS----------------")
  console.log(passport._serializers.toString())
  console.log(passport._deserializers.toString())

  console.log("STRATEGIES------------------")
  console.log(JSON.stringify(passport._strategies))
}

// Exports
module.exports = {
    init:init
  }

