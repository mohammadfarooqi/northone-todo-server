const Category = require('../models/category');
const Todo = require('../models/todo');

//getAll
const getAll = (req, res) => {
  Category.find()
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.error('Error in Category getAll: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in getAll categories', error: JSON.stringify(err) });
    });
};

const getAllWithTodos = (req, res) => {
  const final_result = [];

  Category.find().lean(true)
    .then(result => {
      return Promise.all(result.map((item, index) => {
        return new Promise((resolve, reject) => {
          const idx = index;
  
          getTodosByCategoryId(item._id)
            .then((todos) => {
              const temp = result[idx];
              temp['todos'] = todos;
      
              final_result.push(temp);

              resolve('done');
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        });
      }));
    })
    .then((result) => {
      return res.json(final_result);
    })
    .catch(err => {
      console.error('Error in Category getAllWithTodos: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in getAllWithTodos categories', error: JSON.stringify(err) });
    });
};

//getOne
const getOne = (req, res) => {
  const id = req.params.id;

  Category.findOne({ _id: id })
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.error('Error in Category getOne: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in getOne categories', error: JSON.stringify(err) });
    });
};

const getOneWithTodos = (req, res) => {
  const id = req.params.id;

  Category.findOne({ _id: id }).lean(true)
    .then(result => {
      return new Promise((resolve, reject) => {
        getTodosByCategoryId(result._id)
          .then((todos) => {
            result['todos'] = todos;

            resolve(result);
          })
          .catch(err => {
            console.error(err);
            reject(err);
          });
      });
    })
    .then(result => {
      return res.json(result);
    })
    .catch(err => {
      console.error('Error in Category getOneWithTodos: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in getOneWithTodos categories', error: JSON.stringify(err) });
    });
};

//create
const create = (req, res) => {
  const body = req.body;

  Category.create(body)
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.error('Error in Category create: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in create categories', error: JSON.stringify(err) });
    });
};

//update
const update = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  Category.findOneAndUpdate({ _id: id }, { $set: body }, { new: true })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      console.error('Error in Category update: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in update categories', error: JSON.stringify(err) });
    });
};

//delete
const remove = (req, res) => {
  const id = req.params.id;

  Category.remove({ _id: id })
    .then((result) => {
      return res.json({ message: 'Category delete successful for id ' + id});
    })
    .catch((err) => {
      console.error('Error in Todo remove: ', JSON.stringify(err));
      return res.status(500).json({ message: 'An Error occured in remove categories', error: JSON.stringify(err) });
    });
};

module.exports = {
  getAll,
  getAllWithTodos,
  getOne,
  getOneWithTodos,
  create,
  update,
  remove
};

// HELPER FUNCTIONS
function getTodosByCategoryId(category_id) {
  return new Promise((resolve, reject) => {
    Todo.find({ category_id }).lean(true)
      .then(todos => {
        resolve(todos);
      })
      .catch(err => {
        console.error('getAllWithTodos error: ', JSON.stringify(err));
        reject('getAllWithTodos error: ' + JSON.stringify(err));
      });
  });
}