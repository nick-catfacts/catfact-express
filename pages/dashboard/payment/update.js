var express = require('express');
var router = express.Router();
var app_root = require('app-root-path');


router.get('/', function(req, res) {
  res.render(app_root + '/views/dashboard/payment/update', {payment_page_active: 'active'});
});


router.post('/', function(req, res) {

  console.log('Processing Stripe Card Token:' + JSON.stringify(req.body));

    if (!req.body.stripeToken) {
      // add flash message here
      res.redirect('/dashboard/payment');
    }


  res.locals.current_user.update_card(req.body.stripeToken)
  .then(function(result) {
    console.log('Credit Card Created and added to Customer:' + result);
    res.redirect('/dashboard/payment');
  }).catch(function(err) {
    console.log(err);
    req.flash('flash_message', err.message);
    res.redirect('/dashboard/payment/update');
  });

});

  // Exports
module.exports = router;
