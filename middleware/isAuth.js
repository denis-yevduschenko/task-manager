module.exports = function isAuthenticated(req, res, next) {
    if (req.user)
        return next();

    res.status(403);
    res.json('Access forbidden');
};