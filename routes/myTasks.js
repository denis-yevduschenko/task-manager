var express = require('express');
var router = express.Router();

let Task = require('../models/task');
router.get('/task/:id', function (req, res, next) {
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
                $match: { _id : 1 }
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
