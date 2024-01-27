import Joi from 'joi'

import { UnprocessableEntityError } from '../../errors.js'
import locals from '../../utils/locals.js'

const schema = Joi.object().keys({
  tag: Joi.string().min(2).max(25).trim().required(),
})

const insertPayload = (req, res, next) => {
  const { error, value } = Joi.compile(schema).validate(req.body)
  if (error) {
    const errorDetail = error.details.map((details) => details.message).join(', ')
    const err = new UnprocessableEntityError(errorDetail)
    return next(err)
  }

  locals.setData(req, value)
  return next()
}

export default {
  insertPayload,
  updatePayload: insertPayload,
}
