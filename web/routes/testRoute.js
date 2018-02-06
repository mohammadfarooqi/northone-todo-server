const Todo = require('../models/todo');

const testRoute = (req, res) => {
  return res.json({ message: 'Test Hello World Route!' });
}

const testCreateRoute = (req, res) => {
  Todo.create({ name: 'First Test Todo'})
    .then((result) => {
      return res.json({ message: JSON.stringify(result) });
    })
    .catch((err) => {
      console.log(err);
      return res.statuCode(400).json({ message: 'Error: ' + JSON.stringify(err) });
    });
}

module.exports = {
  testRoute,
  testCreateRoute
}