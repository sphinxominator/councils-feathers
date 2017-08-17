const knex = require('knex')

module.exports = function() {
  const app = this
  const { client, connection } = app.get('postgres')
  const db = knex({ client, connection })

  db.migrate
    .latest()
    .then(() => db.migrate.currentVersion())
    .then(version =>
      app.debug(`Ran migrations. We're now at version ${version}`)
    )

  app.set('knexClient', db)
}
