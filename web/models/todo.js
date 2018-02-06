const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const RESULT_TYPES = ['pending', 'complete'];

const todoSchema = new Schema({
  name: String
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
