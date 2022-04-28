const path = require('path');
const fs = require('fs');
const baseName = path.basename(module.filename);
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env]
const db = {};

//2개이상 database 연결 가능 ex) sequelize1, sequelize2
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Model init
fs.readdirSync(__dirname)
.filter(
    file =>
    file.indexOf(".") !== 0 &&
    file !== path.basename(__filename) &&
    file.slice(-3) === ".js"
)
.forEach(file => {
    const Model = require(path.join(__dirname, file));
    Model["init"](sequelize);
    db[Model.name] = Model;

})

//Association
Object.keys(db).forEach(modelName => {    
    if (db[modelName].associate) {
      db[modelName].associate(db);
    } 
}); 


module.exports = db;
