const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn, isAuthenticated } = require('../passport/middlewares');
const models = require('../models');
const jwt = require('jsonwebtoken');
const router = express.Router();
const localStorage = require('localStorage');
const {createJsonResult} = require('../utils/common');


router.post('/join', isNotLoggedIn, async (req, res, next) =>  {
    const {user_email, password } = req.body;
    try {
        const exUser = await models.Ch_user.findOne({ where: {user_email } });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }

        const hash = await bcrypt.hash(password, 12);
        await models.Ch_user.create({
            user_email,
            password : hash
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


router.post('/login', isNotLoggedIn, (req, res, next) =>  {
    //middleware
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.log(authError);
            return next(authError);
        }

        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }

        //req.login을 하면 /passport/index.js의 serializeUser 실행
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }

            //session cookie를 브라우저로 보냄
            return res.redirect('/');
        });

    })(req, res, next);
});

router.post('/signin', async (req, res) => {
    
    try{
        let user = await models.Ch_user.findOne({
            where : {
                user_email : req.body.user_email
            }
        });

        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            if(result) {
                let token = jwt.sign({
                    id : user.user_email
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                    issuer: 'hwae-ee'
                });

                res.status(200).json({result: 'success', token : token});

            } else {
                res.status(400).json(createJsonResult(400, 'not found user', ''));
            }
        }


    }catch(err){
        console.error(err);
        res.status(500).json(createJsonResult(500, 'fail', ''));
    }
}
);


router.get('/logout', isAuthenticated(), (req, res) => {
    //for ssr
    //req.logout();   //req.user 객체 제거
    req.session.destroy();  //세션정보 삭제
    res.status(200).json(createJsonResult(200, 'logout success', ''));
});

module.exports = router;

