import crypto from 'crypto'

import db from './db.js'

const findMany = async (table, query) => {
  const { filter, sort, limit, skip } = query
  let result

  if (filter) {
    const value = filter.value + '%'
    result = await db.knex(table).whereLike(filter.field, value).orderBy(sort).limit(limit).offset(skip)
  } else {
    result = await db.knex(table).orderBy(sort).limit(limit).offset(skip)
  }

  return result
}

const findOne = async (table, qry) => {
  const result = await db.knex(table).where(qry)
  return result.length ? result[0] : null // Return found one or null
}

const createOne = async (table, data) => {
  data.id = crypto.randomUUID()
  const result = await db.knex(table).insert(data).returning('*')
  return result.length ? result[0] : null // Return created one or null
}

const updateOne = async (table, id, data) => {
  data.updatedAt = new Date().toISOString()
  const result = await db.knex(table).where('id', id).update(data).returning('*')
  return result.length ? result[0] : null // Returns updated object or null
}

/**
 * @function deleteOne
 * @param table string
 * @param id string
 * */
const deleteOne = async (table, id) => {
  const numAffected = await db.knex(table).where('id', id).del()
  return numAffected > 0
}

export default {
  findMany,
  findOne,
  createOne,
  updateOne,
  deleteOne,
}
