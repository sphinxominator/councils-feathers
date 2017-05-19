const assert = require('assert');
const app = require('../../src/app');

describe('\'auth0\' service', () => {
  it('registered the service', () => {
    const service = app.service('auth0');

    assert.ok(service, 'Registered the service');
  });
});
