var express = require('express');
var router = express.Router();
var app_root = require('app-root-path');
var lodash = require('lodash-node');



router.use(function(req, res, next) {
  res.locals.deCamelCaser = function(string) {
    var result = string.replace(/([A-Z])/g, ' $1');
    result = result.replace('_', ' ');
    return result.charAt(0).toUpperCase() + result.slice(1);
  };
  next();
});



router.get('/', function(req, res) {

if (res.locals.current_user.credit_card[0]) {
  var credit_card = res.locals.current_user.credit_card[0].toObject();
} else {
  var credit_card = {};
}

  var payment_info = lodash.omit(credit_card, ['_id', 'id']);

  res.render(app_root + '/views/dashboard/payment/index', {
    payment_info: payment_info,
    payment_page_active: 'active'
  });
});

  // Exports
module.exports = router;
