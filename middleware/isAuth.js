module.exports = function isAuthenticated(req, res, next) {
    if (req.user){
        next();
    } else {
        res.status(403);
        res.json('Access forbidden');
    }
};