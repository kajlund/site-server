import Joi from 'joi'

import { UnprocessableEntityError } from '../errors.js'

const requiredUUIDv4Schema = Joi.object().keys({
  id: Joi.string()
    .required()
    .guid({
      version: ['uuidv4'],
    }),
})

export const validateUuidPrm = (req, res, next) => {
  const { error, value } = Joi.compile(requiredUUIDv4Schema).validate(req.params)

  if (error) {
    const errorDetail = error.details.map((details) => details.message).join(', ')
    const err = new UnprocessableEntityError(errorDetail)
    return next(err)
  }
  req.locals = { ...{ id: value.id } }
  return next()
}
