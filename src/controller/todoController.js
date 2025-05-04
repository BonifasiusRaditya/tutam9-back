const repo = require('../repository/todoRepository');
const { successResponse, errorResponse } = require('../utils/baseResponse');

async function getTasks(req, res) {
    try {
        const tasks = await repo.getAllTasks();
        res.json(successResponse('Tasks retrieved', tasks));
    } catch (err) {
        res.status(500).json(errorResponse('Failed to retrieve tasks'));
        console.error(err);
    }
}

async function createTask(req, res) {
    try {
        const task = await repo.addTask({ text: req.body.text, completed: false });
        res.json(successResponse('Task added', task));
    } catch (err) {
        res.status(500).json(errorResponse('Failed to add task'));
    }
}

async function updateTask(req, res) {
    try {
        const { id, text, completed } = req.body;
        const parsedId = parseInt(id, 10);
        const parsedCompleted = completed === 'true' || completed === true;

        await repo.updateTask(parsedId, { text, completed: parsedCompleted });

        res.json(successResponse('Task updated'));
        console.log('Task updated:', { id: parsedId, text, completed: parsedCompleted });
    } catch (err) {
        console.error(err);
        res.status(500).json(errorResponse('Failed to update task'));
    }
}


async function deleteTask(req, res) {
    try {
        const id = req.params.id;
        await repo.deleteTask(id);
        res.json(successResponse('Task deleted'));
    } catch (err) {
        res.status(500).json(errorResponse('Failed to delete task'));
    }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
