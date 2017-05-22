/* eslint-disable no-console */

// groups-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');

  db.schema.createTableIfNotExists('groups', table => {
    table.increments('id');
    table.string('name');
    table.string('color');
  })
  .then(() => console.log('Updated groups table'))
  .catch(e => console.error('Error updating groups table', e));

  return db;
};
