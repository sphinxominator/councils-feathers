/* eslint-disable no-console */

// meetings-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function(app) {
  const db = app.get('knexClient')

  db.schema
    .createTableIfNotExists('meetings', table => {
      table.increments('id').primary()
      table.string('text')
      table.dateTime('date')
      table.integer('group_id').references('groups.id')
    })
    .then(() => console.log('Updated meetings table'))
    .catch(e => console.error('Error updating meetings table', e))

  return db
}
