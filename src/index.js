/* eslint-disable no-console */

const winston = require('winston')
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      name: 'debug-console',
      level: 'debug',
      prettyPrint: object => JSON.stringify(object),
      handleExceptions: true,
      json: true,
      colorize: true
    })
  ],
  exitOnError: false // don't crush no error
})
const server = require('./server')
const port = server.get('port')

server.listen(port)

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...')
  })
  console.info('✅  Server-side HMR Enabled!')
}

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info(`Feathers application started on ${server.get('host')}:${port}`)
)

export default server
