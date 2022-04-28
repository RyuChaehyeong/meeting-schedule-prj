const Sequelize = require('sequelize');

module.exports = class Ch_meet_backup extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            backup_id : {
                type : Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement : true,
                comment : '백업아이디'
            },
            rsrv_sn : {
                type : Sequelize.INTEGER,
                comment : '예약순번'
            },
            user_email : {
                type : Sequelize.STRING(20),
                allowNull : false,
                comment : '예약자이메일'
            },
            room_cd : {
                type : Sequelize.STRING(10),
                allowNull : false,
                comment : '회의실코드'
            },
            start_dt : {
                type : Sequelize.DATE,
                allowNull : false,
                comment : '시작일시'
            },
            end_dt : {
                type : Sequelize.DATE,
                allowNull : false,
                comment : '종료일시'
            },
            headnum : {
                type : Sequelize.INTEGER,
                allowNull : false,
                comment : '이용자수'
            },
            rsrv_created_at : {
                type : Sequelize.DATE,
                allowNull : false,
                comment : '최초예약일시'
            }, 
        }, {
            sequelize,
            modelName : 'Ch_meet_backup',
            tableName : 'ch_meet_backups',
            underscored: true,
            timestamps: true,
        });
    }

}