const assert = require('assert')
const rp = require('request-promise')
const app = require('../server')

describe('Feathers application tests', () => {
  beforeAll(function(done) {
    this.server = app.listen(3030)
    this.server.once('listening', () => done())
  })

  afterAll(function(done) {
    this.server.close(done)
  })
})
