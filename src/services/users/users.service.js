// Initializes the `users` service on path `/users`
//const createService = require('feathers-knex');
import Service from './users.class';

const hooks = require('./users.hooks');
const filters = require('./users.filters');

module.exports = function () {
  const app = this;

  fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: 'post',
    body: JSON.stringify({
      client_id: process.env.AUTH0_MANAGEMENT_ID,
      client_secret: process.env.AUTH0_MANAGEMENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: 'client_credentials'
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(response => response.json())
  .then(data => process.env.AUTH0_ACCESS_TOKEN = data.access_token)

  // Initialize our service with any options it requires
  app.use('/api/users', new Service());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('api/users');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
