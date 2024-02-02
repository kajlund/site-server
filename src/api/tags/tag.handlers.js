import { codes } from '../../statuscodes.js'
import svcTag from './tag.service.js'

export const createTag = async (req, res, next) => {
  try {
    const newTag = await svcTag.createTag(res.locals.data)
    res.status(codes.CREATED).json({
      success: true,
      message: `Created tag ${newTag.tag}`,
      data: newTag,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteTag = async (req, res, next) => {
  try {
    const deleted = await svcTag.deleteTag(res.locals.id)
    res.status(codes.OK).json({
      success: true,
      message: `Deleted tag ${deleted.tag}`,
      data: deleted,
    })
  } catch (err) {
    next(err)
  }
}

export const findTagByID = async (req, res, next) => {
  try {
    const foundTag = await svcTag.findTagById(res.locals.id)
    res.status(codes.OK).json({
      success: true,
      message: `Found tag ${foundTag.tag}`,
      data: foundTag,
    })
  } catch (err) {
    next(err)
  }
}

export const queryTags = async (req, res, next) => {
  try {
    const tags = await svcTag.queryTags(res.locals.query)
    res.status(codes.OK).json({
      success: true,
      message: `Found ${tags.length} tags`,
      query: res.locals.query,
      data: tags,
    })
  } catch (err) {
    next(err)
  }
}

export const updateTag = async (req, res, next) => {
  try {
    const updatedTag = await svcTag.updateTag(res.locals.id, res.locals.data)
    res.status(codes.OK).json({
      success: true,
      message: `Updated tag ${updatedTag.tag}`,
      data: updatedTag,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createTag,
  deleteTag,
  findTagByID,
  queryTags,
  updateTag,
}
