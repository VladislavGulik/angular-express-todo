const express = require('express');
const router = express.Router();

const Task = require('../models/tasks');

router.get('/', function (req, res) {
    Task.getTasks().then(function(result) {
        res.send(result);
    });
});

module.exports = router;
