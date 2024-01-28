import express from 'express'

import { codes } from '../../statuscodes.js'
import svcUser from './user.service.js'
import vldUser from './user.validators.js'

const router = express.Router()

router.post('/register', vldUser.insertPayload, async (req, res, next) => {
  try {
    const result = await svcUser.registerUser(req.locals.data)

    res.status(codes.OK).json(result)
  } catch (err) {
    next(err)
  }
})

export default router
