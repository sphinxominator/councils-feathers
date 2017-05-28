/* eslint-disable no-console */
const logger = require('winston');

if(process.env.NODE_ENV !== 'production') {
  const config = require('dotenv').config();
}

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info(`Feathers application started on ${app.get('host')}:${port}`)
);
