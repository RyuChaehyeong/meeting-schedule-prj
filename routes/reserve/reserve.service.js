'use strict';
const models = require('../../models');
const Sequelize = require('sequelize');
const moment = require('moment');
moment().format("YYYY-MM-DD");
const {createJsonResult} = require('../../utils/common');

exports.roomList = async (req, res) => {
    try {
        const rows = await models.Ch_meet_rsrv.findAll({
            attributes: 
                ['rsrv_sn','user_email', ['start_dt', 'start'], ['end_dt', 'end'], ['room_cd', 'title'], 'headnum']
            ,
            where: {room_cd : req.params.room_cd},
            include : {
                model : models.Ch_meet_room,
                attributes : ['room_name'],
            },
        })
        ;

        if (rows) {
            res.status(200).json(createJsonResult(200, 'read success', rows));
    
        } else {
            res.status(400).json(createJsonResult(400, 'data search fail', ''));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }
}


exports.get = async (req, res) => {
    try {
        const rows = await models.Ch_meet_rsrv.findOne({
            attributes: 
                ['rsrv_sn','user_email', ['start_dt', 'start'], ['end_dt', 'end'], ['room_cd', 'title'], 'headnum']
            ,
            where: {rsrv_sn : req.params.rsrv_sn},
            include : {
                model : models.Ch_meet_room,
                attributes : ['room_name'],
            },
        })
        ;

        if (rows) {
            res.status(200).json(createJsonResult(200, 'read success', rows));
    
        } else {
            res.status(400).json(createJsonResult(400, 'data search fail', ''));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }
}

exports.list = async (req, res) => {
    try {
        const rows = await models.Ch_meet_rsrv.findAll({
            attributes: 
                ['rsrv_sn','user_email', ['start_dt', 'start'], ['end_dt', 'end'], ['room_cd', 'title']]
            ,
            include : {
                model : models.Ch_meet_room,
                attributes : ['room_name'],
            },
        });
        

        if (rows) {
            res.status(200).json(createJsonResult(200, 'read success', rows));
            

        } else {
            res.status(400).json(createJsonResult(400, 'data search fail', ''));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }
}

exports.mylist = async (req, res) => {
    try {
        const rows = await models.Ch_meet_rsrv.findAll({
            attributes: 
                ['rsrv_sn','user_email', ['start_dt', 'start'], ['end_dt', 'end'], ['room_cd', 'title']]
            ,
            where : {
                user_email : req.user.user_email                
            },

            include : {
                model : models.Ch_meet_room,
                attributes : ['room_name'],
            },

        });

        if (rows) {
            res.status(200).json(createJsonResult(200, 'read success', rows));
        } else {
            res.status(400).json(createJsonResult(400, 'data search fail', ''));
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }
}




exports.create = async (req, res) => {
    console.log(req.body);
    const Op = Sequelize.Op;
    try {
        const resYn =  await models.Ch_meet_rsrv.count({
            where : {
                room_cd : req.body.room_cd,
                [Op.and] : [
                    {
                        start_dt: {
                            [Op.lt]: req.body.end_dt
                        }
                    },
                    {    end_dt : {
                            [Op.gt]: req.body.start_dt
                        },
                    }
                ]
            },
        });

        if (resYn === 0) {

            const rsrvInfo = {
                user_email : req.user.user_email,
                room_cd : req.body.room_cd,
                start_dt : req.body.start_dt,
                end_dt : req.body.end_dt,
                headnum : req.body.headnum,
            };            
    
            console.log(rsrvInfo);
            const rows = await models.Ch_meet_rsrv.create(rsrvInfo);
            if (rows) {
                res.status(200).json(createJsonResult(200, 'create success', rows));
            } else {
                res.status(400).json(createJsonResult(400, 'insert data fail', ''));
            }

        } else {
            res.status(400).json(createJsonResult(400, 'already exist', ''));
        }
        

    } catch (error) {

        console.log(error);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }
    



}

exports.update = async (req, res) => {

    const Op = Sequelize.Op;

    try {
        const result = await models.Ch_meet_rsrv.findOne({
            where: {rsrv_sn : req.params.rsrv_sn}
        });                

        if (result) { 

            const resYn =  await models.Ch_meet_rsrv.count({
                where : {
                    room_cd : req.body.room_cd,
                    [Op.and] : [
                        {
                            start_dt: {
                                [Op.lt]: req.body.end_dt
                            }
                        },
                        {    end_dt : {
                                [Op.gt]: req.body.start_dt
                            },
                        }
                    ]
    
                },
                raw: true,
            });

            if (resYn === 0) {
                result.room_cd = req.body.room_cd,
                result.start_dt = req.body.start_dt,
                result.end_dt = req.body.end_dt,
                result.headnum = req.body.headnum,
    
                
                await result.save();
                
                await res.status(200).json(createJsonResult(200, 'update success', ''));
            } else {
                res.status(400).json(createJsonResult(400, 'already exist', ''));
            }
           

        } else {
            await res.status(400).json(createJsonResult(400, 'no data - rsrv_sn: ' + req.params.rsrv_sn, ''));
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }
}




exports.delete = async (req, res) => {
    try {
        const rows = await models.Ch_meet_rsrv.destroy({
            where: {rsrv_sn : req.params.rsrv_sn}
        });

        if (rows) {
            res.status(200).json(createJsonResult(200, 'delete success', rows));
        } else {
            res.status(400).json(createJsonResult(400, 'no data - rsrv_sn: ' + req.params.rsrv_sn, ''));
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }
}


