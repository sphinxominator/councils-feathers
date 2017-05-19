/* eslint-disable no-console */

// meetings-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');

  db.schema.createTableIfNotExists('meetings', table => {
    table.increments('id');
    table.string('text');
  })
  .then(() => console.log('Updated meetings table'))
  .catch(e => console.error('Error updating meetings table', e));

  return db;
};
