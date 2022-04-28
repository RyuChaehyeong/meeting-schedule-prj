const Sequelize = require('sequelize');

module.exports = class Ch_meet_rsrv extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            rsrv_sn : {
                type : Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement : true,
                comment : '예약아이디'
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
            
        }, {
            sequelize,
            modelName : 'Ch_meet_rsrv',
            tableName : 'ch_meet_rsrvs',
            underscored: true,
            paranoid: true, //deleted_at : true
            timestamps: true, //createdAt, updatedAt
        });
    }

    static associate(db) {
        //belongsTo가 있는 모델에 foreignKey 컬럼이 추가, targetKey는 N:1 중 1의 컬럼
        db.Ch_meet_rsrv.belongsTo(db.Ch_user, {foreignKey: 'user_email', targetKey: 'user_email'});
        db.Ch_meet_rsrv.belongsTo(db.Ch_meet_room, {foreignKey: 'room_cd', targetKey: 'room_cd'});

    }


}