var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {

  console.log("Message Addition Body: " + JSON.stringify(req.body));

  res.locals.current_user.buy_messages(req.body.charge_amt, process.env.COST_PER_MESSAGE)
  .then(function(){
    res.redirect("/dashboard");
  }).catch(function(err){
    console.log(err)
    // add flash flash_message
    req.flash('flash_message', err.message)
    res.redirect("/dashboard")
  })

})




// Exports
module.exports = router;