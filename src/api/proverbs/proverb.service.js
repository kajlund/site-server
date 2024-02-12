import dao from '../../dao.js'
import { BadRequestError, InternalServerError, NotFoundError } from '../../errors.js'

const table = 'proverbs'
const resourceName = 'Proverb'

const createProverb = async (data) => {
  const result = await dao.createOne(table, data)
  return result
}

const deleteProverb = async (id) => {
  // Ensure it exists
  const found = await dao.findOne(table, { id })
  if (!found) {
    throw new BadRequestError(`${resourceName} with id ${id} was not found`)
  }
  const result = await dao.deleteOne(table, id)
  if (!result) {
    throw new InternalServerError(`${resourceName} with id ${id} could not be deleted`)
  }
  return found
}

export const findById = async (id) => {
  const result = await dao.findOne(table, { id })
  if (!result) {
    throw new NotFoundError(`${resourceName} with id ${id} was not found`)
  }

  return result
}

export const queryProverbs = async (query) => {
  // Set default query, sort and limit if not set by query params
  if (query.sort === '') query.sort = 'title'
  if (query.limit === 0) query.limit = 50
  query.filter = query.filter ? (query.filter = { field: 'author', value: query.filter }) : null

  const result = await dao.findMany(table, query)
  return result
}

const updateProverb = async (id, data) => {
  // Ensure it exists
  const found = await dao.findOne(table, { id })
  if (!found) {
    throw new BadRequestError(`${resourceName} with id ${id} was not found`)
  }

  const result = await dao.updateOne(table, id, data)
  return result
}

export default {
  createProverb,
  deleteProverb,
  findById,
  queryProverbs,
  updateProverb,
}
