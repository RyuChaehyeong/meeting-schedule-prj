//const JWTStrategy = require('passport-jwt').Strategy;
//const ExtractJwt = require('passport-jwt').ExtractJwt;
//const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const local = require('./localStrategy');
const jwtStrategy = require('./jwtStrategy');
const models = require('../models');


module.exports = () => {

    passport.serializeUser( (user, done) => {
        console.log('serialize session');         
        done(null, user.user_email); //session에 user email만 저장
    });

    
    //로그인 이후 그 다음 요청부터 app.js의 passport(session)이 실행될 때 deserializeUser가 실행
    passport.deserializeUser((id, done) => {
        models.Ch_user.findOne({
            where : {user_email : id}
        })
        .then(user => done(null, user.get({plain: true}))) //req.user로 접근 가능, req.isAuthenticated 는 true
        .catch(err => done(err));
        console.log('deserialize session');
       
    });


    local();
    jwtStrategy();
}
