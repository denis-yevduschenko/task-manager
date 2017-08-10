var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://zavitova:zavitushochka12@ds023373.mlab.com:23373/mytasklistzavitova', ['tasks']);
const Task = require('../models/task');

//Get all tasks
router.get('/tasks', function (req, res, next) {
    Task.find(function (err, tasks) {
        if (err) {
            resp.send(err);
        }

        res.json(tasks);
    })

});


//Get Single Tasks
router.get('/tasks/:id', function (req, resp, next) {

    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            resp.send(err);
        }

        resp.json(task);
    })

});


//Save Task
router.post('/task', function (req, res, next) {
    var task = req.body;
    let newTask = new Task(task);
    if (!newTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        newTask.save(task, function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        })
    }
});


//Delete Task
router.delete('/tasks/:id', function (req, res, next) {

    Task.remove({ _id: Number(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        res.json(task);
    })

});


//Update
router.put('/tasks/:id', function (req, resp, next) {
    var task = req.body;
    var updatedTask = {};

    if (task.isDone) {
        updatedTask.isDone = task.isDone;
    }

    if (task.title) {
        updatedTask.title = task.title;
    }

    if (task.detail) {
        updatedTask.detail = task.detail;
    }
    if (task.implementer) {
        updatedTask.implementer = task.implementer;
    }

    console.log(updatedTask);
    if (!updatedTask) {
        resp.status(400);
        res.json({
            "error": "Bad Data"
        })
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updatedTask, {}, function (err, task) {
            if (err) {
                resp.send(err);
            }

            resp.json(task);
        })
    }
});

// Get Concrete Task
router.get('/task/:id', function (req, res, next) {
    let id = Number(req.params.id);
    Task.aggregate([
            {
                $lookup:{
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author_obj"
                }
            },
            {
                $lookup:{
                    from: "users",
                    localField: "assignee",
                    foreignField: "_id",
                    as: "assignee_obj"
                }
            },
            {
                $match: { _id : id }
            },
            {
                $unwind: "$author_obj"
            },
            {
                $unwind: "$assignee_obj"
            },
            {
                $project : { _id: 1, title : 1, description : 1, created_at : 1, author: 1, assignee: 1, status: 1, deadline: 1, sub_task: 1, author_name: "$author_obj.name", assignee_name: "$assignee_obj.name" }
            }
        ],

        function (err, task) {
            if (err) {
                res.send(err);
            }
            res.json(task);
        })
});

module.exports = router;