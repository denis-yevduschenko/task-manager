const express = require('express');
const util = require('util');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

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
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm', 'Passwords do not match').equals(password);

    req.getValidationResult().then(function(result) {
        if(!result.isEmpty()){
            res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
        } else {
            var newUser = new User({
                name:name,
                email:email,
                username:username,
                password:password
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
        res.json( req.user);
    }
);

module.exports = router;