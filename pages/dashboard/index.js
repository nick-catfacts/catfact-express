var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');
var app_root = require('app-root-path')


 // Routes
router.get('/', function(req, res) {

  var username =  res.locals.current_user.username;
  var recipients = res.locals.current_user.recipients;
  var recipient_headers = lodash.keys(recipients[0])
  var messages_remaining = res.locals.current_user.account.messages_remaining;
  var payment_info = lodash.omit(res.locals.current_user.credit_card[0], ['_id', 'stripe_id'])


  res.render(app_root + '/views/dashboard/index', {
    username:username,
    recipients: recipients,
    messages_remaining:messages_remaining,
    recipient_headers: recipient_headers,
    payment_info: payment_info
    });
});


// Exports
module.exports = router;