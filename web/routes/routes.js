const testRoute = require('./testRoute');

module.exports = function (router) {

  // test route to make sure everything is working http://localhost:8080/api
  router.get('/test', testRoute.testRoute);
  router.get('/testCreate', testRoute.testCreateRoute);

};