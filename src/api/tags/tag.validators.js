import Joi from 'joi'

import { BadRequestError } from '../../errors.js'
import locals from '../../utils/locals.js'
import errorParser from '../../utils/error.parser.js'

const schema = Joi.object().keys({
  tag: Joi.string().min(2).max(25).trim().required(),
})

const insertPayload = (req, res, next) => {
  const { error, value } = Joi.compile(schema).validate(req.body)
  if (error) {
    const err = new BadRequestError('Faulty input payload', errorParser(error))
    return next(err)
  }

  locals.setData(req, value)
  return next()
}

export default {
  insertPayload,
  updatePayload: insertPayload,
}
