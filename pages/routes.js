/// List of all private pages(login required).
'use strict';

var express = require('express');
var router = express.Router();
var script_root = require('app-root-path') + "/pages" // the app-root plus the pages directory

//dashboard front  page
router.use('/dashboard', require(script_root + '/dashboard/index'));

// add messages
router.use('/dashboard/account/add', require(script_root + '/dashboard/account/add'));


// edit payment
router.use('/dashboard/payment/edit', require(script_root + '/dashboard/payment/edit'));
router.use('/dashboard/payment/delete', require(script_root+ '/dashboard/payment/delete'));

// // payment CRUD
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