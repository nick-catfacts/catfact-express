var express = require('express');
var router = express.Router();
var User = require('catfact-ecommerce').model


router.post('/', function(req, res) {
  var current_user_name = res.locals.current_user.username

  User.findOne({username: current_user_name}).then(function(user){
    return user.buy_messages(req.body.charge_amt, process.env.COST_PER_MESSAGE);
  }).then(function(){
    res.redirect("/dashboard");
  })

})




// Exports
module.exports = router;