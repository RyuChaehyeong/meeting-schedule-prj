'use strict';

var express = require('express');
var router = express.Router();
var mainService = require('./main.service');

router.get('/', mainService.index);

module.exports = router;
