// Initializes the `users` service on path `/users`
//const createService = require('feathers-knex');
import Service from './auth0.class'

module.exports = function() {
  const app = this

  // Initialize our service with any options it requires
  app.use('/api/auth0', new Service())

  /* Get our initialized service so that we can register hooks and filters
  const service = app.service('api/auth0')

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }*/
}
