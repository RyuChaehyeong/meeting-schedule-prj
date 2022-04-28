const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const models = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'user_email', //req.body.user_email
        passwordField: 'password', //req.body.password
    }, async (user_email, password, done) => {

        try {
            const exUser = await models.Ch_user.findOne({ where: {user_email} });
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                } else {
                    done(null, false, {message: '이메일과 비밀번호를 확인해주세요.'});
                }
            } else {
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
}

