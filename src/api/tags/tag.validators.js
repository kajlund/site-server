import Joi from 'joi'

import { UnprocessableEntityError } from '../../errors.js'

const insertSchema = Joi.object().keys({
  tag: Joi.string().min(2).max(25).trim().required(),
})

export const validateInsert = (req, res, next) => {
  const { error, value } = Joi.compile(insertSchema).validate(req.body)
  if (error) {
    const errorDetail = error.details.map((details) => details.message).join(', ')
    const err = new UnprocessableEntityError(errorDetail)
    return next(err)
  }
  req.locals = { ...{ data: value } }
  return next()
}

export const validateUpdate = (req, res, next) => {
  const { error, value } = Joi.compile(insertSchema).validate(req.body)
  if (error) {
    const errorDetail = error.details.map((details) => details.message).join(', ')
    const err = new UnprocessableEntityError(errorDetail)
    return next(err)
  }
  res.locals = { ...{ data: value } }
  return next()
}
