const express = require('express');
const router = express.Router();
const models = require('../../models');
const moment = require('moment');
const {replaceAll} = require('../../utils/common');
const firebase = require('../../config/firebase-init');
const { isAuthenticated } = require('../../passport/middlewares');

/* notice 회의실 예약 */
router.post('/rsrvNotice',isAuthenticated(), async (req, res) => {

    let meet_room;
    let start_dt = moment(req.body.start_dt).format('YYYY-MM-DD HH:mm');
    let end_dt = moment(req.body.end_dt).format('YYYY-MM-DD HH:mm')

    try{
        meet_room = await models.Ch_meet_room.findOne({
            attributes: 
                ['room_name', 'location']
            ,
            where : {
                room_cd : req.body.room_cd
            },
            raw: true,
        });
        room_name = replaceAll(JSON.stringify(meet_room.room_name), '"', '');
        location = replaceAll(JSON.stringify(meet_room.location), '"', '');

    } catch(err) {
        console.error(err);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }


    //req.body.user_email로 ch_users table, fcm_token 조회
    let registrationToken; 
    try{
        let user = await models.Ch_user.findOne({
            attributes: 
                ['fcm_token']
            ,
            where : {
                user_email : req.user.user_email
            },
            raw: true,
        });

        if (user) {
            registrationToken = user.fcm_token;
        }


    } catch(err) {
        console.error(err);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }


    let payload = {
        notification: {
            title: '[회의하자] 회의실 예약알림',
            body : `${room_name}(${location})에 ${start_dt}부터 ${end_dt}까지 회의가 예약되었습니다.`,
          },
          data: {
            type: req.body.type || '',
            url: req.body.url || ''
          }
    }

    let options = {}

    try {
        const pushCallback = await firebase.messaging().sendToDevice(registrationToken, payload, options);
        res.status(200).json(pushCallback);

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});


/* push test */
router.post('/', async (req, res) => {


    //req.body.user_email로 ch_users table, fcm_token 조회
    let registrationToken = req.body.token; 


    let payload = {
        notification: {
            title: req.body.title,
            body : req.body.message,
          },
          data: {
            type: req.body.type || '',
            url: req.body.url || ''
          }
    }

    let options = {}

    try {
        const pushCallback = await firebase.messaging().sendToDevice(registrationToken, payload, options);
        res.status(200).json(pushCallback);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
module.exports = router;
