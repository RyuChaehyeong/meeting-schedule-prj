'use strict';
const models = require('../models');
const Sequelize = require('sequelize');
const schedule = require('node-schedule');
const { sequelize } = require('../models');
const firebase = require('../config/firebase-init');
const moment = require('moment');
moment.tz.setDefault("Asia/Seoul");

class scheduleJob {

    constructor() {

    }

    /* 전일 기준 예약 백업 */
    startBackup() {

        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = 12;
        rule.minute = parseInt('00');
        rule.tz = 'Asia/Seoul';

        schedule.scheduleJob(rule, async () => {

            const Op = Sequelize.Op;

            try {

                const t = await sequelize.transaction();

                let schedule = await models.Ch_schedule.create({
                    eventType: 'meet backup',
                    exeDate: moment().format(),
                    exeCnt: 0,
                    exeResult: 'active',
                    log: ''
                });

                let rows = await models.Ch_meet_rsrv.findAll({
                    attributes: 
                    ['rsrv_sn','user_email', 'room_cd', 'start_dt', 'end_dt', 'headnum', ['created_at', 'rsrv_created_at']],
                    include : {
                        model : models.Ch_meet_room,
                        attributes : ['room_name'],
                    },

                    where : {
                        [Op.and] : [
                            {
                                created_at: {
                                    [Op.lt]: moment().format("YYYY-MM-DD 00:00:00")
                                }
                            },
                            {    created_at : {
                                    [Op.gte]: moment().subtract(1, 'day').format("YYYY-MM-DD 00:00:00")
                                },
                            }
                        ]
                    },
                    order: [['created_at', 'DESC']],
                    raw: true,
                })

                await models.Ch_meet_backup.bulkCreate(rows, {transaction: t});

                await models.Ch_schedule.update({
                    exeCnt: rows.length,
                    exeResult: 'success',
                    log: '',

                }, {
                    where : {
                        id : schedule.id,
                    },
                }, {transaction: t})
                
                await t.commit();


           } catch (error) {
               
               console.error(error);
               await t.rollback();
           }  

        });        
    }

    
    /* 회의 종료 push */
    noticeMeetEnd() {

        schedule.scheduleJob('0/10 * * * * ', async () => {

            const Op = Sequelize.Op;

            try {

                //종료되는 회의에 참석한 user의 fcm_token array
                let userToken = await models.Ch_user.findAll({
                    attributes: 
                    ['fcm_token'],
                    distinct: true,
                    include : {
                        model : models.Ch_meet_rsrv,
                        attributes : [],
                        where : {
                            end_dt: {
                                [Op.eq]: moment().format("YYYY-MM-DD HH:mm:00")
                            }
                        },
                    },
                    raw: true,
                })
                
                const tokenArr = await userToken.map(usertoken => usertoken.fcm_token);

                let payload = {
                    notification: {
                        title: '[회의하자] 회의 종료알림',
                        body : `현재 진행 중인 회의가 종료 되었습니다.`,
                      },
                      data: {
                        type:  '',
                        url:  ''
                      }
                }
            
                let options = {}
            
                try {
                    if (tokenArr.length > 0) {
                        await firebase.messaging().sendToDevice(tokenArr, payload, options);
                    }
                } catch (error) {
                    console.error(error);
                }


           } catch (error) {
               
               console.error(error);

           }  

        });        
    }

}

module.exports = scheduleJob;