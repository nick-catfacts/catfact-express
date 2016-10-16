var express = require('express');
var router = express.Router();
var lodash = require('lodash-node');
var app_root = require('app-root-path')


 // Routes
router.get('/', function(req, res) {

  console.log("RESPOSE:" + res)

  var username =  res.locals.current_user.username;
  var recipients = res.locals.current_user.recipients.toObject();
  var recipient_headers = lodash.keys(recipients[0]);
  var messages_remaining = res.locals.current_user.account.messages_remaining;

  res.render(app_root + '/views/dashboard/index', {
    username: username,
    recipients: recipients,
    messages_remaining:messages_remaining,
    recipient_headers: recipient_headers,
    dashboard_page_active: "active"
    });
});


// Exports
module.exports = router;

