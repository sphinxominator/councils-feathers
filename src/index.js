/* eslint-disable no-console */
require('dotenv').config()

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
  server.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  server.info(`Feathers application started on ${server.get('host')}:${port}`)
)

export default server
