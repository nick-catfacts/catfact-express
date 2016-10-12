var express = require('express');
var router = express.Router();
var app_root = require('app-root-path')
var User = require('catfact-ecommerce').model


router.post('/', function(req, res) {
  var current_user_name = res.locals.current_user.username

  User.findOne({username: current_user_name}).then(function(user){
    return user.delete_card();
  }).then(function(){
    res.redirect("/dashboard");
  })

})

  // Exports
module.exports = router;