const Sequelize = require('sequelize');

module.exports = class Ch_user extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_sn : {
                type : Sequelize.INTEGER,
                primaryKey : true,
                autoIncrement : true,
                comment : '사용자 번호'
            },
            user_email : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true,
                comment : '사용자 이메일'
            },
            password : {
                type : Sequelize.STRING(100),
                allowNull : false,
                comment : '비밀번호'
            },
            fcm_token : {
                type : Sequelize.STRING(200),
                allowNull : false,
            }
            
        }, {
            sequelize,
            modelName : 'Ch_user',
            tableName : 'ch_users',
            underscored: true,
            timestamps: true, //createdAt, updatedAt
        });
    }

    static associate(db) {
        //Ch_meet_rsrv의 user_email (foreignKey), Ch_user의 user_email(sourceKey)
        db.Ch_user.hasMany(db.Ch_meet_rsrv, {foreignKey: 'user_email', sourceKey: 'user_email'})
    }



}