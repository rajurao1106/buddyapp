const express = require('express');
const { allTasks } = require('../controller/allTasks.cjs');
const { deleteTask } = require('../controller/deleteTask.cjs');
const { newTask } = require('../controller/newTask.cjs');
const { updateTask } = require('../controller/updateTask.cjs');
const router = express.Router();

router.get('/alltasks', allTasks);
router.post('/newtask', newTask);
router.delete('/deletetask', deleteTask);
router.patch('/updatetask', updateTask);

module.exports = router;