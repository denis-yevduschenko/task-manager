const express = require('express');
const util = require('util');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const config = require('../config/database');

let User = require('../models/user');

router.post('/register', function (req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const confirm = req.body.confirm;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('username', 'Username must be at least 5 characters').len(5, 30);
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be at least 6 characters').len(6, 30);
    req.checkBody('confirm', 'Passwords do not match').equals(password);

    req.getValidationResult().then(function(result) {
        if(!result.isEmpty()){
            res.json(JSON.stringify(result.array()));
        } else {
            let newUser = new User({
                name:name,
                email:email,
                username:username,
                password:password,
                auth_token:bcrypt.hashSync(password + config.secret)
            });

            bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password, salt, function(err, hash){
                    if(err){
                        console.log(err);
                        return;
                    }
                    newUser.password = hash;
                    newUser.save(function(err){
                        if(err){
                            res.send(err);
                        } else {
                            res.json(newUser);
                        }
                    });
                });
            });
        }
    });
});

router.post('/login',
    passport.authenticate('local'),
    function(req, res){
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.cookie('token', req.user.auth_token, {expires: new Date(Date.now() + 30*24*60*60*1000), httpOnly: true});
        res.json(req.user);
    }
);

module.exports = router;