import Joi from 'joi'

import { BadRequestError } from '../../errors.js'
import errorParser from '../../utils/error.parser.js'

const schema = Joi.object().keys({
  tag: Joi.string().min(2).max(25).trim().required(),
})

export const validateInsertPayload = (req, res, next) => {
  const { error, value } = Joi.compile(schema).validate(req.body)
  if (error) {
    const err = new BadRequestError('Faulty insert payload', errorParser(error))
    return next(err)
  }
  res.locals.data = value
  return next()
}

export const validateUpdatePayload = (req, res, next) => {
  const { error, value } = Joi.compile(schema).validate(req.body)
  if (error) {
    const err = new BadRequestError('Faulty update payload', errorParser(error))
    return next(err)
  }
  res.locals.data = value
  return next()
}

export default {
  insertPayload: validateInsertPayload,
  updatePayload: validateUpdatePayload,
}
