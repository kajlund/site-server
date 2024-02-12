import { codes } from '../../statuscodes.js'
import svcProverb from './proverb.service.js'

export const createProverb = async (req, res, next) => {
  try {
    const data = await svcProverb.createProverb(res.locals.data)
    res.status(codes.CREATED).json({
      success: true,
      message: `Created proverb ${data.title}`,
      data,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteProverb = async (req, res, next) => {
  try {
    const data = await svcProverb.deleteProverb(res.locals.id)
    res.status(codes.OK).json({
      success: true,
      message: `Deleted proverb ${data.title}`,
      data,
    })
  } catch (err) {
    next(err)
  }
}

export const findProverbById = async (req, res, next) => {
  try {
    const data = await svcProverb.findById(res.locals.id)
    res.status(codes.OK).json({
      success: true,
      message: `Found proverb ${data.title}`,
      data,
    })
  } catch (err) {
    next(err)
  }
}

export const queryProverbs = async (req, res, next) => {
  try {
    const data = await svcProverb.queryProverbs(res.locals.query)
    res.status(codes.OK).json({
      success: true,
      message: `Found ${data.length} proverbs`,
      query: res.locals.query,
      data,
    })
  } catch (err) {
    next(err)
  }
}

export const updateProverb = async (req, res, next) => {
  try {
    const updatedPv = await svcProverb.updateProverb(res.locals.id, res.locals.data)
    res.status(codes.OK).json({
      success: true,
      message: `Updated proverb ${updatedPv.title}`,
      data: updatedPv,
    })
  } catch (err) {
    next(err)
  }
}

export default {
  createProverb,
  deleteProverb,
  findProverbById,
  queryProverbs,
  updateProverb,
}
