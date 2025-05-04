const pool = require('../database/pg.database');

async function getAllTasks() {
    const res = await pool.query('SELECT * FROM tasks');
    return res.rows;
}

async function addTask(task) {
    const res = await pool.query(
        'INSERT INTO tasks (text, completed) VALUES ($1, $2) RETURNING *',
        [task.text, task.completed]
    );
    return res.rows[0];
}

async function updateTask(id, task) {
    await pool.query(
        'UPDATE tasks SET text = $1, completed = $2 WHERE id = $3',
        [task.text, task.completed, id]
    );
}

async function deleteTask(id) {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
}

module.exports = { getAllTasks, addTask, updateTask, deleteTask };
