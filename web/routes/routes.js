const { celebrate } = require('celebrate');

const testRoute = require('./test');

const todoRoute = require('./todo');
const todoValidator = require('./validators/todo');

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
};