exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('communities', table => {
      table.increments('id').primary()
      table.string('slug')
    })
    .then(() =>
      knex.schema.table('groups', table =>
        table.integer('community_id').references('communities.id')
      )
    )
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('groups', table => table.dropColumn('community_id')),
    knex.schema.dropTable('communities')
  ])
}
