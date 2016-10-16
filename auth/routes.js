var express = require('express');
var router = express.Router();
var app_root = require('app-root-path')



var init = function(passport){

// auth routes
  router.get('/login', function(req, res) {
    var flash = req.flash()
    message = flash.error || flash.message
    res.render(app_root + '/auth/views/login', {message: message} );
  });

  router.get('/signup', function(req, res){
    var flash = req.flash()
    message = flash.error || flash.message
    res.render(app_root + '/auth/views/signup', {message: message} );
  });

  router.post('/login', passport.authenticate('login', {
     successRedirect: '/dashboard',
     failureRedirect: '/auth/login',
     failureFlash : true
   }));

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/signup',
    failureFlash : true
  }));

  // // /* GET Home Page */
  // // router.get('/home', isAuthenticated, function(req, res){
  // //   res.render('home', { user: req.user });
  // // });

  router.get('/signout', function(req, res) {
   req.logout();
   res.redirect('/');
  });

  return router;
}


module.exports = {
    init:init
  }