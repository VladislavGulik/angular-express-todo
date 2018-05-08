const express = require('express');
const router = express.Router();

const Task = require('../models/tasks');

router.get('/:id', function (req, res) {
    Task.getTaskById(req.params.id).then(function (result) {
        res.send(result);
    });
});

router.put('/:id', function (req, res) {
    Task.updateTask(req.params.id, { $set: req.body }).then(function (result) {
        res.send(result);
    });
});

router.post('/', function (req, res) {
    console.log('START', req.body);
    // const task = req.body.task;
    // const isSelected = req.body.isSelected;
    // req.checkBody('task', 'task is required').notEmpty();
    // req.checkBody('isSelected', 'isSelected is compl').notEmpty();
    // const errors = req.validationErrors();
    const newTask = Task(req.body);
    Task.saveTasks(newTask, (err, task) => {
        // if (err) throw new Error(err);
        console.log('END');
        res.send("task");
    });
    // if (errors && errors.length) {
    //     console.log(errors);
    // } else {
    //     const newTask = Task({ task, isSelected });
    //     // req.flash('success_msg', 'Successfully registred');
    //     // res.redirect('/tasks');
    // }
    // Tasks.saveTasks(req.body).then(function(result) {
    //     res.send(result);
    // });
});

router.delete('/:id', function (req, response) {
    Task.deleteTask(req.params.id).then(res => {
        response.send('WOW!!!!');
    }, rej => {
        debugger;
    });
});

module.exports = router;
