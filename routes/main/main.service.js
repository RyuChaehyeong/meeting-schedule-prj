'use strict';
exports.index = (req, res) => {
    console.log(req.user);
    res.render('index', {title: 'welcome'});
}
