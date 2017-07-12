const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const config = require('../config/database');

const connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);

const task = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: Number,
        required: true
    },
    assignee: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    sub_task: {
        type: Number,
        default: 0
    }
});

task.plugin(autoIncrement.plugin, 'Task');

module.exports = connection.model('Task', task);
