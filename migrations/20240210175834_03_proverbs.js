/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */ up
export function up(knex) {
  return knex.schema.createTable('proverbs', (table) => {
    table.uuid('id', { useBinaryUuid: false, primaryKey: true })
    table.string('title').nullable().defaultTo('')
    table.text('content').nullable().defaultTo('')
    table.string('description').nullable().defaultTo('')
    table.string('author').nullable().defaultTo('').index()
    table.string('category').nullable().defaultTo('').index()
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('proverbs')
}
