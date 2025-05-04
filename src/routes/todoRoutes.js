const express = require('express');
const router = express.Router();
const controller = require('../controller/todoController');

router.get('/', controller.getTasks);
router.post('/', controller.createTask);
router.put('/', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
