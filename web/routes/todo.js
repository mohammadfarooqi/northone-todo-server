const Todo = require('../models/todo');

//getAll
const getAll = (req, res) => {
  Todo.find()
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.error('Error in Todo getAll: ', JSON.stringify(err));
      return res.statusCode(500).json({ message: 'An Error occured in getAll todos', error: JSON.stringify(err) });
    });
};

//getOne
const getOne = (req, res) => {
  return res.json({ message: 'Test Hello World Route!' });
};

//create
const create = (req, res) => {
  Todo.create({ name: 'First Test Todo'})
    .then((result) => {
      return res.json({ message: JSON.stringify(result) });
    })
    .catch((err) => {
      console.log(err);
      return res.statusCode(400).json({ message: 'Error: ' + JSON.stringify(err) });
    });
};

//update
const update = (req, res) => {
  return res.json({ message: 'Test Hello World Route!' });
};

//delete
const remove = (req, res) => {
  return res.json({ message: 'Test Hello World Route!' });
};

module.exports = {
  getAll, 
  getOne,
  create,
  update,
  remove
};