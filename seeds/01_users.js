import crypto from 'crypto'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: crypto.randomUUID(),
      email: 'kaj.lund@gmail.com',
      alias: 'luka',
      password: process.env.ADMIN_SEED_PWD,
      role: 'admin',
    },
  ])
}
