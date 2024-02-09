import crypto from 'crypto'
import bcrypt from 'bcryptjs'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes existing entries
  await knex('users').del()
  const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10)
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  const password = await bcrypt.hash('pass1234', salt)

  if (process.env.NODE_ENV !== 'production') {
    await knex('users').insert([
      {
        id: crypto.randomUUID(),
        email: 'admin@mail.com',
        alias: 'Admin',
        password,
        role: 'admin',
      },
      {
        id: crypto.randomUUID(),
        email: 'user@mail.com',
        alias: 'User',
        password,
        role: 'user',
      },
    ])
  }
}
