// Initializes the `users` service on path `/users`
//const createService = require('feathers-knex');
import Service from './users.class';

const hooks = require('./users.hooks');
const filters = require('./users.filters');

module.exports = function () {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/api/users', new Service());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/users');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
