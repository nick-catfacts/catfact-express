var express = require('express');
var router = express.Router();
var app_root = require('app-root-path')



router.post('/', function(req, res) {

  res.locals.current_user.delete_card()
  .then(function(){
    res.redirect("/dashboard/payment");
  })
  .catch(function(err){
    console.log(err)
  })

})

  // Exports
module.exports = router;