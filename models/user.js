let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let autoIncrement = require('mongoose-auto-increment');
const config = require('../config/database');

const connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

let user = new Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    auth_token: {
        type: String
    }
});

user.plugin(autoIncrement.plugin, 'User');

module.exports = connection.model('User', user);
