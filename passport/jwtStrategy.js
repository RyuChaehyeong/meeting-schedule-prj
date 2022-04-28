const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const models = require('../models');

module.exports = () => {
        passport.use(new JWTStrategy({
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : process.env.JWT_SECRET
    }, async (payload, done) => {
        console.log('@@@@@@@@@@');
            let user = await models.Ch_user.findOne({
                where : {
                    user_email : payload.id
                }
            });
            console.log(user);
            if(!user){
                return done(null, false);
            }else {
                return done(null, user);
            }
        }
    ));

}

