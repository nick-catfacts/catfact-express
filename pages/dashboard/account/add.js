var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {

  res.locals.current_user.buy_messages(req.body.charge_amt, process.env.COST_PER_MESSAGE)
  .then(function(){
    res.redirect("/dashboard");
  }).catch(function(err){
    console.log(err)
    res.redirect("/dashboard")
  })

})




// Exports
module.exports = router;