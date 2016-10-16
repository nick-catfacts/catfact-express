var express = require('express');
var router = express.Router();
var app_root = require('app-root-path')


router.get('/', function(req, res) {
  res.render(app_root + '/views/dashboard/payment/update');
});


router.post('/', function(req, res) {

  console.log("Processing Stripe Card Token:" + JSON.stringify(req.body));

    if(!req.body.stripeToken){
      // add flash message here
      res.redirect("/dashboard/payment");
    }


  res.locals.current_user.update_card(req.body.stripeToken)
  .then(function(result){
    console.log("Credit Card Created and added to Customer:" + result)
    res.redirect("/dashboard/payment");
  }).catch(function(err){
    console.log(err)
  })

})

  // Exports
module.exports = router;