'use strict';

var express = require('express');
var router = express.Router();
var rsrvService = require('./reserve.service');
const { isAuthenticated } = require('../../passport/middlewares');

router.get('/list', rsrvService.list);
router.get('/mylist',isAuthenticated(), rsrvService.mylist);
router.get('/:rsrv_sn', rsrvService.get);
router.get('/room/:room_cd', rsrvService.roomList);

router.post('/', isAuthenticated(), rsrvService.create);
router.put('/:rsrv_sn', isAuthenticated(), rsrvService.update);
router.delete('/:rsrv_sn', isAuthenticated(), rsrvService.delete);



module.exports = router;
