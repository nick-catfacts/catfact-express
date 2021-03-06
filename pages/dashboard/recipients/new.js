var express = require('express');
var router = express.Router();
var app_root = require('app-root-path');


router.get('/', function(req, res) {
  res.render(app_root + '/views/dashboard/recipients/new');
});


router.post('/', function(req, res) {
  var new_recipient = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.area_code + req.body.phone_prefix + req.body.phone_suffix
  };



  res.locals.current_user.add_recipient_json(new_recipient)
  .then(function(result) {
    console.log(result);
    res.redirect('/dashboard');
  }).catch(function(err) {
    console.log(err);
  });
});

  // Exports
module.exports = router;
