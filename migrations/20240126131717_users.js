/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id', { useBinaryUuid: false, primaryKey: true })
    table.string('email').notNullable().unique()
    table.string('alias').notNullable().defaultTo('')
    table.string('password').notNullable()
    table.string('role').notNullable().defaultTo('prospect')
    table.timestamp('lastLoginAt').nullable()
    table.timestamp('archivedAt').nullable()
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('users')
}
