import express from 'express'

import { codes } from '../../statuscodes.js'
import svcTag from './tag.service.js'
import vld from '../../middleware/shared.validators.js'
import vldTag from './tag.validators.js'

const router = express.Router()

router.get('/', vld.qryFilter, async (req, res, next) => {
  try {
    const result = await svcTag.listTags(req.locals.query)
    res.status(codes.OK).json(result)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', vld.prmUUID, async (req, res, next) => {
  try {
    const result = await svcTag.getTagById(req.locals.id)
    res.status(codes.OK).json(result)
  } catch (err) {
    next(err)
  }
})

router.post('/', vldTag.insertPayload, async (req, res, next) => {
  try {
    const result = await svcTag.createTag(req.locals.data)
    res.status(codes.CREATED).json(result)
  } catch (err) {
    next(err)
  }
})

router.patch('/:id', vld.prmUUID, vldTag.updatePayload, async (req, res, next) => {
  try {
    const result = await svcTag.updateTag(req.locals.id, req.locals.data)
    res.status(codes.OK).json(result)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', vld.prmUUID, async (req, res, next) => {
  try {
    const result = await svcTag.deleteTag(req.locals.id)
    res.status(codes.OK).json(result)
  } catch (err) {
    next(err)
  }
})

export default router
