const { Joi } = require('celebrate');

const getOne = {
  params: {
    id: Joi.string().alphanum().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id').required()
  }
};

const create = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('pending', 'done').required(),
    due_date: Joi.date().timestamp().required()
  }
};

const update = {
  params: {
    id: Joi.string().alphanum().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id').required()
  },
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().valid('pending', 'done').required(),
    due_date: Joi.date().timestamp().required()
  }
};

const remove = {
  params: {
    id: Joi.string().alphanum().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id').required()
  }
};

module.exports = {
  getOne, 
  create,
  update,
  remove
};