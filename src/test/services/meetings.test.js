const assert = require('assert')
const app = require('../../server')

describe("'meetings' service", () => {
  it('registered the service', () => {
    const service = app.service('api/meetings')

    assert.ok(service, 'Registered the service')
  })
})
