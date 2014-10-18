var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = mongoose.Types.ObjectId;
var request = require('request');
var scripts = require('../scripts')();

var therainiscoming = require('./apps/therainiscoming');

router.use('/therainiscoming', therainiscoming);

module.exports = router;
