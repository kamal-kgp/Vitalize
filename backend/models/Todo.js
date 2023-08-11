const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['not-started', 'on-going', 'completed'],
      default: 'not-started',
    },
  });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;