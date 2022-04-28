const Sequelize = require('sequelize');

module.exports = class Ch_schedule extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id : {
                type : Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement : true,
                comment : '스케줄id'
            },
            eventType : {
                type : Sequelize.STRING(50),
                allowNull : false,
                comment : '이벤트타입'
            },
            exeDate : {
                type : Sequelize.DATE,
                allowNull : false,
                comment : '실행일시'
            },
            exeCnt : {
                type : Sequelize.INTEGER,
                allowNull : false,
                comment : '실행건수'
            },
            exeResult : {
                type : Sequelize.STRING(20),
                allowNull : false,
                comment : '실행결과'
            },
            log : {
                type : Sequelize.STRING(100),
                allowNull : false,
                comment : '로그'
            },
        }, {
            sequelize,
            modelName : 'Ch_schedule',
            tableName : 'ch_schedules',
            underscored: true,
            timestamps: true, 
        });
    }




}