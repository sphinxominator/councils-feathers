const authentication = require('./authentication/authentication.service.js')
const graphql = require('./graphql/graphql.service.js')
const meetings = require('./meetings/meetings.service.js')
const users = require('./users/users.service.js')

const groups = require('./groups/groups.service.js')

module.exports = function() {
  const app = this
  app.configure(authentication)
  app.configure(meetings)
  app.configure(users)
  app.configure(groups)
  app.configure(graphql)
}
