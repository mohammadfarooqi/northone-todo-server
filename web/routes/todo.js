const Todo = require('../models/todo');

//getAll
const getAll = (req, res) => {
  Todo.find()
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.error('Error in Todo getAll: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in getAll todos', error: JSON.stringify(err) });
    });
};

//getOne
const getOne = (req, res) => {
  const id = req.params.id;

  Todo.findOne({ _id: id })
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.error('Error in Todo getOne: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in getOne todos', error: JSON.stringify(err) });
    });
};

//create
const create = (req, res) => {
  const body = req.body;

  Todo.create(body)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.error('Error in Todo create: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in create todos', error: JSON.stringify(err) });
    });
};

//update
const update = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Todo.findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.error('Error in Todo update: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in update todos', error: JSON.stringify(err) });
    });
};

//delete
const remove = (req, res) => {
  const id = req.params.id;

  Todo.remove({ _id: id })
    .then((result) => {
      return res.json({ message: 'Todo delete successful for id ' + id});
    })
    .catch((err) => {
      console.error('Error in Todo remove: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in remove todos', error: JSON.stringify(err) });
    });
};

module.exports = {
  getAll, 
  getOne,
  create,
  update,
  remove
};