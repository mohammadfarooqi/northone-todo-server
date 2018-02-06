const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STATUS_TYPES = ['pending', 'done'];

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: STATUS_TYPES,
    default: 'pending'
  },
  due_date: {
    type: Date,
    required: true
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
