// Initializes the `meetings` service on path `/meetings`
const createService = require('feathers-knex')
const hooks = require('./meetings.hooks')
const filters = require('./meetings.filters')

module.exports = function() {
  const app = this
  const Model = app.get('knexClient')
  const paginate = app.get('paginate')

  const options = {
    name: 'meetings',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/api/meetings', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/meetings')

  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
