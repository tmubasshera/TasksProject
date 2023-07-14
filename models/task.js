const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
