// Initializes the `meetings` service on path `/meetings`
const createService = require('feathers-knex');
const createModel = require('../../models/meetings.model');
const hooks = require('./meetings.hooks');
const filters = require('./meetings.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'meetings',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/meetings', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('meetings');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
