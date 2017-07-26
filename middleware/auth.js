let User = require('../models/user');

module.exports = function auth(req, res, next) {
    let cookieToken = req.cookies.token;
    if (cookieToken){
        let query = {auth_token: cookieToken};
        User.findOne(query, function (err, user) {
            if(err) throw err;
            if (user) {
                req.user = user;
            }
            next();
        })
    } else {
        next();
    }
};