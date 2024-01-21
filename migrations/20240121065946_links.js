/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('links', (table) => {
    table.uuid('id', { useBinaryUuid: false, primaryKey: true })
    table.string('url').notNullable().unique()
    table.string('caption').notNullable().defaultTo('')
    table.text('description').notNullable().defaultTo('')
    table.integer('clicks').unsigned().notNullable().defaultTo(0)
    table.integer('likes').unsigned().notNullable().defaultTo(0)
    table.boolean('isFeatured').notNullable().defaultTo(false)
    table.datetime('deletedAt', { precision: 6 }).nullable().defaultTo(null)
    table.timestamps(true, true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('links')
}
