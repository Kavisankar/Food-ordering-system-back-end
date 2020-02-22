const dishResolver = require('./dish');
const orderResolver = require('./order');
const authResolver = require('./auth');

module.exports = {
  ...authResolver,
  ...dishResolver,
  ...orderResolver
};
