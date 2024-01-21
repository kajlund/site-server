/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('taglinks', (table) => {
    table.uuid('id', { useBinaryUuid: false, primaryKey: true })
    table.uuid('tagId', { useBinaryUuid: false }).references('id').inTable('tags').notNullable().onDelete('CASCADE')
    table.uuid('linkId', { useBinaryUuid: false }).references('id').inTable('links').notNullable().onDelete('CASCADE')
    table.timestamps(true, true, true)
    table.index(['tagId', 'linkId'], 'ix_taglink', {
      indexType: 'unique',
    })
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('taglinks')
}
