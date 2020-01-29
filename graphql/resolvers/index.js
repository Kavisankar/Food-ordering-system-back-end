const dishResolver = require('./dish');
const orderResolver = require('./order');

module.exports = {
  ...dishResolver,
  ...orderResolver
};
