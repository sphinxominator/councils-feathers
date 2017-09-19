const authentication = require('./authentication/authentication.service.js')
const auth0 = require('./auth0/auth0.service.js')
const graphql = require('./graphql/graphql.service.js')
const meetings = require('./meetings/meetings.service.js')
const users = require('./users/users.service.js')
const groups = require('./groups/groups.service.js')
const attendants = require('./attendants/attendants.service.js')

module.exports = function() {
  const app = this
  app.configure(authentication)
  app.configure(meetings)
  app.configure(users)
  app.configure(groups)
  app.configure(attendants)
  app.configure(auth0)
  app.configure(graphql)
}
