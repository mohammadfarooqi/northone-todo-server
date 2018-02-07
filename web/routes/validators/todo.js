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
    status: Joi.string().valid('pending', 'done'),
    due_date: Joi.date().timestamp().required(),
    reminder: Joi.object().keys({
      email: Joi.string().email()
    }).optional(),
    category_id: Joi.string().alphanum().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id').optional()
  }
};

const update = {
  params: {
    id: Joi.string().alphanum().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id').required()
  },
  body: {
    title: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid('pending', 'done'),
    due_date: Joi.date().timestamp(),
    reminder: Joi.object().keys({
      email: Joi.string().email()
    }).optional(),
    category_id: Joi.string().alphanum().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, '_id').optional()
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