import { hooks } from 'feathers-authentication';

module.exports = {
  before: {
    all: [],
    find: [
      hooks.authenticate('jwt')
    ],
    get: [
      hooks.authenticate('jwt')
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
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
};
