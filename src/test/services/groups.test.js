const assert = require('assert')
const app = require('../../server')

describe("'groups' service", () => {
  it('registered the service', () => {
    const service = app.service('api/groups')

    assert.ok(service, 'Registered the service')
  })
})
