import dao from '../../dao.js'
import { BadRequestError, InternalServerError, NotFoundError } from '../../errors.js'

const table = 'tags'

const createTag = async (data) => {
  // Ensure it does not already exist
  const found = await dao.findOne(table, { tag: data.tag })
  if (found) {
    throw new BadRequestError(`Tag ${data.tag} already exists`)
  }

  const result = await dao.createOne(table, data)
  return result
}

const deleteTag = async (id) => {
  // Ensure it exists
  const found = await dao.findOne(table, { id })
  if (!found) {
    throw new BadRequestError(`Tag with id ${id} was not found`)
  }
  const deleted = await dao.deleteOne(table, id)
  if (!deleted) {
    throw new InternalServerError(`Tag with id ${id} could not be deleted`)
  }
  return found
}

export const findTagById = async (id) => {
  const tag = await dao.findOne(table, { id })
  if (!tag) {
    throw new NotFoundError(`Tag with id ${id} was not found`)
  }

  return tag
}

export const queryTags = async (query) => {
  // Set default query, sort and limit if not set by query params
  if (query.sort === '') query.sort = 'tag'
  if (query.limit === 0) query.limit = 50
  query.filter = query.filter ? (query.filter = { field: 'tag', value: query.filter }) : null

  const result = await dao.findMany(table, query)
  return result
}

const updateTag = async (id, data) => {
  // Ensure it exists
  const found = await dao.findOne(table, { id })
  if (!found) {
    throw new BadRequestError(`Tag with id ${id} was not found`)
  }

  const result = await dao.updateOne(table, id, data)
  return result
}

export default {
  createTag,
  deleteTag,
  findTagById,
  queryTags,
  updateTag,
}
