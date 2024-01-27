import dao from '../../dao.js'
import { BadRequestError, InternalServerError, NotFoundError } from '../../errors.js'

const table = 'tags'

const listTags = async (query) => {
  // set default sort and limit if not set by query
  if (query.sort === '') query.sort = 'tag'
  if (query.limit === 0) query.limit = 50
  query.filter = query.filter ? (query.filter = { field: 'tag', value: query.filter }) : null

  const result = await dao.findMany(table, query)
  return {
    success: true,
    message: `Found ${result.length} tags`,
    query,
    data: result,
  }
}

const getTagById = async (id) => {
  const tag = await dao.findOne(table, { id })
  if (!tag) {
    throw new NotFoundError(`Tag with id ${id} was not found`)
  }

  return {
    success: true,
    message: `Found tag ${tag.tag}`,
    data: tag,
  }
}

const createTag = async (data) => {
  // Ensure it does not already exist
  const found = await dao.findOne(table, { tag: data.tag })
  if (found) {
    throw new BadRequestError(`Tag ${data.tag} already exists`)
  }

  const result = await dao.createOne(table, data)

  return {
    success: true,
    message: `Created tag ${result.tag}`,
    data: result,
  }
}

const updateTag = async (id, data) => {
  // Ensure it exists
  const found = await dao.findOne(table, { id })
  if (!found) {
    throw new NotFoundError(`Tag with id ${id} was not found`)
  }

  const result = await dao.updateOne(table, id, data)

  return {
    success: true,
    message: `Updated tag ${result.tag}`,
    data: result,
  }
}

const deleteTag = async (id) => {
  // Ensure it exists
  const found = await dao.findOne(table, { id })
  if (!found) {
    throw new NotFoundError(`Tag with id ${id} was not found`)
  }
  const success = await dao.deleteOne(table, id)
  if (!success) {
    throw new InternalServerError(`Tag with id ${id} could not be deleted`)
  }

  return {
    success: true,
    message: `Deleted tag ${found.tag}`,
    data: found,
  }
}

export default {
  listTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
}
