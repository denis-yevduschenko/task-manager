const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const config = require('./config/database');
const passport = require('passport');

const index = require('./routes/index');
const tasks = require('./routes/tasks');
const users = require('./routes/users');

const port = process.env.PORT || 3000;
const app = express();

mongoose.Promise = Promise;
mongoose.connect(config.database);


//View Engine
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');


// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

// Passport config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Set Static Folder
const staticFilesPath = express.static(path.join(__dirname, 'client'));
app.use(staticFilesPath);


//Body Parse MD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Entry point
app.use('/', index);
//REST API
app.use('/api', tasks);
app.use('/users', users);


app.listen(port, function () {
    console.log('server started on port ' + port);
});

