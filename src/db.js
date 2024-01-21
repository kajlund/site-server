import knex from 'knex'

import knexFile from '../knexfile.js'
import log from './logger.js'

const env = process.env.NODE_ENV || 'development'
const conn = knex(knexFile[env])

export default {
  knex: conn,
  connect: async () => {
    try {
      await conn('knex_migrations')
      log.info('Postgres connected')
    } catch (err) {
      log.error({ err }, 'Database connection error:')
    }
  },
  disconnect: async () => {
    try {
      await conn.destroy()
      log.info('Postgres connection closed')
    } catch (err) {
      log.error({ err }, 'Database disconnection error:')
    }
  },
}
