/// List of all private pages(login required).
'use strict';

var express = require('express');
var router = express.Router();
var app_root = require('app-root-path')
var script_root = app_root +"/pages"
var views_root = app_root + "/views"


//dashboard front  page
router.use('/dashboard', require(script_root + '/dashboard/index'));

// add messages
router.use('/dashboard/account/add', require(script_root + '/dashboard/account/add'));


// edit payment
router.use('/dashboard/payment/edit', require(script_root + '/dashboard/payment/edit'));
router.use('/dashboard/payment/delete', require(script_root+ '/dashboard/payment/delete'));

// recipients
router.use('/dashboard/recipients/new', require(script_root +'/dashboard/recipients/new'));
router.use('/dashboard/recipients/delete', require(script_root + '/dashboard/recipients/delete'));
router.use('/dashboard/recipients/update', require(script_root + '/dashboard/recipients/update'));
//router.use('/dashboard/recipients/update', require(script_root + '/dashboard/recipients/update'));



// Exports
module.exports = router;