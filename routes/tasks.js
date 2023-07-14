const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET /tasks - Retrieve all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    if (req.accepts('json')) {
      // Respond with JSON for API requests
      res.json(tasks);
    } else {
      // Render the tasks.html page and pass the tasks as data
      res.render('tasks', { tasks });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /tasks - Create a new task
router.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    priority: req.body.priority,
    status: req.body.status
  });

  console.log(task.title);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /tasks/:id - Retrieve a specific task by ID
router.get('/tasks/:id', getTask, (req, res) => {
  res.json(res.task);
});

// PUT /tasks/:id - Update a specific task by ID
router.put('/tasks/:id', getTask, async (req, res) => {
  try {
    res.task.title = req.body.title;
    res.task.priority = req.body.priority;
    res.task.status = req.body.status;

    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /tasks/:id - Delete a specific task by ID
router.delete('/tasks/:id', getTask, async (req, res) => {
  try {
    await Task.deleteOne({ _id: res.task._id });
    res.json({ message: 'Task deleted' });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to retrieve a specific task by ID
async function getTask(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.task = task;
    next();
  } catch (err) {
    console.error('Error retrieving task:', err);
    return res.status(500).json({ message: 'Error retrieving task' });
  }
}

module.exports = router;
