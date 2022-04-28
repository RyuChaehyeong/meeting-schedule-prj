const passport = require('passport');

// for SSR
exports.isLoggedIn = (req, res, next) => {   
    if (req.isAuthenticated()) {
        return passport.authenticate('local', {session : false});
    } else {
        res.status(403).send('Status: Not Logged In');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('Status: Logged In')
        res.redirect(`/?error=${message}`);
    }
};

// for api
exports.isAuthenticated = (req, res, next) => {       
    return passport.authenticate('jwt', {session : false});
};

