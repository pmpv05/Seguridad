const users = require('./users');

const resourceRoutes = [users];

module.exports = router => {
  resourceRoutes.forEach(routes => routes(router));
  return router;
};
