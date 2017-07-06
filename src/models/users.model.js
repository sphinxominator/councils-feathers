/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function(app) {
  const db = app.get('knexClient')

  db.schema
    .createTableIfNotExists('users', table => {
      table.increments('id')
      table.string('text')
    })
    .then(() => console.log('Updated users table'))
    .catch(e => console.error('Error updating users table', e))

  return db
}
