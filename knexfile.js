const config = require('config')
const dbSettings = config.get('postgres')

module.exports = {
  test: dbSettings,
  development: dbSettings,
  production: dbSettings
}
