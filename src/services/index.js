const authentication = require('./authentication/authentication.service.js');
const graphql = require('./graphql/graphql.service.js');
const meetings = require('./meetings/meetings.service.js');
const users = require('./users/users.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(authentication);
  app.configure(meetings);
  app.configure(graphql);
  app.configure(users);
};
