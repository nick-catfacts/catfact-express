/// List of all private pages(login required).
'use strict';

var express = require('express');
var router = express.Router();
var app_root = require('app-root-path')
var script_root = app_root +"/pages"
var views_root = app_root + "/views"
var isAuthenticated = require(app_root + '/auth/app').isAuthenticated


router.use('/dashboard', isAuthenticated, require(script_root + '/dashboard/index'));

// add messages
router.use('/dashboard/account/add', isAuthenticated, require(script_root + '/dashboard/account/add'));

// edit payment
router.use('/dashboard/payment', isAuthenticated, require(script_root + '/dashboard/payment/index'));
router.use('/dashboard/payment/update', isAuthenticated, require(script_root + '/dashboard/payment/update'));
router.use('/dashboard/payment/delete', isAuthenticated, require(script_root+ '/dashboard/payment/delete'));

// recipients
router.use('/dashboard/recipients/new', isAuthenticated, require(script_root +'/dashboard/recipients/new'));
router.use('/dashboard/recipients/delete', isAuthenticated, require(script_root + '/dashboard/recipients/delete'));
router.use('/dashboard/recipients/update', isAuthenticated, require(script_root + '/dashboard/recipients/update'));
//router.use('/dashboard/recipients/update', require(script_root + '/dashboard/recipients/update'));

// Exports
module.exports = router