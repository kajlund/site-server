import express from 'express'

import { codes } from '../../statuscodes.js'
import { createTag, deleteTag, getTagById, listTags, updateTag } from './tag.service.js'
import { validateQuery, validateUuidPrm } from '../../middleware/shared.validators.js'
import { validateTagData } from './tag.validators.js'

const router = express.Router()

router.get('/', validateQuery, async (req, res, next) => {
  try {
    const result = await listTags(req.locals.query)
    res.status(codes.OK).json(result)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', validateUuidPrm, async (req, res, next) => {
  try {
    const result = await getTagById(req.locals.id)
    res.status(codes.OK).json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/', validateTagData, async (req, res, next) => {
  try {
    const result = await createTag(req.locals.data)
    res.status(codes.CREATED).json(result)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', validateUuidPrm, validateTagData, async (req, res, next) => {
  try {
    const result = await updateTag(req.locals.id, req.locals.data)
    res.status(codes.OK).json(result)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', validateUuidPrm, async (req, res, next) => {
  try {
    const result = await deleteTag(req.locals.id)
    res.status(codes.OK).json(result)
  } catch (err) {
    next(err)
  }
})

export default router
