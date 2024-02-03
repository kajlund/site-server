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
  const password = await bcrypt.hash(process.env.ADMIN_SEED_PWD, salt)
  const userPwd = await bcrypt.hash('pass1234', salt)
  await knex('users').insert([
    {
      id: crypto.randomUUID(),
      email: 'kaj.lund@gmail.com',
      alias: 'luka',
      password,
      role: 'admin',
    },
    {
      id: crypto.randomUUID(),
      email: 'prospect@mail.com',
      alias: 'Prospect',
      password: userPwd,
      role: 'prospect',
    },
    {
      id: crypto.randomUUID(),
      email: 'user@mail.com',
      alias: 'User',
      password: userPwd,
      role: 'user',
    },
  ])
}
