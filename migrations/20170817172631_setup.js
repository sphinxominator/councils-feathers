exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('meetings', table => {
      table.increments('id').primary()
      table.dateTime('date')
      table.string('secret')
      table.string('summary_link')
      table.string('agenda_link')
      table.integer('group_id').references('groups.id').notNullable()
    }),
    knex.schema.createTable('groups', table => {
      table.increments('id')
      table.string('name')
      table.string('color')
    }),
    knex.schema.createTable('users', table => {
      table.string('id').primary()
    }),
    knex.schema.createTable('attendants', table => {
      table.increments('id')
      table.integer('meeting_id').references('meetings.id')
      table.string('user_id')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('attendants'),
    knex.schema.dropTable('meetings'),
    knex.schema.dropTable('groups'),
    knex.schema.dropTable('users')
  ])
}
