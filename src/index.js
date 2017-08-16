/* eslint-disable no-console */
require('dotenv').config()

const server = require('./server').app
const port = server.get('port')

server.listen(port)

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...')
  })
  console.info('✅  Server-side HMR Enabled!')
}

process.on('unhandledRejection', (reason, p) =>
  server.logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  server.logger.info(
    `Feathers application started on ${server.get('host')}:${port}`
  )
)

export default server
