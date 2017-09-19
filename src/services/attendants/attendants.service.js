// Initializes the `attendants` service on path `/attendants`
const createService = require('feathers-knex')
const hooks = require('./attendants.hooks')
const filters = require('./attendants.filters')

module.exports = function() {
  const app = this
  const Model = app.get('knexClient')
  const paginate = app.get('paginate')

  const options = {
    name: 'attendants',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/api/attendants', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/attendants')

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
