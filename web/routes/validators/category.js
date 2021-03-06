const { Joi } = require('celebrate');

const getOne = {
  params: {
    id: Joi.string().alphanum().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id').required()
  }
};

const create = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
  }
};

const update = {
  params: {
    id: Joi.string().alphanum().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id').required()
  },
  body: {
    name: Joi.string(),
    description: Joi.string(),
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