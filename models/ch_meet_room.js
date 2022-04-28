const Sequelize = require('sequelize');

module.exports = class Ch_meet_room extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            room_cd : {
                type : Sequelize.STRING(10),
                primaryKey : true,
                comment : '회의실코드'
            },
            location : {
                type : Sequelize.STRING(100),
                allowNull : false,
                unique : true,
                comment : '위치'
            },
            room_name : {
                type : Sequelize.STRING(50),
                allowNull : false,
                unique : true,
                comment : '회의실명'
            },
            capacity : {
                type : Sequelize.INTEGER,
                allowNull : false,
                comment : '정원'
            },
            
        }, {
            sequelize,
            modelName : 'Ch_meet_room',
            tableName : 'ch_meet_rooms',
            underscored: true,
            paranoid: true, //deleted_at : true
            timestamps: true, //createdAt, updatedAt
        });
    }

    static associate(db) {
        //Ch_meet_rsrv의 room_cd (foreignKey), Ch_meet_room room_cd(sourceKey)
        //hasOne은 foreign key 기준으로 hasOne과 belongsTo를 정함
        //db.Ch_meet_room.hasOne(db.Ch_meet_rsrv, {foreignKey: 'room_cd', sourceKey: 'room_cd'})
        db.Ch_meet_room.hasMany(db.Ch_meet_rsrv, {foreignKey: 'room_cd', sourceKey: 'room_cd'})
    }

}