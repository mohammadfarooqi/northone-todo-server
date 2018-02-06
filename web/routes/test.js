const Todo = require('../models/todo');

const testRoute = (req, res) => {
  return res.json({ message: 'Test Hello World Route!' });
}

const testCreateRoute = (req, res) => {
  Todo.create({ title: 'My First Todo', description: 'Need to do these items 1 2 3', due_date: new Date()})
    .then((result) => {
      return res.json({ message: JSON.stringify(result) });
    })
    .catch((err) => {
      console.log(err);
      return res.statusCode(400).json({ message: 'Error: ' + JSON.stringify(err) });
    });
}

module.exports = {
  testRoute,
  testCreateRoute
}