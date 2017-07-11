var express = require('express');
var router = express.Router();



router.get('/', function (req, resp, next) {
    resp.render('index');
});



module.exports = router;