const { celebrate } = require('celebrate');

const testRoute = require('./test');

const todoRoute = require('./todo');
const todoValidator = require('./validators/todo');

const categoryRoute = require('./category');
const categoryValidator = require('./validators/category');


module.exports = function (router) {

  // test route to make sure everything is working http://localhost:8080/api
  router.get('/test'      ,         testRoute.testRoute);
  router.get('/testCreate',   testRoute.testCreateRoute);

  // Todo Routes
  router.get(     '/todo'        ,                                   todoRoute.getAll);         // all todos
  router.get(     '/todo/:id'    , celebrate(todoValidator.getOne),  todoRoute.getOne);         // single todo
  router.post(    '/todo'        , celebrate(todoValidator.create),  todoRoute.create);         // create todo
  router.put(     '/todo/:id'    , celebrate(todoValidator.update),  todoRoute.update);         // update a todo
  router.delete(  '/todo/:id'    , celebrate(todoValidator.remove),  todoRoute.remove);         // delete todo

  // Category Routes
  router.get(     '/category'           ,                                       categoryRoute.getAll);            // all categories
  router.get(     '/category/todos'     ,                                       categoryRoute.getAllWithTodos);   // all categories with associated todos  
  router.get(     '/category/:id'       , celebrate(categoryValidator.getOne),  categoryRoute.getOne);            // single category
  router.get(     '/category/:id/todos' , celebrate(categoryValidator.getOne),  categoryRoute.getOneWithTodos);   // single category  
  router.post(    '/category'           , celebrate(categoryValidator.create),  categoryRoute.create);            // create category
  router.put(     '/category/:id'       , celebrate(categoryValidator.update),  categoryRoute.update);            // update a category
  router.delete(  '/category/:id'       , celebrate(categoryValidator.remove),  categoryRoute.remove);            // delete category
};