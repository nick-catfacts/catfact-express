var express = require('express');
var router = express.Router();
var app_root = require('app-root-path')
var User = require('catfact-ecommerce').model

router.get('/:recipient_id', function(req, res){
  var current_user = res.locals.current_user
  var recipient_id = req.params.recipient_id
  recipient = current_user.get_recipient(recipient_id)
  if(recipient){
    res.render(app_root + '/views/dashboard/recipients/update', {recipient: recipient});
  }
  else{
    res.redirect('/dashboard')
  }
})


router.post('/', function(req, res) {
  var current_user_name = res.locals.current_user.username

  User.findOne({username: current_user_name}).then(function(user){

    console.log("req body:" + JSON.stringify(req.body));

    var updated_user = {
      phone: req.body.phone,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      interval: req.body.interval
    }

    console.log("updated user:" + JSON.stringify(updated_user));

   return user.update_recipient(updated_user.phone, updated_user);
  }).then(function(){
    res.redirect("/dashboard");
  }).catch(function(err){
    console.log(err)
  })

})

  // Exports
module.exports = router;