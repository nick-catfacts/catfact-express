var express = require('express');
var router = express.Router();
var app_root = require('app-root-path')



var init = function(passport){
// auth routes
/* GET login page. */
  router.get('/login', function(req, res) {
      // Display the Login page with any flash message, if any
    res.render(app_root + '/auth/views/login');
  });

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render(app_root + '/auth/views/signup');
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
     successRedirect: '/dashboard',
     failureRedirect: '/auth/login',
     failureFlash : true
   }));


  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/signup',
    failureFlash : true
  }));

  // // /* GET Home Page */
  // // router.get('/home', isAuthenticated, function(req, res){
  // //   res.render('home', { user: req.user });
  // // });

  // /* Handle Logout */
  router.get('/signout', function(req, res) {
   req.logout();
   res.redirect('/');
  });

  return router;
}


module.exports = {
    init:init
  }