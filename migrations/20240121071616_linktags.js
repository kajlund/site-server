/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('linktags', (table) => {
    table.uuid('id', { useBinaryUuid: false, primaryKey: true })
    table.uuid('linkId', { useBinaryUuid: false }).references('id').inTable('links').notNullable().onDelete('CASCADE')
    table.uuid('tagId', { useBinaryUuid: false }).references('id').inTable('tags').notNullable().onDelete('CASCADE')
    table.timestamps(true, true, true)
    table.index(['linkId', 'tagId'], 'ix_links_tags', {
      indexType: 'unique',
    })
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('linktags')
}
