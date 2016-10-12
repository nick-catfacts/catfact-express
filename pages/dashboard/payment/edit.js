var express = require('express');
var router = express.Router();
var app_root = require('app-root-path')
var User = require('catfact-ecommerce').model


router.get('/', function(req, res) {
  res.render(app_root + '/views/dashboard/payment/edit');
});


router.post('/', function(req, res) {
  var current_user_name = res.locals.current_user.username

  User.findOne({username: current_user_name}).then(function(user){
    return user.update_card(req.body.stripe_token);
  }).then(function(result){
    console.log(result)
    res.redirect("/dashboard");
  }).catch(function(err){
    console.log(err)
  })

})

  // Exports
module.exports = router;