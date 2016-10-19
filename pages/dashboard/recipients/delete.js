var express = require('express');
var router = express.Router();
var app_root = require('app-root-path');


router.post('/', function(req, res) {

  res.locals.current_user.remove_recipient(req.body.id)
  .then(function() {
    res.redirect('/dashboard');
  })
  .catch(function(err) {
    console.log(err);
    res.redirect('/dashboard');
  });

});

  // Exports
module.exports = router;
