const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('../passport/middlewares');

const router = express.Router();


//나의예약
router.get('/myRsrv', isNotLoggedIn, (req, res) => {

    res.render('reserve/myRsrv');
});

//주간일간예약현황
router.get('/dayAndWeekRsrv', isNotLoggedIn, (req, res) => {

    res.render('reserve/dayAndWeekRsrv');
});

//예약팝업
router.get('/makeRsrv', isNotLoggedIn, (req, res) => {
    const selectedDate = req.query.dt;
    res.render('reserve/makeRsrv', {selectedDate});
});

//예약확인 팝업
router.get('/checkRsrv', isNotLoggedIn, (req, res) => {
    const rsrv_sn = req.query.no;
    res.render('reserve/checkRsrv', {rsrv_sn});
});

//로그인 페이지
router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login', {
       title: '로그인',
       user: req.user
    });
});

//회원가입 페이지
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', {
       title: '회원가입',
       user: req.user,
       joinError: req.flash('joinError') 
    });
});


//메인페이지
router.get('/', (req, res, next) => {
    res.render('main', {
        title: 'Myapp',
        twits: [],
        user: req.user,
        loginError: req.flash('loginError'),
    });
});

//test
router.get('/profile', isLoggedIn, (req, res) => {
    console.log('11111' + req.user);
    console.log('11111' + req.user.user_email);
    res.render('profile', {title: 'my info-chyoo', user: req.user});
});

module.exports = router;