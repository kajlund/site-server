/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('proverb_tags', (table) => {
    table.uuid('id', { useBinaryUuid: false, primaryKey: true })
    table
      .uuid('proverbId', { useBinaryUuid: false })
      .references('id')
      .inTable('proverbs')
      .notNullable()
      .onDelete('CASCADE')
    table.uuid('tagId', { useBinaryUuid: false }).references('id').inTable('tags').notNullable().onDelete('CASCADE')
    table.timestamps(true, true, true)
    table.index(['proverbId', 'tagId'], 'ix_proverb_tags', {
      indexType: 'unique',
    })
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('proverb_tags')
}
