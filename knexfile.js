import dotenv from 'dotenv'

dotenv.config()

export default {
  development: {
    client: 'pg',
    connection: process.env.DB_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: './test.sqlite3',
    },
    useNullAsDefault: true,
    seeds: {
      directory: './seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DB_CONNECTION,
    pool: {
      min: 2,
      max: 10,
    },
  },
}
