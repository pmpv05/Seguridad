const users = require('./users');
const sessions = require('./sessions');
const files = require('./files');

const resourceRoutes = [users, sessions];

module.exports = router => {
  resourceRoutes.forEach(routes => routes(router));
  return router;
};
