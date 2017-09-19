// Initializes the `users` service on path `/users`
//const createService = require('feathers-knex');
const createService = require('feathers-knex')
const hooks = require('./users.hooks')
const filters = require('./users.filters')

module.exports = function() {
  const app = this
  const Model = app.get('knexClient')
  const paginate = app.get('paginate')

  const options = {
    name: 'users',
    Model,
    paginate
  }
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/users', createService(options))

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
