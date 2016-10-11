/// List of all private pages(login required).
'use strict';

var express = require('express');
var router = express.Router();


//dashboard front  page
router.use('/dashboard', require('./dashboard/index'));

// // account info
// router.use('/dashboard/account', require('./dashboard/account/index'));
// router.use('/dashboard/account/delete', require('./dashboard/account/delete'));

// // payment CRUD
// router.use('/dashboard/payment', require('./dashboard/payment/index'));
// router.use('/dashboard/payment/add', require('./dashboard/payment/add'));
// router.use('/dashboard/payment/delete', require('./dashboard/payment/delete'));

// // recipient CRUD
// router.use('/dashboard/recipients', require('./dashboard/recipients/index'))
// router.use('/dashboard/recipients/add', require('./dashboard/recipients/add'));
// router.use('/dashboard/recipients/delete', require('./dashboard/recipients/delete'));

// // interval
// router.use('/dashboard/interval/change', require('./dashboard/interval/change'));



// Exports
module.exports = router;