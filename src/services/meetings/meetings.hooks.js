const { authenticate } = require('feathers-authentication').hooks
const { decamelizeModel, camelizeModel } = require('../../hooks/camelizers')

module.exports = {
  before: {
    all: [decamelizeModel()],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [camelizeModel()],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
