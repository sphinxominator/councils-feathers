const config = require('config')
const dbSettings = config.get('postgres')

module.exports = {
  development: dbSettings,
  production: dbSettings
}
