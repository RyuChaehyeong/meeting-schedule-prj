require('dotenv').config();
const env = process.env;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  port: env.MYSQL_PORT,
  timezone: "+09:00",
  dialectOptions:{
    "dateStrings":true,            // 가져올 때 string으로 가져오기 
    "typeCast":true
  },
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  port: env.MYSQL_PORT,
  timezone: "+09:00",
  dialectOptions:{
    "dateStrings":true,            // 가져올 때 string으로 가져오기 
    "typeCast":true
  },
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  port: env.MYSQL_PORT,
  timezone: "+09:00",
  dialectOptions:{
    "dateStrings":true,            // 가져올 때 string으로 가져오기 
    "typeCast":true
  },
};

module.exports = { development, production, test };